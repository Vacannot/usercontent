import {
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
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Post, usePost } from "../contexts/PostContext";
import { useUser } from "../contexts/UserContext";

interface MoodboardProps {
  post: Post;
}

const CreatePostValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters"),
  content: Yup.string()
    .required("Content is required")
    .min(5, "Content must be at least 5 characters"),
});

function Moodboard({ post }: MoodboardProps) {
  const { updatePost, deletePost } = usePost();
  const { getAllUsers, users } = useUser();
  const { user: loggedInUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const allUsers = await getAllUsers();
    }
    fetchData();
  }, []);

  useEffect(() => {
    formik.setValues({
      title: post.title,
      content: post.content,
    });
  }, [post]);

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

  let formattedUsername = "";
  if (author) {
    const username = author.username.split("@")[0];
    formattedUsername = username.charAt(0).toUpperCase() + username.slice(1);
  }

  return (
    <Container size="xl">
      <Box sx={{ display: "flex", marginTop: "2rem" }}>
        <MediaQuery query="(min-width: 500px)" styles={{ width: "25rem" }}>
          <Paper shadow="sm" p="lg">
            <Flex justify="space-between">
              <Group sx={{ fontSize: "0.9rem", color: "black" }}>
                <p>From: {formattedUsername}</p>

                {new Date(post.createdAt).toLocaleString("sv-SE", {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }) || ""}
              </Group>

              {canEditOrDelete && (
                <Group sx={{ cursor: "pointer" }}>
                  <IconEdit stroke={1.3} onClick={handleUpdate} />
                  <IconTrash stroke={1.3} onClick={handleDelete} />
                </Group>
              )}
            </Flex>
            <Divider mt="sm" />
            <Title order={2} mb="sm" mt="md" fz="md">
              {post.title}
            </Title>
            <Text mb="lg" mt="md" fz="sm">
              {post.content}
            </Text>
            <Divider mt="sm" />
          </Paper>
        </MediaQuery>
      </Box>

      <Modal
        centered
        opened={isDeleteModalOpen}
        onClose={handleCloseModal}
        title="Delete post"
        size="sm"
      >
        <div>Are you sure you want to delete mood?</div>
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
            <div style={{ color: "red", fontSize: "0.9rem" }}>
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
            <div style={{ color: "red", fontSize: "0.9rem" }}>
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
    </Container>
  );
}
export default Moodboard;
