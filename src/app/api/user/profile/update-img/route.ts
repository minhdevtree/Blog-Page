import { ApiRequestInfo } from '@/lib/define';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { getDateFormatted } from '@/lib/utils';
import { auth } from '@/lib/auth';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from '@/config/firebase';

const currentTime = getDateFormatted(new Date().toISOString());
const apiRequestInfo = {
    time: currentTime,
    apiName: 'Update login user profile image',
    method: 'GET',
    requestUrl: '/api/user/profile/update-img',
    clientIp: 'Unknown',
} as ApiRequestInfo;

export const POST = async (request: NextRequest) => {
    try {
        // Get client IP
        apiRequestInfo.clientIp =
            request.ip || request.headers.get('X-Forwarded-For') || 'Unknown';

        const session = await auth();

        const { img } = await request.json();
        const user = await prisma.user.findUnique({
            where: {
                id: session?.user?.id,
            },
            select: {
                img: true,
            },
        });

        const oldImgRef = ref(storage, user?.img);
        if (
            img !== '/avatar/noavatar.png' &&
            img.includes(process.env.FIREBASE_STORAGE_BUCKET)
        ) {
            await deleteObject(oldImgRef);
        }

        await prisma.user.update({
            where: {
                id: session?.user?.id,
            },
            data: {
                img: img,
            },
        });

        return NextResponse.json(
            { apiRequestInfo, data: { isSuccess: true } },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json(
            { apiRequestInfo, data: { error: 'Lỗi' } },
            { status: 500 }
        );
    }
};
