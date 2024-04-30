import React, { useState, useEffect } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material"
import { Post } from "../../types"

type PostEditorProps = {
  activeUserId: number | null

  open: boolean
  post: Post | null
  onClose: () => void
  onSubmit: (post: Post) => void
}

export const PostEditor: React.FC<PostEditorProps> = ({
  open,
  post,
  activeUserId,

  onClose,
  onSubmit,
}) => {
  const [content, setContent] = useState(post?.content || "")
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || "")
  useEffect(() => {
    setContent(post?.content || "")
    setImageUrl(post?.imageUrl || "")
  }, [post])

  const handleSubmit = () => {
    const newPost: Post = {
      id: post?.id || Date.now(),
      userId: activeUserId,
      content,
      date: new Date().toISOString(),
      imageUrl,
    }

    onSubmit(newPost)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{post ? "Edit Post" : "Create Post"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Content"
          type="text"
          fullWidth
          multiline
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Image URL"
          type="text"
          fullWidth
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}
