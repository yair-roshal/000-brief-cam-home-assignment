import React, { useState, useEffect } from "react"
import axios from "axios"
import { Header, PostList, PostEditor } from "./components"
import { Post, User } from "./types"

const url = "http://localhost:3000"

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [activeUserId, setActiveUserId] = useState<number | null>(null)
  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [usedIds, setUsedIds] = useState(new Set())

  useEffect(() => {
    fetchUsers()
    fetchPosts()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${url}/api/users`)
      setUsers(response.data)

      const randomIndex = Math.floor(Math.random() * response.data.length)
      setActiveUserId(response.data[randomIndex]?.id)
      setUsedIds(new Set([users[randomIndex]?.id]))
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${url}/api/posts`)
      if (Array.isArray(response.data)) {
        const sortedPosts = response.data.sort(
          (a: Post, b: Post) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        setPosts(sortedPosts)
      } else {
        console.error(
          "Expected an array of posts from the server, but received:",
          response.data
        )
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    }
  }

  const handleAvatarClick = () => {
    const availableUsers = users.filter((user) => !usedIds.has(user.id))

    if (availableUsers.length === 0) {
      setUsedIds(new Set())
      setActiveUserId(users[0].id)
      setUsedIds((prevUsedIds) => new Set(prevUsedIds.add(users[0].id)))
    } else {
      const randomIndex = Math.floor(Math.random() * availableUsers.length)
      setActiveUserId(availableUsers[randomIndex].id)
      setUsedIds(
        (prevUsedIds) =>
          new Set(prevUsedIds.add(availableUsers[randomIndex].id))
      )
    }
  }

  const handleCreatePost = async (postData: Post) => {
    try {
      const response = await axios.post(`${url}/api/posts`, postData)
      setPosts([...posts, response.data])
    } catch (error) {
      console.error("Error creating post:", error)
    }
  }

  const handleEditPost = (post: Post) => {
    setEditingPost(post)
    setIsPostEditorOpen(true)
  }

  const handleUpdatePost = async (updatedPost: Post) => {
    try {
      const response = await axios.put(
        `${url}/api/posts/${updatedPost.id}`,
        updatedPost
      )
      setPosts(
        posts.map((post) => (post.id === updatedPost.id ? response.data : post))
      )
      closePostEditor()
    } catch (error) {
      console.error("Error updating post:", error)
    }
  }

  const handleDeletePost = async (postId: number) => {
    try {
      await axios.delete(`${url}/api/posts/${postId}`)
      setPosts(posts.filter((post) => post.id !== postId))
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  const closePostEditor = () => {
    setIsPostEditorOpen(false)
    setEditingPost(null)
  }

  return (
    <>
      <Header
        activeUser={users.find((user) => user.id === activeUserId) || null}
        onAvatarClick={handleAvatarClick}
        openPostEditor={() => setIsPostEditorOpen(true)}
      />
      <PostList
        posts={posts}
        activeUserId={activeUserId}
        onEditPost={handleEditPost}
        onDeletePost={handleDeletePost}
        onLikePost={handleUpdatePost}
        users={users}
      />
      <PostEditor
        activeUserId={activeUserId}
        open={isPostEditorOpen}
        post={editingPost}
        onClose={closePostEditor}
        onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
      />
    </>
  )
}

export default App
