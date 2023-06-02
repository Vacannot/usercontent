import { Box, Card } from "@mantine/core";
import CreatePost from "../components/CreatePost";
import Feed from "../components/MoodFeed";
import { Post, usePost } from "../contexts/PostContext";
import { useUser } from "../contexts/UserContext";

function Home() {
  const { posts } = usePost();
  const { user: loggedInUser } = useUser();

  const sortedPosts = posts?.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <Box>
      {loggedInUser ? (
        <CreatePost />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card>
            <h2>Log in to make posts!</h2>
          </Card>
        </Box>
      )}

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {sortedPosts &&
          sortedPosts.map((post: Post) => <Feed key={post._id} post={post} />)}
      </Box>
    </Box>
  );
}

export default Home;
