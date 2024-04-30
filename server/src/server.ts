import express, { Express, Request, Response } from "express"
import cors from "cors"
import fs from "fs"
import path from "path"

const app: Express = express()
app.use(cors())
app.use(express.json())
const port = 3000

const postsFilePath = path.join(__dirname, "..", "db", "posts.json")
const usersFilePath = path.join(__dirname, "..", "db", "users.json")

// Fetch users
app.get("/api/users", (req: Request, res: Response) => {
  const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"))
  res.json(users)
})

// Fetch posts
app.get("/api/posts", (req: Request, res: Response) => {
  const posts = JSON.parse(fs.readFileSync(postsFilePath, "utf-8"))
  res.json(
    posts.sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  )
})

// Create new post
app.post("/api/posts", (req: Request, res: Response) => {
  const newPost = req.body
  const posts = JSON.parse(fs.readFileSync(postsFilePath, "utf-8"))
  posts.push(newPost)
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2))
  res.status(201).json(newPost)
})

// Delete post
app.delete("/api/posts/:id", (req: Request, res: Response) => {
  const postId = parseInt(req.params.id)
  const posts = JSON.parse(fs.readFileSync(postsFilePath, "utf-8"))
  const updatedPosts = posts.filter((post: any) => post.id !== postId)
  fs.writeFileSync(postsFilePath, JSON.stringify(updatedPosts, null, 2))
  res.status(204).send()
})

// Update post
app.put("/api/posts/:id", (req: Request, res: Response) => {
  const postId = parseInt(req.params.id)
  const updatedPost = req.body
  const posts = JSON.parse(fs.readFileSync(postsFilePath, "utf-8"))
  const updatedPosts = posts.map((post: any) =>
    post.id === postId ? updatedPost : post
  )
  fs.writeFileSync(postsFilePath, JSON.stringify(updatedPosts, null, 2))
  res.json(updatedPost)
})

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up!")
})

app.listen(port, () => {
  console.log(`🔋 Server is running at http://localhost:${port}`)
})
