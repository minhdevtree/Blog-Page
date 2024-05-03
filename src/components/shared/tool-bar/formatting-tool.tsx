import { Editor } from '@tiptap/react';
import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Bold,
    Heading1,
    Heading2,
    Heading3,
    Highlighter,
    Italic,
    PencilRuler,
    Strikethrough,
    Underline,
} from 'lucide-react';

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Toggle } from '@/components/ui/toggle';
import { Separator } from '@/components/ui/separator';

export default function FormattingTool({ editor }: { editor: Editor }) {
    return (
        <>
            <ContextMenu>
                <ContextMenuTrigger>
                    <Toggle size="sm">
                        <PencilRuler className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Toggle>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <div className="grid grid-cols-2">
                        <div className="col-span-1">
                            <ContextMenuItem className="p-0" asChild>
                                <div>
                                    <Toggle
                                        size="sm"
                                        pressed={editor.isActive('bold')}
                                        onPressedChange={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .toggleBold()
                                                .run()
                                        }
                                    >
                                        <div className="flex gap-1">
                                            <Bold className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                                                Bôi đậm
                                            </span>
                                        </div>
                                    </Toggle>
                                </div>
                            </ContextMenuItem>
                            <ContextMenuItem className="p-0" asChild>
                                <div>
                                    <Toggle
                                        size="sm"
                                        pressed={editor.isActive('italic')}
                                        onPressedChange={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .toggleItalic()
                                                .run()
                                        }
                                    >
                                        <div className="flex gap-1">
                                            <Italic className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                                                In nghiêng
                                            </span>
                                        </div>
                                    </Toggle>
                                </div>
                            </ContextMenuItem>
                            <ContextMenuItem className="p-0" asChild>
                                <div>
                                    <Toggle
                                        size="sm"
                                        pressed={editor.isActive('underline')}
                                        onPressedChange={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .toggleUnderline()
                                                .run()
                                        }
                                    >
                                        <div className="flex gap-1">
                                            <Underline className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                                                Gạch chân
                                            </span>
                                        </div>
                                    </Toggle>
                                </div>
                            </ContextMenuItem>
                            <ContextMenuItem className="p-0" asChild>
                                <div>
                                    <Toggle
                                        size="sm"
                                        pressed={editor.isActive('strike')}
                                        onPressedChange={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .toggleStrike()
                                                .run()
                                        }
                                    >
                                        <div className="flex gap-1">
                                            <Strikethrough className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                                                Gạch ngang
                                            </span>
                                        </div>
                                    </Toggle>
                                </div>
                            </ContextMenuItem>
                        </div>
                        <div className="col-span-1">
                            <ContextMenuItem className="p-0" asChild>
                                <div>
                                    <Toggle
                                        size="sm"
                                        pressed={editor.isActive({
                                            textAlign: 'left',
                                        })}
                                        onPressedChange={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .setTextAlign('left')
                                                .run()
                                        }
                                    >
                                        <div className="flex gap-1">
                                            <AlignLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                                                Căn trái
                                            </span>
                                        </div>
                                    </Toggle>
                                </div>
                            </ContextMenuItem>
                            <ContextMenuItem className="p-0" asChild>
                                <div>
                                    <Toggle
                                        size="sm"
                                        pressed={editor.isActive({
                                            textAlign: 'center',
                                        })}
                                        onPressedChange={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .setTextAlign('center')
                                                .run()
                                        }
                                    >
                                        <div className="flex gap-1">
                                            <AlignCenter className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                                                Căn giữa
                                            </span>
                                        </div>
                                    </Toggle>
                                </div>
                            </ContextMenuItem>
                            <ContextMenuItem className="p-0" asChild>
                                <div>
                                    <Toggle
                                        size="sm"
                                        pressed={editor.isActive({
                                            textAlign: 'right',
                                        })}
                                        onPressedChange={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .setTextAlign('right')
                                                .run()
                                        }
                                    >
                                        <div className="flex gap-1">
                                            <AlignRight className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                                                Căn phải
                                            </span>
                                        </div>
                                    </Toggle>
                                </div>
                            </ContextMenuItem>
                            <ContextMenuItem className="p-0" asChild>
                                <div>
                                    <Toggle
                                        size="sm"
                                        pressed={editor.isActive({
                                            textAlign: 'justify',
                                        })}
                                        onPressedChange={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .setTextAlign('justify')
                                                .run()
                                        }
                                    >
                                        <div className="flex gap-1">
                                            <AlignJustify className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                                                Căn đều
                                            </span>
                                        </div>
                                    </Toggle>
                                </div>
                            </ContextMenuItem>
                        </div>
                        <Separator className="col-span-2" />
                        <div className="col-span-1">
                            <ContextMenuItem className="p-0" asChild>
                                <div>
                                    <Toggle
                                        size="sm"
                                        pressed={editor.isActive('heading', {
                                            level: 1,
                                        })}
                                        onPressedChange={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .setHeading({ level: 1 })
                                                .run()
                                        }
                                    >
                                        <div className="flex gap-1">
                                            <Heading1 className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                                                Tiêu đề 1
                                            </span>
                                        </div>
                                    </Toggle>
                                </div>
                            </ContextMenuItem>
                            <ContextMenuItem className="p-0" asChild>
                                <div>
                                    <Toggle
                                        size="sm"
                                        pressed={editor.isActive('heading', {
                                            level: 2,
                                        })}
                                        onPressedChange={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .setHeading({ level: 2 })
                                                .run()
                                        }
                                    >
                                        <div className="flex gap-1">
                                            <Heading2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                                                Tiêu đề 2
                                            </span>
                                        </div>
                                    </Toggle>
                                </div>
                            </ContextMenuItem>
                            <ContextMenuItem className="p-0" asChild>
                                <div>
                                    <Toggle
                                        size="sm"
                                        pressed={editor.isActive('heading', {
                                            level: 3,
                                        })}
                                        onPressedChange={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .setHeading({ level: 3 })
                                                .run()
                                        }
                                    >
                                        <div className="flex gap-1">
                                            <Heading3 className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                                                Tiêu đề 3
                                            </span>
                                        </div>
                                    </Toggle>
                                </div>
                            </ContextMenuItem>
                        </div>
                        <div className="col-span-1">
                            <ContextMenuItem className="p-0" asChild>
                                <div>
                                    <Toggle
                                        size="sm"
                                        pressed={editor.isActive('highlight')}
                                        onPressedChange={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .toggleHighlight()
                                                .run()
                                        }
                                    >
                                        <div className="flex gap-1">
                                            <Highlighter className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                                                Nổi bật
                                            </span>
                                        </div>
                                    </Toggle>
                                </div>
                            </ContextMenuItem>
                        </div>
                    </div>
                </ContextMenuContent>
            </ContextMenu>
        </>
    );
}
