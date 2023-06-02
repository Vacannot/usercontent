import { Box } from '@mantine/core';
import CreatePost from '../components/CreatePost';
import Feed from '../components/Feed';
import { Post, usePost } from '../contexts/PostContext';
import { useUser } from '../contexts/UserContext';

function Home() {
  const { posts } = usePost();
  const { user: loggedInUser } = useUser();

  const sortedPosts = posts?.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <Box>
      {loggedInUser && <CreatePost />}
      {sortedPosts &&
        sortedPosts.map((post: Post) => <Feed key={post._id} post={post} />)}
    </Box>
  );
}

export default Home;
