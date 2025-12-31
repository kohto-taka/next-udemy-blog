'use client'

import { useState, useActionState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import TextareaAutosize from 'react-textarea-autosize'
import "highlight.js/styles/stackoverflow-light.css";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updatePost } from '@/lib/actions/updatePost';
import Image from 'next/image';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type EditPostFormProps = {
  post: {
    id: string;
    title: string;
    content: string;
    topImage: string | null;
    published: boolean;
  }
}

export default function EditPostForm({post}: EditPostFormProps) {
  const [content, setContent] = useState(post.content);
  const [contentLength, setContentLength] = useState(0);
  const [preview, setPreview] = useState(false);
  const [state, formAction] = useActionState(updatePost, {
    success: false,
    errors: {}
  });
  const [title, setTitle] = useState(post.title);
  const [published, setPublished] = useState(post.published);
  const [imagePreview, setImagePreview] = useState(post.topImage);
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setContentLength(value.length);
  };
  const handleImageChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file) return;
    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);
  }

  useEffect(
    () => {
      if(imagePreview && imagePreview !== post.topImage) {
        URL.revokeObjectURL(imagePreview);
      }
    },
    [imagePreview, post.topImage]
  )


  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">新規記事作成(Markdown対応)</h1>
      <form action={formAction} className="space-y-4">
        <div>
          <Label htmlFor="title">タイトル</Label>
          <Input type="text"
                 id="title"
                 name="title"
                 placeholder="タイトルを入力してください"
                 required
                 value={title}
                 onChange={(e) => setTitle(e.target.value)}/>
          {
            state.errors?.title && (
              <p className="text-red-500 mt-1">{state.errors.title[0]}</p>
            )
          }
        </div>
        <div>
          <Label htmlFor="topImage">
            トップ画像
          </Label>
          <Input type="file"
                 id="topImage"
                 name="topImage" 
                 accept="image/*"
                 onChange={handleImageChange}
                 />
          {
            imagePreview && (
              <div className='mt-2'>
                <Image
                  src={imagePreview}
                  alt="Image Preview"
                  width={200}
                  height={200}
                  sizes="100px"
                  className="object-cover"
                />
              </div>
            )
          }
          {
            state.errors?.topImage && (
              <p className="text-red-500 mt-1">{state.errors.topImage[0]}</p>
            )
          }
        </div>
        <div>
          <Label htmlFor="content">内容(Markdown対応)</Label>
          <TextareaAutosize
            id="content"
            name="content"
            placeholder="内容を入力してください"
            className="w-full border p-2"
            required
            minRows={8}
            value={content}
            onChange={handleContentChange}
          />
          {
            state.errors?.contet && (
              <p className="text-red-500 mt-1">{state.errors.contet[0]}</p>
            )
          }
        </div>
        <div className="text-right text-sm text-gray-500 mt-1">
          文字数: {contentLength}
        </div>
        <div>
          <Button type="button" onClick={() => setPreview(!preview)}>
            {preview ? 'プレビューを非表示' : 'プレビューを表示'}
          </Button>
        </div>
        {preview && (
          <div className='border p-4 bg-gray-50 prose max-w-none'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              skipHtml={false}
              unwrapDisallowed={true}>
              {content}
            </ReactMarkdown>
          </div>
        )}
        <RadioGroup defaultValue={published.toString()} name="published" onValueChange={(value) => setPublished(value === "true")}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="published-one" />
            <Label htmlFor="published-one">表示</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="published-two" />
            <Label htmlFor="published-two">非表示</Label>
          </div>
        </RadioGroup>
        <Button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-md'>
          更新する
        </Button>
        <input type="hidden" name="postId" value={post.id} />
        <input type="hidden" name="oldTopImage" value={post.topImage || ''} />
      </form>
    </div>
  )
}
