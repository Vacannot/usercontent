import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  Header,
  MediaQuery,
  ScrollArea,
  createStyles,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconHome, IconUserShield } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { UserAvatar } from './UserAvatar';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

export function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const { user: loggedInUser } = useUser();
  const { user } = useUser();

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    closeDrawer();
  }

  return (
    <Box sx={{ position: 'sticky', top: 0, left: 0, right: 0, zIndex: 1 }}>
      <Header height={65} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Link onClick={scrollToTop} to="/">
            <MediaQuery
              query="(max-width: 500px)"
              styles={{ height: '45px', width: '190px' }}
            >
              <img
                src="/assets/shareigator.png"
                alt="Shareigator logo"
                width="230px"
                height="55px"
              />
            </MediaQuery>
          </Link>
          <Group
            sx={{ height: '100%' }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Link to="/" className={classes.link} onClick={scrollToTop}>
              <IconHome
                style={{ marginRight: '0.2rem' }}
                size="1.2rem"
                stroke={0.8}
              />
              Homepage
            </Link>
            {loggedInUser?.isAdmin && (
              <Link to="/admin" className={classes.link} onClick={scrollToTop}>
                <IconUserShield
                  style={{ marginRight: '0.2rem' }}
                  size="1.2rem"
                  stroke={0.8}
                />
                Admin
              </Link>
            )}
          </Group>

          <Group className={classes.hiddenMobile}>
            {user && (
              <Link
                onClick={scrollToTop}
                style={{ textDecoration: 'none' }}
                to="/profile"
              >
                <UserAvatar
                  image="https://cdn.pixabay.com/photo/2022/08/27/15/48/crocodile-7414745_960_720.jpg"
                  name={user?.username}
                />
              </Link>
            )}
            {!loggedInUser?._id && (
              <Link to="/login">
                <Button variant="outline" color="green">
                  Log in
                </Button>
              </Link>
            )}

            {!loggedInUser?._id && (
              <Link to="/register">
                <Button color="green">Sign up</Button>
              </Link>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Shareigator"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        {user && (
          <Link
            onClick={scrollToTop}
            style={{ textDecoration: 'none' }}
            to="/profile"
          >
            <UserAvatar
              image="https://cdn.pixabay.com/photo/2022/08/27/15/48/crocodile-7414745_960_720.jpg"
              name={user?.username}
            />
          </Link>
        )}
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="lg"
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />

          <a href="/" className={classes.link}>
            <IconHome
              style={{ marginRight: '0.2rem' }}
              size="1.2rem"
              stroke={0.8}
            />
            Homepage
          </a>
          {loggedInUser?.isAdmin && (
            <Link onClick={scrollToTop} to="/admin" className={classes.link}>
              <IconUserShield
                style={{ marginRight: '0.2rem' }}
                size="1.2rem"
                stroke={0.8}
              />
              Admin
            </Link>
          )}

          <Divider
            my="lg"
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />

          <Group position="center" grow pb="xl" px="md">
            {!loggedInUser?._id && (
              <Link style={{ textDecoration: 'none' }} to="/login">
                <Button
                  onClick={scrollToTop}
                  fullWidth
                  variant="outline"
                  color="green"
                >
                  Log in
                </Button>
              </Link>
            )}
            {!loggedInUser?._id && (
              <Link style={{ textDecoration: 'none' }} to="/register">
                <Button onClick={scrollToTop} fullWidth color="green">
                  Sign up
                </Button>
              </Link>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
