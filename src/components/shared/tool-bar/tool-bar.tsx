'use client';

import { type Editor } from '@tiptap/react';
import {
    List,
    ListOrdered,
    Quote,
    Code,
    Undo,
    Redo,
    Minus,
} from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import HowToUse from './how-to-use';
import TableTool from './table-tool';

import ImageTool from './image-tool';
import FormattingTool from './formatting-tool';

type Props = {
    editor: Editor | null;
};

export function ToolBar({ editor }: Props) {
    if (!editor) return null;

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
                <FormattingTool editor={editor} />

                <Toggle
                    size="sm"
                    pressed={editor.isActive('bulletList')}
                    onPressedChange={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                >
                    <List className="h-3 w-3 sm:h-4 sm:w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('orderedList')}
                    onPressedChange={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                >
                    <ListOrdered className="h-3 w-3 sm:h-4 sm:w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('blockquote')}
                    onPressedChange={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                >
                    <Quote className="h-3 w-3 sm:h-4 sm:w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('codeBlock')}
                    onPressedChange={() =>
                        editor.chain().focus().toggleCodeBlock().run()
                    }
                >
                    <Code className="h-3 w-3 sm:h-4 sm:w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={false}
                    onPressedChange={() =>
                        editor.chain().focus().setHorizontalRule().run()
                    }
                >
                    <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                </Toggle>
                <Toggle
                    className="max-sm:hidden"
                    size="sm"
                    pressed={editor.isActive('undo')}
                    disabled={!editor.can().chain().focus().undo().run()}
                    onPressedChange={() => editor.chain().focus().undo().run()}
                >
                    <Undo className="h-3 w-3 sm:h-4 sm:w-4" />
                </Toggle>
                <Toggle
                    className="max-sm:hidden"
                    size="sm"
                    pressed={editor.isActive('redo')}
                    disabled={!editor.can().chain().focus().redo().run()}
                    onPressedChange={() => editor.chain().focus().redo().run()}
                >
                    <Redo className="h-3 w-3 sm:h-4 sm:w-4" />
                </Toggle>
                <TableTool editor={editor} />
                <ImageTool editor={editor} />
                <HowToUse />
            </div>
        </div>
    );
}
