import { storage } from '@/config/firebase';
import { ApiRequestInfo } from '@/lib/define';
import { getDateFormatted } from '@/lib/utils';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { NextRequest, NextResponse } from 'next/server';
import { v4 } from 'uuid';

const currentTime = getDateFormatted(new Date().toISOString());
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Upload image',
    method: 'POST',
    requestUrl: '/api/image/upload',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export async function POST(req: NextRequest) {
    // Get client IP
    apiRequestInfo.clientIp =
        req.ip || req.headers.get('X-Forwarded-For') || 'Unknown';

    try {
        let path = req.nextUrl.searchParams.get('path');

        if (!path) {
            path = 'users/avatars/';
        }

        const body = await req.formData();
        const image: File | null = body.get('image') as unknown as File;

        if (
            typeof image !== 'object' ||
            image === undefined ||
            image === null
        ) {
            return NextResponse.json(
                {
                    apiRequestInfo,
                    message: 'Không tìm thấy ảnh',
                },
                { status: 400 }
            );
        }
        if (image.size > 1024 * 1024 * 5) {
            return NextResponse.json(
                {
                    apiRequestInfo,
                    message:
                        'Ảnh có dung lượng quá lớn, vui lòng chọn ảnh khác',
                },
                { status: 400 }
            );
        }

        const imgRef = ref(storage, `${path}${v4()}`);
        await uploadBytes(imgRef, image);
        const imgUrl = await getDownloadURL(imgRef);

        return NextResponse.json(
            {
                apiRequestInfo,
                message: 'Tải ảnh lên thành công',
                data: { img: imgUrl },
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                apiRequestInfo,
                message: 'Đã có lỗi xảy ra trong khi tải ảnh lên',
            },
            { status: 500 }
        );
    }
}
