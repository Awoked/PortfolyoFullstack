"use client"
import { type Editor } from "@tiptap/react"
import {
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
    Heading2,
    Heading6,
    Heading5,
    Heading4,
    Heading3,
} from "lucide-react"

import { Toggle } from "../ui/toggle"

type Props = {
    editor: Editor | null
}
export default function Toolbar({ editor }: Props) {
    if (!editor) return null;


    return (
        <div className="border border-input bg-background p-2 border-b-0 rounded-t-md mb-2">
            <Toggle
                size={"sm"}
                pressed={editor.isActive("heading", { level: 2 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
                <Heading2 />
            </Toggle>
            <Toggle
                size={"sm"}
                pressed={editor.isActive("heading", { level: 3 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            >
                <Heading3 />
            </Toggle>
            <Toggle
                size={"sm"}
                pressed={editor.isActive("heading", { level: 4 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            >
                <Heading4 />
            </Toggle>
            <Toggle
                size={"sm"}
                pressed={editor.isActive("heading", { level: 5 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
            >
                <Heading5 />
            </Toggle>
            <Toggle
                size={"sm"}
                pressed={editor.isActive("heading", { level: 6 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
            >
                <Heading6 />
            </Toggle>

            <Toggle
                size={"sm"}
                pressed={editor.isActive("italic")}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            >
                <Italic />
            </Toggle>
            <Toggle
                size={"sm"}
                pressed={editor.isActive("strike")}
                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            >
                <Strikethrough />
            </Toggle>
            <Toggle
                size={"sm"}
                pressed={editor.isActive("bold")}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
            >
                <Bold />
            </Toggle>
            <Toggle
                size={"sm"}
                pressed={editor.isActive("bulletList")}
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
            >
                <List />
            </Toggle>
            <Toggle
                size={"sm"}
                pressed={editor.isActive("orderedList")}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <ListOrdered />
            </Toggle>
        </div>
    )
}
