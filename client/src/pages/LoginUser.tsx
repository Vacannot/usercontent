import {
  Button,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  createStyles,
  rem,
} from '@mantine/core';
import { Field, Form, Formik } from 'formik';
import { ReactNode, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useUser } from '../contexts/UserContext';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: '100%',
    width: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url("/assets/gatorpride.jpg")',
  },

  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: '100vh',
    maxWidth: rem(450),
    paddingTop: rem(80),

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface ErrorMessageWrapperProps {
  children: ReactNode;
}

const ErrorMessageWrapper: React.FC<ErrorMessageWrapperProps> = ({
  children,
}) => (
  <div
    style={{
      color: children ? 'red' : 'transparent',
      textAlign: 'center',
      marginTop: '0.3rem',
      marginBottom: '0.3rem',
      minHeight: '1.1rem',
    }}
  >
    {children || ' '}
  </div>
);

const LoginValidationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export function LoginUser() {
  const { classes } = useStyles();
  const { login } = useUser();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    const loginSuccessful = await login(values.username, values.password);

    if (loginSuccessful) {
      navigate('/');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome to Shareigator!
        </Title>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <>
              <Form>
                <Field
                  as={TextInput}
                  label="Username"
                  placeholder="Username"
                  size="md"
                  name="username"
                />

                <Field
                  as={PasswordInput}
                  label="Password"
                  placeholder="Your password"
                  mt="md"
                  size="md"
                  name="password"
                />
                <ErrorMessageWrapper>{loginError}</ErrorMessageWrapper>
                <Button
                  type="submit"
                  color="green"
                  fullWidth
                  size="md"
                  disabled={isSubmitting}
                >
                  Log in
                </Button>
              </Form>
            </>
          )}
        </Formik>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{' '}
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Text span weight={700} color="green">
              Sign up
            </Text>
          </Link>
        </Text>
      </Paper>
    </div>
  );
}
