import {
    BetweenHorizonalEnd,
    BetweenHorizonalStart,
    BetweenVerticalEnd,
    BetweenVerticalStart,
    Combine,
    CopyX,
    PanelLeftClose,
    PanelTopClose,
    SquareCheck,
    SquareX,
    Table,
    TableColumnsSplit,
} from 'lucide-react';

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Toggle } from '@/components/ui/toggle';
import { Editor } from '@tiptap/react';
import { Separator } from '@/components/ui/separator';

export default function TableTool({ editor }: { editor: Editor }) {
    return (
        <>
            <ContextMenu>
                <ContextMenuTrigger>
                    <Toggle
                        size="sm"
                        onPressedChange={() =>
                            editor
                                .chain()
                                .focus()
                                .insertTable({
                                    rows: 3,
                                    cols: 3,
                                    withHeaderRow: true,
                                })
                                .run()
                        }
                    >
                        <Table className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Toggle>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <div className="grid grid-cols-2">
                        <div className="col-span-1">
                            <ContextMenuItem className="p-0" asChild>
                                <div>
                                    <Toggle
                                        size="sm"
                                        onPressedChange={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .addColumnBefore()
                                                .run()
                                        }
                                        disabled={
                                            !editor.can().addColumnBefore()
                                        }
                                    >
                                        <div className="flex gap-1">
                                            <BetweenVerticalStart className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                                                Thêm cột vào trước
                                            </span>
                                        </div>
                                    </Toggle>
                                </div>
                            </ContextMenuItem>
                            <ContextMenuItem className="p-0" asChild>
                                <div>
                                    <Toggle
                                        size="sm"
                                        onPressedChange={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .addColumnAfter()
                                                .run()
                                        }
                                        disabled={
                                            !editor.can().addColumnAfter()
                                        }
                                    >
                                        <div className="flex gap-1">
                                            <BetweenVerticalEnd className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                                                Thêm cột vào sau
                                            </span>
                                        </div>
                                    </Toggle>
                                </div>
                            </ContextMenuItem>
                            <ContextMenuItem className="p-0" asChild>
                                <div>
                                    <Toggle
                                        size="sm"
                                        onPressedChange={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .deleteColumn()
                                                .run()
                                        }
                                        disabled={!editor.can().deleteColumn()}
                                    >
                                        <div className="flex gap-1">
                                            <SquareX className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                                                Xóa cột
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
                                        onPressedChange={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .addRowBefore()
                                                .run()
                                        }
                                        disabled={!editor.can().addRowBefore()}
                                    >
                                        <div className="flex gap-1">
                                            <BetweenHorizonalStart className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                                                Thêm hàng vào trước
                                            </span>
                                        </div>
                                    </Toggle>
                                </div>
                            </ContextMenuItem>
                            <ContextMenuItem className="p-0" asChild>
                                <div>
                                    <Toggle
                                        size="sm"
                                        onPressedChange={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .addRowAfter()
                                                .run()
                                        }
                                        disabled={!editor.can().addRowAfter()}
                                    >
                                        <div className="flex gap-1">
                                            <BetweenHorizonalEnd className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                                                Thêm hàng vào sau
                                            </span>
                                        </div>
                                    </Toggle>
                                </div>
                            </ContextMenuItem>
                            <ContextMenuItem className="p-0" asChild>
                                <div>
                                    <Toggle
                                        size="sm"
                                        onPressedChange={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .deleteRow()
                                                .run()
                                        }
                                        disabled={!editor.can().deleteRow()}
                                    >
                                        <div className="flex gap-1">
                                            <SquareX className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                                                Xóa hàng
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
                                        onPressedChange={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .mergeCells()
                                                .run()
                                        }
                                        disabled={!editor.can().mergeCells()}
                                    >
                                        <div className="flex gap-1">
                                            <Combine className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                                                Hòa ô
                                            </span>
                                        </div>
                                    </Toggle>
                                </div>
                            </ContextMenuItem>
                            <ContextMenuItem className="p-0" asChild>
                                <div>
                                    <Toggle
                                        size="sm"
                                        onPressedChange={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .splitCell()
                                                .run()
                                        }
                                        disabled={!editor.can().splitCell()}
                                    >
                                        <div className="flex gap-1">
                                            <TableColumnsSplit className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                                                Tách ô
                                            </span>
                                        </div>
                                    </Toggle>
                                </div>
                            </ContextMenuItem>
                            <ContextMenuItem className="p-0" asChild>
                                <div>
                                    <Toggle
                                        size="sm"
                                        onPressedChange={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .deleteTable()
                                                .run()
                                        }
                                        disabled={!editor.can().deleteTable()}
                                    >
                                        <div className="flex gap-1">
                                            <CopyX className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                                                Xóa bảng
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
                                        onPressedChange={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .toggleHeaderColumn()
                                                .run()
                                        }
                                        disabled={
                                            !editor.can().toggleHeaderColumn()
                                        }
                                    >
                                        <div className="flex gap-1">
                                            <PanelLeftClose className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                                                Cột tiêu đề
                                            </span>
                                        </div>
                                    </Toggle>
                                </div>
                            </ContextMenuItem>
                            <ContextMenuItem className="p-0" asChild>
                                <div>
                                    <Toggle
                                        size="sm"
                                        onPressedChange={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .toggleHeaderRow()
                                                .run()
                                        }
                                        disabled={
                                            !editor.can().toggleHeaderRow()
                                        }
                                    >
                                        <div className="flex gap-1">
                                            <PanelTopClose className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                                                Hàng tiêu đề
                                            </span>
                                        </div>
                                    </Toggle>
                                </div>
                            </ContextMenuItem>
                            <ContextMenuItem className="p-0" asChild>
                                <div>
                                    <Toggle
                                        size="sm"
                                        onPressedChange={() =>
                                            editor
                                                .chain()
                                                .focus()
                                                .toggleHeaderCell()
                                                .run()
                                        }
                                        disabled={
                                            !editor.can().toggleHeaderCell()
                                        }
                                    >
                                        <div className="flex gap-1">
                                            <SquareCheck className="h-3 w-3 sm:h-4 sm:w-4" />
                                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">
                                                Ô tiêu đề
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
