import { Toggle } from '@/components/ui/toggle';
import { Editor } from '@tiptap/react';
import { ImagePlus } from 'lucide-react';

export default function ImageTool({ editor }: { editor: Editor }) {
    const addImage = () => {
        const url = window.prompt('URL của ảnh:');

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };
    return (
        <Toggle size="sm" onClick={addImage}>
            <ImagePlus className="h-3 w-3 sm:h-4 sm:w-4" />
        </Toggle>
    );
}
