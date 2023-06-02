import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { IconLogout, IconUserEdit } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import CreatePost from '../components/CreatePost';
import Feed from '../components/Feed';
import { Post, usePost } from '../contexts/PostContext';
import { useUser } from '../contexts/UserContext';

function UserProfile() {
  const { user, logout } = useUser();
  const { posts } = usePost();

  const theme = useMantineTheme();

  const userPosts = posts?.filter((post) => post.author === user?._id);

  return (
    <Container size="xl">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box pos="relative" mt="lg" sx={{ cursor: 'pointer' }}>
          <Avatar
            mt="lg"
            sx={{ borderRadius: '50%', height: '10rem', width: '10rem' }}
            src="https://cdn.pixabay.com/photo/2022/08/27/15/48/crocodile-7414745_960_720.jpg"
            alt="Profile picture"
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '3%',
              left: '50%',
              transform: 'translate(-50%, 0)',
              backgroundColor: theme.colors.teal[5],
              borderRadius: '50%',
              width: '1.9rem',
              height: '1.9rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'opacity 0.2s ease-in-out',
              '&:hover': {
                opacity: 1,
              },
            }}
          >
            <IconUserEdit color="white" />
          </Box>
        </Box>
        <Title order={2} mt="sm">
          {user?.username || ''}
        </Title>
        <Link to="/">
          <Button
            mt="lg"
            color="teal"
            onClick={logout}
            leftIcon={<IconLogout stroke={1.5} />}
          >
            Log out
          </Button>
        </Link>
      </Box>
      <Divider mt="sm" color="teal" />
      <CreatePost />
      {userPosts &&
        userPosts.map((post: Post) => <Feed key={post._id} post={post} />)}
    </Container>
  );
}
export default UserProfile;
