'use client';

import { canvasPreview } from '@/components/crop-image/canvas-preview';
import { useDebounceEffect } from '@/components/crop-image/use-deboundce-effect';
import React, { useState, useRef } from 'react';

import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
} from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    );
}

const formSchema = z.object({
    image: z.any().optional(),
});

export default function App() {
    const [imgSrc, setImgSrc] = useState('');
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [aspect, setAspect] = useState<number | undefined>(1 / 1);

    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image: undefined,
        },
    });

    function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined); // Makes crop preview update between images.
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || '')
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, aspect));
        }
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    scale,
                    rotate
                );
            }
        },
        100,
        [completedCrop, scale, rotate]
    );

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }
        const image = imgRef.current;
        const crop = completedCrop;
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );
        }
        const formData = new FormData();
        canvas.toBlob(async blob => {
            if (!blob) {
                console.error('Image processing failed.');
                return;
            }
            formData.append('image', blob);
            try {
                const res = await axios.post(
                    'http://localhost:3000/api/image/upload',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'image/*',
                        },
                    }
                );
                console.log(res.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        }, 'image/png');
    };

    return (
        <div className="App">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field: { onChange, value, ...rest } }) => (
                            <>
                                <FormItem className="flex gap-4">
                                    {!!completedCrop ? (
                                        <div>
                                            <canvas
                                                ref={previewCanvasRef}
                                                className="h-[100px] w-[100px] border-[3px] rounded-full"
                                            />
                                        </div>
                                    ) : (
                                        <Avatar className="h-[100px] w-[100px] border-[3px]">
                                            <AvatarImage
                                                className="object-cover"
                                                src={form.getValues('image')}
                                                alt="avatar"
                                            />
                                            <AvatarFallback>A</AvatarFallback>
                                        </Avatar>
                                    )}

                                    <div className="flex flex-col gap-2 ">
                                        <FormLabel>Upload new avatar</FormLabel>
                                        <label htmlFor="image">
                                            Choose File
                                        </label>
                                    </div>
                                    <FormControl>
                                        <Input
                                            id="image"
                                            className="hidden"
                                            accept={'image/*'}
                                            type="file"
                                            {...rest}
                                            onChange={onSelectFile}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                    {!!imgSrc && (
                        <ReactCrop
                            crop={crop}
                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                            onComplete={c => setCompletedCrop(c)}
                            aspect={aspect}
                            // minWidth={400}
                            minHeight={100}
                            // circularCrop
                            className="w-[300px]"
                        >
                            <img
                                ref={imgRef}
                                alt="Crop me"
                                src={imgSrc}
                                style={{
                                    transform: `scale(${scale}) rotate(${rotate}deg)`,
                                }}
                                onLoad={onImageLoad}
                            />
                        </ReactCrop>
                    )}

                    <Button type="submit">
                        {isLoading && (
                            <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
                        )}
                        Update profile
                    </Button>
                </form>
            </Form>
        </div>
    );
}
