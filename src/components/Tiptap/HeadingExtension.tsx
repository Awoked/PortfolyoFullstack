import { mergeAttributes } from "@tiptap/core";
import { Heading as TipTapHeading } from "@tiptap/extension-heading";

export const Heading = TipTapHeading.extend({
    renderHTML({ node, HTMLAttributes }) {
        const hasLevel = this.options.levels.includes(node.attrs.level);
        const level = hasLevel ? node.attrs.level : this.options.levels[0];

        const hClass = 
        node.attrs.level == 1 ? "text-3xl" :
        node.attrs.level == 2 ? "text-4xl" :
        node.attrs.level == 3 ? "text-3xl" :
        node.attrs.level == 4 ? "text-2xl" :
        node.attrs.level == 5 ? "text-xl" :
        node.attrs.level == 6 ? "text-lg" : "text-base"
        

        return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                class: hClass,
            }),
            0,
        ];
    },
});