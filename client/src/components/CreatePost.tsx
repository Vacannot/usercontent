import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  MediaQuery,
  Paper,
  Textarea,
} from "@mantine/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePost } from "../contexts/PostContext";
import { useUser } from "../contexts/UserContext";

const CreatePostValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("You need to write a title for your post")
    .min(2, "Title must be at least 2 characters"),
  content: Yup.string()
    .required("You need to write something.")
    .min(5, "Content must be at least 5 characters"),
});

function CreatePost() {
  const { createPost } = usePost();
  const { user } = useUser();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: CreatePostValidationSchema,
    onSubmit: async (values) => {
      await createPost(values.title, values.content);
      formik.resetForm();
    },
  });

  let formattedUsername = "";
  if (user) {
    const username = user.username.split("@")[0];
    formattedUsername = username.charAt(0).toUpperCase() + username.slice(1);
  }
  return (
    <Container size="xl">
      <Box mt="lg" sx={{ display: "flex", justifyContent: "center" }}>
        <MediaQuery query="(max-width: 500px)" styles={{ width: "20rem" }}>
          <Paper shadow="sm" p="md" sx={{ width: "30rem" }}>
            <p>Welcome {formattedUsername}, how are you?</p>
            <form onSubmit={formik.handleSubmit}>
              <Input
                style={{
                  borderColor: "white",
                  outline: "none",
                  marginTop: "1rem",
                }}
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter a title to your post"
              />
              {formik.touched.title && formik.errors.title && (
                <div
                  style={{
                    color: "red",
                    fontSize: "0.9rem",
                    marginTop: "0.2rem",
                  }}
                >
                  {formik.errors.title}
                </div>
              )}
              <Textarea
                style={{
                  border: 0,
                  outline: "none",
                  marginTop: "1rem",
                }}
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="How are you feeling today?"
              />
              {formik.touched.content && formik.errors.content && (
                <div
                  style={{
                    color: "red",
                    fontSize: "0.9rem",
                    marginTop: "0.2rem",
                  }}
                >
                  {formik.errors.content}
                </div>
              )}
              <Flex justify="flex-end">
                <Button mt="md" size="xs" color="blue" type="submit">
                  Send!
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
