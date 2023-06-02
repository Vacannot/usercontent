import {
  Box,
  Burger,
  Button,
  Drawer,
  Group,
  Header,
  ScrollArea,
  createStyles,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHome, IconShield, IconLogout } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: "black",
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
  },

  smallLink: {
    textDecoration: "none",
    color: "black",
    display: "flex",
    flexDirection: "row",
    marginTop: "1rem",
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();
  const { user: loggedInUser } = useUser();
  const { user, logout } = useUser();

  return (
    <Box sx={{ position: "sticky", top: 0, left: 0, right: 0, zIndex: 1 }}>
      <Header height={65} px="md">
        <Group position="center" sx={{ height: "100%" }}>
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Link to="/" className={classes.link}>
              <IconHome style={{ marginRight: "1rem" }} size="1.2rem" />
              <h4>Home</h4>
            </Link>
            {loggedInUser?.isAdmin && (
              <Link to="/admin" className={classes.link}>
                <IconShield style={{ marginRight: "1rem" }} size="1.2rem" />
                <h4>Admin</h4>
              </Link>
            )}
          </Group>

          <Group className={classes.hiddenMobile}>
            {user && (
              <>
                {user.username}

                <Link to="/">
                  <Button
                    color="red"
                    variant="outline"
                    onClick={logout}
                    rightIcon={<IconLogout stroke={1.5} />}
                  >
                    Log out
                  </Button>
                </Link>
              </>
            )}
            {!loggedInUser?._id && (
              <>
                <Link to="/login">
                  <Button variant="outline" color="blue">
                    Log in
                  </Button>
                </Link>

                <Link to="/register">
                  <Button color="blue">Sign up</Button>
                </Link>
              </>
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
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        {user && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3>Moody</h3>
            Logged in as: {user.username}
            <Link to="/">
              <Button
                mt="lg"
                color="red"
                onClick={() => {
                  toggleDrawer(), logout();
                }}
                variant="outline"
                leftIcon={<IconLogout stroke={1.5} />}
              >
                Log out
              </Button>
            </Link>
          </Box>
        )}
        <ScrollArea mt="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Link
              to="/"
              className={classes.smallLink}
              onClick={() => toggleDrawer()}
            >
              <IconHome style={{ marginRight: "1rem" }} />
              <h4>Home</h4>
            </Link>
            {loggedInUser?.isAdmin && (
              <Link to="/admin" className={classes.smallLink}>
                <IconShield style={{ marginRight: "1rem" }} />
                <h4>Admin</h4>
              </Link>
            )}

            <Group position="center" grow pb="xl" px="md" mt="lg">
              {!loggedInUser?._id && (
                <Link
                  style={{ textDecoration: "none" }}
                  to="/login"
                  onClick={() => toggleDrawer()}
                >
                  <Button fullWidth variant="outline" color="blue">
                    Log in
                  </Button>
                </Link>
              )}
              {!loggedInUser?._id && (
                <Link
                  style={{ textDecoration: "none", minWidth: "6rem" }}
                  to="/register"
                  onClick={() => toggleDrawer()}
                >
                  <Button fullWidth color="blue">
                    Sign up
                  </Button>
                </Link>
              )}
            </Group>
          </Box>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
