import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Input,
  MediaQuery,
  Paper,
  Textarea,
} from '@mantine/core';
import { IconMapPin, IconMoodSmileBeam, IconPhoto } from '@tabler/icons-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { usePost } from '../contexts/PostContext';
import { useUser } from '../contexts/UserContext';
import { UserAvatar } from './UserAvatar';

const CreatePostValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required('You need to write a title for your post')
    .min(2, 'Title must be at least 2 characters'),
  content: Yup.string()
    .required('You need to write something.')
    .min(5, 'Content must be at least 5 characters'),
});

function CreatePost() {
  const { createPost } = usePost();
  const { user } = useUser();

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    validationSchema: CreatePostValidationSchema,
    onSubmit: async (values) => {
      await createPost(values.title, values.content);
      formik.resetForm();
    },
  });
  return (
    <Container size="xl">
      <Box mt="lg" sx={{ display: 'flex', justifyContent: 'center' }}>
        <MediaQuery query="(max-width: 500px)" styles={{ width: '20rem' }}>
          <Paper shadow="sm" p="md" sx={{ width: '30rem' }}>
            <UserAvatar
              image="https://cdn.pixabay.com/photo/2022/08/27/15/48/crocodile-7414745_960_720.jpg"
              name={user?.username || ''}
            />
            <form onSubmit={formik.handleSubmit}>
              <Input
                style={{
                  borderColor: 'white',
                  outline: 'none',
                  marginTop: '1rem',
                }}
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter the title of your post"
              />
              {formik.touched.title && formik.errors.title && (
                <div
                  style={{
                    color: 'red',
                    fontSize: '0.9rem',
                    marginTop: '0.2rem',
                  }}
                >
                  {formik.errors.title}
                </div>
              )}
              <Textarea
                style={{
                  border: 0,
                  outline: 'none',
                  marginTop: '1rem',
                }}
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="What's on your mind today..?"
              />
              {formik.touched.content && formik.errors.content && (
                <div
                  style={{
                    color: 'red',
                    fontSize: '0.9rem',
                    marginTop: '0.2rem',
                  }}
                >
                  {formik.errors.content}
                </div>
              )}
              <Flex justify="space-between">
                <Group mt="md" spacing="md">
                  <IconPhoto stroke={0.8} />
                  <IconMoodSmileBeam stroke={0.8} />
                  <IconMapPin stroke={0.8} />
                </Group>
                <Button mt="md" size="xs" color="green" type="submit">
                  Share
                </Button>
              </Flex>
            </form>
          </Paper>
        </MediaQuery>
      </Box>
    </Container>
  );
}

export default CreatePost;
