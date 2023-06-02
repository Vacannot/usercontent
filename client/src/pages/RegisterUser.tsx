import {
  Button,
  Container,
  Flex,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core';
import { useFormik } from 'formik';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useUser } from '../contexts/UserContext';

const RegisterValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(2, 'Username must be at least 2 characters')
    .max(50, 'Username must be at most 50 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(100, 'Password must be at most 100 characters'),
});

interface ErrorMessageWrapperProps {
  children: ReactNode;
}

const ErrorMessageWrapper: React.FC<ErrorMessageWrapperProps> = ({
  children,
}) => (
  <div
    style={{
      color: children ? 'red' : 'transparent',
      fontSize: '0.9rem',
      textAlign: 'center',
      marginTop: '0.2rem',
      minHeight: '1.7rem',
    }}
  >
    {children || ' '}
  </div>
);

export default function Signup() {
  const { register } = useUser();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: RegisterValidationSchema,
    onSubmit: async (values) => {
      await register(values.username, values.password);
      navigate('/login');
    },
  });

  return (
    <Container size={520} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 700,
        })}
      >
        Create an account!
      </Title>
      <Title align="center" order={4}>
        Become a fellow gator today 🐊
      </Title>
      <Flex justify="center" align="center">
        <img
          style={{ borderBottomLeftRadius: '50%' }}
          src="/assets/register_gator.png"
          alt="An alligator browsing social medias on a smartphone"
          width="250px"
          height="250px"
        />
      </Flex>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={formik.handleSubmit}>
          <TextInput
            withAsterisk
            label="Username"
            placeholder="Username"
            name="username"
            id="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="off"
          />

          <ErrorMessageWrapper>
            {formik.touched.username && formik.errors.username}
          </ErrorMessageWrapper>

          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="Password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="off"
          />

          <ErrorMessageWrapper>
            {formik.touched.password && formik.errors.password}
          </ErrorMessageWrapper>

          <Button type="submit" color="green" fullWidth mt="xs">
            Sign Up
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
