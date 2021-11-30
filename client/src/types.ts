export type UserType = {
  _id: string
  username: string
  email: string
  image: string
}

export type CommentType = {
  _id: string
  content: string
  postId: string
  likes: UserType[]
  createdBy: UserType
  createdAt: string
  updatedAt: string
}

export type PostType = {
  _id: string
  title: string
  content: string
  comments: CommentType[]
  likes: UserType[]
  createdBy: UserType
  createdAt: string
  updatedAt: string
}
