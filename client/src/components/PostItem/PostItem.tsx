import React, { useState } from "react"
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import { Edit, Delete, Favorite } from "@mui/icons-material"
import { Post, User } from "../types"

interface PostItemProps {
  post: Post
  activeUserId: number | null
  onEditPost: (post: Post) => void
  onLikePost: (post: Post) => void
  onDeletePost: (postId: number) => void
  users: User[]
}

export const PostItem: React.FC<PostItemProps> = ({
  post,
  activeUserId,
  onEditPost,
  onLikePost,
  onDeletePost,
  users,
}) => {
  const { id, userId, date, content, imageUrl, likes } = post
  const isActiveUser = activeUserId === userId
  const user = users.find((user) => user.id === userId)

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)

  const handleEditClick = () => {
    onEditPost(post)
  }

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirmed = () => {
    setIsDeleteDialogOpen(false)
    onDeletePost(id)
  }

  const handleDeleteCanceled = () => {
    setIsDeleteDialogOpen(false)
  }

  const handleLikeClick = () => {
    onLikePost({
      ...post,
      likes: post.likes + 1,
    })
    setLikeCount((prevCount) => prevCount + 1)
  }

  return (
    <>
      <Card sx={{ maxWidth: 600, margin: "16px auto" }}>
        <CardHeader
          avatar={<Avatar src={user?.avatar} />}
          title={`User ${userId}`}
          subheader={new Date(date).toLocaleString()}
        />
        <CardContent>
          <Typography variant="body1">{content}</Typography>
          {imageUrl && (
            <CardMedia
              component="img"
              height="194"
              image={imageUrl}
              alt="Post Image"
            />
          )}
        </CardContent>

        <CardActions disableSpacing>
          <IconButton onClick={handleEditClick}>
            <Edit />
          </IconButton>
          <IconButton onClick={handleDeleteClick}>
            <Delete />
          </IconButton>
          <IconButton onClick={handleLikeClick}>
            <Favorite />
          </IconButton>
          <Typography>{likeCount}</Typography>
        </CardActions>
      </Card>

      <Dialog open={isDeleteDialogOpen} onClose={handleDeleteCanceled}>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleDeleteCanceled}>Cancel</button>
          <button onClick={handleDeleteConfirmed}>Delete</button>
        </DialogActions>
      </Dialog>
    </>
  )
}
