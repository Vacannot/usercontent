import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  MediaQuery,
  Modal,
  Paper,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import {
  IconEditCircle,
  IconMessage,
  IconShare3,
  IconThumbUp,
  IconTrash,
} from '@tabler/icons-react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Post, usePost } from '../contexts/PostContext';
import { useUser } from '../contexts/UserContext';
import { UserAvatar } from './UserAvatar';

interface FeedProps {
  post: Post;
}

const CreatePostValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters'),
  content: Yup.string()
    .required('Content is required')
    .min(5, 'Content must be at least 5 characters'),
});

function Feed({ post }: FeedProps) {
  const { updatePost, deletePost } = usePost();
  const { getAllUsers, users } = useUser();
  const { user: loggedInUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [likes, setLikes] = useState(0);

  function handleLike() {
    if (loggedInUser) {
      setLikes((prevLikes) => prevLikes + 1);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const allUsers = await getAllUsers();
    }
    fetchData();
  }, []);

  function buttonCloseModal() {
    setIsModalOpen(false);
  }

  const author = users?.find((user) => user._id === post.author);

  const canEditOrDelete =
    loggedInUser?.isAdmin || loggedInUser?._id === post.author;

  const handleUpdate = () => {
    if (canEditOrDelete) {
      setIsModalOpen(true);
    }
  };
  const formik = useFormik({
    initialValues: {
      title: post.title,
      content: post.content,
    },
    validationSchema: CreatePostValidationSchema,
    onSubmit: async (values) => {
      const updatedPost = {
        ...post,
        title: values.title,
        content: values.content,
      };
      await updatePost(updatedPost);
      formik.resetForm();
      setIsModalOpen(false);
    },
  });

  useEffect(() => {
    formik.setValues({
      title: post.title,
      content: post.content,
    });
  }, [post]);

  const handleDelete = () => {
    if (canEditOrDelete) {
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    deletePost(post._id);
    setIsDeleteModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <Container size="xl">
      <Modal
        centered
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit post"
      >
        <form onSubmit={formik.handleSubmit}>
          <TextInput
            label="Title"
            placeholder="Enter title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="title"
            withAsterisk
          />
          {formik.errors.title && formik.touched.title && (
            <div style={{ color: 'red', fontSize: '0.9rem' }}>
              {formik.errors.title}
            </div>
          )}
          <Textarea
            label="Content"
            placeholder="Enter content"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="content"
            withAsterisk
          />
          {formik.errors.content && formik.touched.content && (
            <div style={{ color: 'red', fontSize: '0.9rem' }}>
              {formik.errors.content}
            </div>
          )}
          <Flex justify="right">
            <Group spacing="sm">
              <Button
                variant="outline"
                color="teal"
                mt="md"
                size="sm"
                onClick={buttonCloseModal}
              >
                Cancel
              </Button>
              <Button color="teal" mt="md" size="sm" type="submit">
                Save changes
              </Button>
            </Group>
          </Flex>
        </form>
      </Modal>

      <Modal
        centered
        opened={isDeleteModalOpen}
        onClose={handleCloseModal}
        title="Delete post"
        size="sm"
      >
        <div>Are you sure you want to delete this post?</div>
        <Flex justify="right">
          <Group mt="md" spacing="sm">
            <Button variant="outline" color="blue" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="filled" color="red" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </Group>
        </Flex>
      </Modal>

      <Box
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}
      >
        <MediaQuery query="(max-width: 500px)" styles={{ width: '20rem' }}>
          <Paper shadow="sm" p="md" sx={{ width: '30rem' }}>
            <Flex justify="space-between">
              <UserAvatar
                image="https://cdn.pixabay.com/photo/2022/08/27/15/48/crocodile-7414745_960_720.jpg"
                name={author?.username}
              />
              {canEditOrDelete && (
                <Group sx={{ cursor: 'pointer' }}>
                  <IconEditCircle stroke={0.8} onClick={handleUpdate} />
                  <IconTrash stroke={0.8} onClick={handleDelete} />
                </Group>
              )}
            </Flex>
            <Divider mt="sm" />
            <Title order={2} mb="sm" mt="md" fz="md">
              {post.title}
            </Title>
            <Text mb="lg" mt="md" fz="md">
              {post.content}
            </Text>
            <Divider mt="sm" />
            <Group mt="sm" sx={{ fontSize: '0.8rem', color: 'gray' }}>
              {new Date(post.createdAt).toLocaleString('sv-SE', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              }) || ''}
            </Group>
            <Flex justify="space-between">
              <Group mt="md" spacing="xs">
                <ActionIcon>
                  <IconThumbUp color="blue" stroke={0.8} onClick={handleLike} />
                </ActionIcon>
                <Badge color="blue" variant="light" size="md">
                  {likes}
                </Badge>
              </Group>

              <Group mt="md">
                <IconMessage stroke={0.8} />
                <IconShare3 stroke={0.8} />
              </Group>
            </Flex>
          </Paper>
        </MediaQuery>
      </Box>
    </Container>
  );
}
export default Feed;
