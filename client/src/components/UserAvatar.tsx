import {
  Avatar,
  Group,
  Text,
  UnstyledButton,
  UnstyledButtonProps,
  createStyles,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
  },
}));

interface UserAvatarProps extends UnstyledButtonProps {
  image: string;
  name?: string | undefined;
}

export function UserAvatar({ name, ...others }: UserAvatarProps) {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group>
        <Text size="sm" weight={500}>
          {name}
        </Text>
        <Avatar
          radius="xl"
          src={
            'https://cdn.pixabay.com/photo/2022/08/27/15/48/crocodile-7414745_960_720.jpg'
          }
          alt="Profile picture"
        />
        <div style={{ flex: 1 }}></div>
      </Group>
    </UnstyledButton>
  );
}
