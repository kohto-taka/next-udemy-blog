import Link from "next/link"
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale"
import  Image from "next/image"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PostCardProps } from "@/types/post"

export default function PostCard({post}: PostCardProps) {
  return (
      <Card className="hover:shadow-lg transition-shadow p-0">
        <Link href={`/posts/${post.id}`}>
          {
            post.topImage && (
              <div className="relative w-full h-48">
                <Image 
                  src={post.topImage}
                  alt="topImage"
                  fill
                  sizes="{(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw}"
                  className="object-cover rounded-t-md"
                  />
              </div>
            )
          }
          <CardHeader>
            <CardTitle className="line-clamp-2 mt-4">{post.title}</CardTitle>
          </CardHeader>
          <CardContent className="pb-6">
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {post.content}
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span className="text-xs text-gray-500">{post.author.name}</span>
              <span className="text-xs text-gray-500">
                { formatDistanceToNow
                  (
                    new Date(post.createdAt),
                      { 
                        addSuffix: true,
                        locale: ja
                      }
                  )
                }
                </span>
            </div>
          </CardContent>
        </Link>
      </Card>
  )
}
