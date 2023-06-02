import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostContextType {
  posts: Post[] | null;
  createPost: (title: string, content: string) => Promise<void>;
  updatePost: (updatedPost: Post) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
}

export interface PostProviderProps {
  children: React.ReactNode;
}

const PostContext = createContext<PostContextType>({
  posts: null,
  createPost: async () => {},
  updatePost: async () => {},
  deletePost: async () => {},
});

export const usePost = () => useContext(PostContext);

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const { user } = useUser();

  const createPost = async (title: string, content: string) => {
    if (!user) throw new Error("User is not logged in");

    const response = await axios.post("/api/posts", {
      title,
      content,
    });

    setPosts((prevPosts) =>
      prevPosts ? [...prevPosts, response.data] : [response.data]
    );
  };

  const updatePost = async (updatedPost: Post) => {
    if (!user) throw new Error("User is not logged in");

    const response = await axios.put(`/api/posts/${updatedPost._id}`, {
      ...updatedPost,
    });

    setPosts((prevPosts) => {
      if (!prevPosts) return null;

      const updatedPosts = prevPosts.map((post) =>
        post._id === updatedPost._id ? response.data : post
      );
      return updatedPosts;
    });
  };

  const fetchPosts = async () => {
    const response = await axios.get("/api/posts");
    setPosts(response.data);
  };

  const deletePost = async (postId: string) => {
    if (!user) throw new Error("User is not logged in");

    await axios.delete(`/api/posts/${postId}`);

    setPosts((prevPosts) => {
      if (!prevPosts) return null;

      const updatedPosts = prevPosts.filter((post) => post._id !== postId);
      return updatedPosts;
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        createPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
