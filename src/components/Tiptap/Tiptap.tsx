"use client"
import React from 'react'

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Toolbar from './Toolbar';
import { Heading } from './HeadingExtension';

export default function Tiptap({
    description,
    onChange
}: {
    description: string
    onChange: (richText: string) => void
}) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false
            }),
            Heading
        ],
        content: description,
        editorProps: {
            attributes: {
                class: "border border-input p-3 bg-background rounded-b-md min-h-[150px]"
            }
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    })

    return (
        <div>
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}
