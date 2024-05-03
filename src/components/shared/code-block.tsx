'use client';

import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function CodeBlock({
    node: {
        attrs: { language: defaultLanguage },
    },
    updateAttributes,
    extension,
}: {
    node: any;
    updateAttributes: any;
    extension: any;
}) {
    return (
        <NodeViewWrapper className="relative">
            <div className="absolute top-[0.5rem] right-[0.5rem]">
                <Select>
                    <SelectTrigger className="text-[12px] px-1 py-1 h-5 rounded-sm">
                        <SelectValue placeholder="Tự động" />
                    </SelectTrigger>
                    <SelectContent className="min-w-0">
                        <SelectGroup>
                            <SelectItem value="null" className="text-[12px]">
                                Tự động
                            </SelectItem>
                            {extension.options.lowlight
                                .listLanguages()
                                .map((lang: any, index: any) => (
                                    <SelectItem
                                        key={index}
                                        value={lang}
                                        className="text-[12px]"
                                    >
                                        {lang}
                                    </SelectItem>
                                ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            {/* <select
                contentEditable={false}
                defaultValue={defaultLanguage}
                onChange={event =>
                    updateAttributes({ language: event.target.value })
                }
                className="absolute top-[0.5rem] right-[0.5rem] p-1 bg-gray-100 text-gray-500 rounded-sm text-xs font-medium"
            >
                <option value="null">Tự động</option>
                <option disabled>—</option>
                {extension.options.lowlight
                    .listLanguages()
                    .map((lang: any, index: any) => (
                        <option key={index} value={lang}>
                            {lang}
                        </option>
                    ))}
            </select> */}
            <pre>
                <NodeViewContent
                    as="code"
                    style={{
                        padding: 0,
                        fontFamily: 'jetbrains mono, monospace',
                        fontSize: '14px',
                    }}
                />
            </pre>
        </NodeViewWrapper>
    );
}
