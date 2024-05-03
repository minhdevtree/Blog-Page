import { Toggle } from '@/components/ui/toggle';
import { Editor } from '@tiptap/react';
import { Heading1, Heading2, Heading3 } from 'lucide-react';

export default function HeadingTool({ editor }: { editor: Editor }) {
    return (
        <div className="flex items-center gap-1">
            <Toggle
                size="sm"
                pressed={editor.isActive('heading', { level: 1 })}
                onPressedChange={() =>
                    editor.chain().focus().setHeading({ level: 1 }).run()
                }
            >
                <Heading1 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive('heading', { level: 2 })}
                onPressedChange={() =>
                    editor.chain().focus().setHeading({ level: 2 }).run()
                }
            >
                <Heading2 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive('heading', { level: 3 })}
                onPressedChange={() =>
                    editor.chain().focus().setHeading({ level: 3 }).run()
                }
            >
                <Heading3 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Toggle>
        </div>
    );
}
