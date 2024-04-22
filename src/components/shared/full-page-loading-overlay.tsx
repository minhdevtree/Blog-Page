import { Icons } from '../icons/icons';

// opacity-75: Delete this class

export default function FullPageLoadingOverlay() {
    return (
        <div className="w-full h-full fixed top-0 left-0 bg-background z-50">
            <div className="flex gap-2 justify-center items-center mt-[50vh] text-sky-500">
                <Icons.spinner className="h-1000 w-1000 animate-spin" />
                <div className="text-center flex flex-col justify-center text-xl">
                    Đang tải...
                </div>
            </div>
        </div>
    );
}
