import React from "react"
import { Post, User } from "../types"
import { PostItem } from "../PostItem"

interface PostListProps {
  posts: Post[]
  activeUserId: number | null
  onEditPost: (post: Post) => void
  onLikePost: (post: Post) => void
  onDeletePost: (postId: number) => void
  users: User[]
}

export const PostList: React.FC<PostListProps> = ({
  posts,
  activeUserId,
  onEditPost,
  onDeletePost,
  onLikePost,

  users,
}) => {
  return (
    <div>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          activeUserId={activeUserId}
          onEditPost={onEditPost}
          onDeletePost={onDeletePost}
          onLikePost={onLikePost}
          users={users}
        />
      ))}
    </div>
  )
}
