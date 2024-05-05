import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
    CircleHelp,
    Code,
    ImagePlus,
    List,
    ListOrdered,
    PencilRuler,
    Quote,
    Table,
} from 'lucide-react';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function HowToUse() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <CircleHelp className="h-3 w-3 sm:h-4 sm:w-4" />
            </DialogTrigger>

            <DialogContent className="sm:max-w-[550px] h-[600px]">
                <ScrollArea>
                    <div className="p-2">
                        <AspectRatio ratio={534 / 53} className="bg-muted">
                            <Image
                                src="/text-editor/how-to-use/toolbar.png"
                                alt="toolbar"
                                fill
                                className="rounded-md object-cover"
                            />
                        </AspectRatio>
                        <p>
                            Thanh công cụ giúp bạn định dạng văn bản một cách dễ
                            dàng. Bạn có thể chọn kiểu chữ, màu sắc, kích thước,
                            thêm liên kết, chèn hình ảnh, bảng, mã nguồn, và
                            nhiều hơn nữa.
                        </p>
                        <p>
                            Lưu ý rằng một số tính năng có thể không hoạt động
                            trên một số trình duyệt và điện thoại. Hãy sử dụng
                            máy tính thay vì điện thoại di động để có trải
                            nghiệm tốt nhất.
                        </p>
                        <br />
                        <div className="text-xl font-bold flex items-center gap-2">
                            Hãy bắt đầu với{' '}
                            <PencilRuler className="h-3 w-3 sm:h-4 sm:w-4" />
                        </div>
                        <div>
                            Đây là công cụ giúp format văn bản dễ dàng hơn. Nhấn
                            chuột phải vào{' '}
                            <PencilRuler className="h-3 w-3 sm:h-4 sm:w-4 inline-block" />{' '}
                            để xem các lựa chọn khác nhau:
                        </div>
                        <AspectRatio ratio={327 / 341} className="bg-muted">
                            <Image
                                src="/text-editor/how-to-use/formatting-tool.png"
                                alt="formatting tool"
                                fill
                                className="rounded-md object-cover"
                            />
                        </AspectRatio>
                        <br />
                        <div className="text-xl font-bold flex items-center gap-2">
                            Tiếp theo là{' '}
                            <List className="h-3 w-3 sm:h-4 sm:w-4 inline-block" />
                            và
                            <ListOrdered className="h-3 w-3 sm:h-4 sm:w-4 inline-block" />
                        </div>
                        <div>
                            Đây là công cụ giúp tạo danh sách dạng dấu đầu dòng
                            và dạng số thứ tự.
                        </div>
                        <br />
                        <div className="text-xl font-bold flex items-center gap-2">
                            <Quote className="h-3 w-3 sm:h-4 sm:w-4 inline-block" />
                            là công cụ giúp tạo trích dẫn.
                        </div>
                        <div>
                            Nhấn vào biểu tượng{' '}
                            <Quote className="h-3 w-3 sm:h-4 sm:w-4 inline-block" />{' '}
                            để tạo một đoạn trích dẫn.
                        </div>
                        <br />
                        <div className="text-xl font-bold flex items-center gap-2">
                            <Code className="h-3 w-3 sm:h-4 sm:w-4 inline-block" />
                            là công cụ giúp tạo mã nguồn.
                        </div>
                        <div>
                            Đây là công cụ hữu hiệu giúp anh em coder chia sẻ mã
                            nguồn và xem mã nguồn một cách dễ dàng.
                        </div>
                        <br />
                        <div className="text-xl font-bold flex items-center gap-2">
                            Tạo bảng với công cụ
                            <Table className="h-3 w-3 sm:h-4 sm:w-4 inline-block" />
                        </div>
                        <div>
                            Nhấn vào biểu tượng{' '}
                            <Table className="h-3 w-3 sm:h-4 sm:w-4 inline-block" />{' '}
                            để tạo một bảng.
                        </div>
                        <div>Chuột phải vào bảng để xem các lựa chọn khác:</div>
                        <AspectRatio ratio={461 / 275} className="bg-muted">
                            <Image
                                src="/text-editor/how-to-use/table-tool.png"
                                alt="table tool"
                                fill
                                className="rounded-md object-cover"
                            />
                        </AspectRatio>
                        <br />
                        <div className="text-xl font-bold flex items-center gap-2">
                            Bạn muốn thêm ảnh ư? Hãy sử dụng{' '}
                            <ImagePlus className="h-3 w-3 sm:h-4 sm:w-4 inline-block" />
                        </div>
                        <div>
                            Nhấn vào biểu tượng{' '}
                            <ImagePlus className="h-3 w-3 sm:h-4 sm:w-4 inline-block" />{' '}
                            để chèn hình ảnh. (Hãy nhớ rằng bạn cần có URL hình
                            ảnh. Tính năng này không hỗ trợ tải hình ảnh từ máy
                            tính của bạn. Thật ra có hỗ trợ nhưng được khóa do
                            kho lưu trữ có giới hạn)
                        </div>
                        <div>
                            Với người viết bài, bạn có đặc quyền được tải hình
                            ảnh từ máy tính của mình cho mục đích viết bài. Bạn
                            cũng có thể sử dụng URL hình ảnh từ các trang web
                            khác.
                        </div>
                        <br />
                        <div className="text-xl font-bold flex items-center gap-2">
                            Phím tắt Markdown giúp bạn dễ dàng định dạng văn bản
                            trong khi gõ.
                        </div>
                        <p>
                            Để kiểm tra điều đó, hãy bắt đầu một dòng mới và
                            nhập{' '}
                            <code className="text-[#616161] bg-[#6161611a]">
                                #
                            </code>{' '}
                            theo sau là khoảng trắng để có tiêu đề. Hãy thử{' '}
                            <code className="text-[#616161] bg-[#6161611a]">
                                #
                            </code>
                            ,{' '}
                            <code className="text-[#616161] bg-[#6161611a]">
                                ##
                            </code>
                            ,{' '}
                            <code className="text-[#616161] bg-[#6161611a]">
                                ###
                            </code>
                            ,{' '}
                            <code className="text-[#616161] bg-[#6161611a]">
                                ####
                            </code>
                            ,{' '}
                            <code className="text-[#616161] bg-[#6161611a]">
                                #####
                            </code>
                            ,{' '}
                            <code className="text-[#616161] bg-[#6161611a]">
                                ######
                            </code>{' '}
                            cho các cấp độ khác nhau.
                        </p>
                        <p>
                            Hãy thử{' '}
                            <code className="text-[#616161] bg-[#6161611a]">
                                `&gt;`
                            </code>{' '}
                            cho dấu ngoặc kép,{' '}
                            <code className="text-[#616161] bg-[#6161611a]">
                                *
                            </code>
                            ,{' '}
                            <code className="text-[#616161] bg-[#6161611a]">
                                -
                            </code>{' '}
                            hoặc{' '}
                            <code className="text-[#616161] bg-[#6161611a]">
                                +
                            </code>{' '}
                            cho danh sách dấu đầu dòng hoặc{' '}
                            <code className="text-[#616161] bg-[#6161611a]">
                                \`foobar\`
                            </code>{' '}
                            để đánh dấu mã,{' '}
                            <code className="text-[#616161] bg-[#6161611a]">
                                ~~tildes~~
                            </code>{' '}
                            để gạch ngang văn bản hoặc{' '}
                            <code className="text-[#616161] bg-[#6161611a]">
                                ==equal signs==
                            </code>{' '}
                            để đánh dấu văn bản.
                        </p>
                        <p>
                            → Trình soạn thảo hiểu »what you mean« và thêm các
                            ký tự chính xác vào văn bản của bạn.
                        </p>
                        <p>
                            Hãy thử gõ{' '}
                            <code className="text-[#616161] bg-[#6161611a]">
                                (c)
                            </code>
                            ,{' '}
                            <code className="text-[#616161] bg-[#6161611a]">
                                -`&gt;`
                            </code>
                            ,{' '}
                            <code className="text-[#616161] bg-[#6161611a]">
                                `&gt;``&gt;`
                            </code>
                            ,{' '}
                            <code className="text-[#616161] bg-[#6161611a]">
                                1/2
                            </code>
                            ,{' '}
                            <code className="text-[#616161] bg-[#6161611a]">
                                !=
                            </code>
                            ,{' '}
                            <code className="text-[#616161] bg-[#6161611a]">
                                --
                            </code>{' '}
                            hoặc{' '}
                            <code className="text-[#616161] bg-[#6161611a]">
                                1x1
                            </code>{' '}
                            và xem điều gì xảy ra.
                        </p>
                        <p></p>
                        <p>
                            Bạn có thể nhập{' '}
                            <code className="text-[#616161] bg-[#6161611a]">
                                :-)
                            </code>
                            ,{' '}
                            <code className="text-[#616161] bg-[#6161611a]">
                                `&lt;`3
                            </code>{' '}
                            or{' '}
                            <code className="text-[#616161] bg-[#6161611a]">
                                `&gt;`:P
                            </code>
                            ... để tạo các biểu tượng cảm xúc.
                        </p>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
