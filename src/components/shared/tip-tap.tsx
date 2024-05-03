'use client';

import {
    useEditor,
    EditorContent,
    ReactNodeViewRenderer,
    mergeAttributes,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ToolBar } from './tool-bar/tool-bar';
import Underline from '@tiptap/extension-underline';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import CodeBlock from './code-block';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Dropcursor from '@tiptap/extension-dropcursor';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import ImageResize from 'tiptap-extension-resize-image';
import { SmilieReplacer } from './tool-bar/smile-replacer';

const Tiptap = ({
    description,
    onChange,
    className,
}: {
    description: string;
    onChange: any;
    className?: string;
}) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: 'list-disc pl-2',
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: 'list-decimal pl-2',
                    },
                },
                blockquote: {
                    HTMLAttributes: {
                        class: 'border-l-4 border-gray-300 pl-2 text-gray-500',
                    },
                },
                codeBlock: false,
            }),
            Heading.configure({ levels: [1, 2, 3] }).extend({
                levels: [1, 2, 3],
                renderHTML({ node, HTMLAttributes }) {
                    const level = this.options.levels.includes(node.attrs.level)
                        ? node.attrs.level
                        : this.options.levels[0];
                    const classes: { [key: number]: string } = {
                        1: 'text-4xl font-bold',
                        2: 'text-2xl font-bold',
                        3: 'text-xl font-bold',
                    };
                    return [
                        `h${level}`,
                        mergeAttributes(
                            this.options.HTMLAttributes,
                            HTMLAttributes,
                            {
                                class: `${classes[level]}`,
                            }
                        ),
                        0,
                    ];
                },
            }),
            TableCell.extend({
                addAttributes() {
                    return {
                        // extend the existing attributes …
                        ...this.parent?.(),

                        // and add a new one …
                        backgroundColor: {
                            default: null,
                            parseHTML: element =>
                                element.getAttribute('data-background-color'),
                            renderHTML: attributes => {
                                return {
                                    'data-background-color':
                                        attributes.backgroundColor,
                                    style: `background-color: ${attributes.backgroundColor}`,
                                };
                            },
                        },
                    };
                },
            }),
            Table.configure({
                resizable: true,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            TableRow,
            TableHeader,
            Underline,
            Highlight,
            Typography,
            SmilieReplacer,
            ImageResize,
            CodeBlockLowlight.extend({
                addNodeView() {
                    return ReactNodeViewRenderer(CodeBlock);
                },
            }).configure({
                lowlight: createLowlight(common),
                HTMLAttributes: {
                    class: 'not-prose',
                },
            }),
        ],
        content: description,
        editorProps: {
            attributes: {
                class:
                    'w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-sky-500 focus-visible:ring-offset-1 break-words whitespace-pre-wrap' +
                    (className ? ` ${className}` : ''),
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
        editable: true,
        injectCSS: false,
    });

    return (
        <>
            <ToolBar editor={editor} />
            <EditorContent editor={editor} />
        </>
    );
};

export default Tiptap;
