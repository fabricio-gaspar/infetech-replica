import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Bold, Italic, List, ListOrdered, Link2, Image as ImageIcon, Heading2, Heading3, Quote, Undo, Redo } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export function RichTextEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false }), Image],
    content: value,
    editorProps: { attributes: { class: "prose max-w-none min-h-[200px] p-3 focus:outline-none" } },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) editor.commands.setContent(value || "", { emitUpdate: false });
  }, [value, editor]);

  if (!editor) return <div className="border rounded h-[240px] bg-slate-50" />;

  const btn = (active: boolean) => `h-7 w-7 p-0 ${active ? "bg-primary/10 text-primary" : ""}`;

  return (
    <div className="border rounded bg-white">
      <div className="flex flex-wrap gap-1 border-b p-1">
        <Button type="button" variant="ghost" size="sm" className={btn(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="w-3 h-3" /></Button>
        <Button type="button" variant="ghost" size="sm" className={btn(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="w-3 h-3" /></Button>
        <Button type="button" variant="ghost" size="sm" className={btn(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 className="w-3 h-3" /></Button>
        <Button type="button" variant="ghost" size="sm" className={btn(editor.isActive("heading", { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 className="w-3 h-3" /></Button>
        <Button type="button" variant="ghost" size="sm" className={btn(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="w-3 h-3" /></Button>
        <Button type="button" variant="ghost" size="sm" className={btn(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="w-3 h-3" /></Button>
        <Button type="button" variant="ghost" size="sm" className={btn(editor.isActive("blockquote"))} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote className="w-3 h-3" /></Button>
        <Button type="button" variant="ghost" size="sm" className={btn(false)} onClick={() => {
          const url = prompt("URL do link:");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}><Link2 className="w-3 h-3" /></Button>
        <Button type="button" variant="ghost" size="sm" className={btn(false)} onClick={() => {
          const url = prompt("URL da imagem:");
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }}><ImageIcon className="w-3 h-3" /></Button>
        <div className="ml-auto flex gap-1">
          <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => editor.chain().focus().undo().run()}><Undo className="w-3 h-3" /></Button>
          <Button type="button" variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => editor.chain().focus().redo().run()}><Redo className="w-3 h-3" /></Button>
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
