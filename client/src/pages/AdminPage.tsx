import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  MediaQuery,
  Modal,
  Paper,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { UserAvatar } from '../components/UserAvatar';
import { useUser } from '../contexts/UserContext';

function AdminPage() {
  const { users, updateUserRole, deleteUser, getAllUsers } = useUser();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleMakeAdmin = async (userId: string, isAdmin: boolean) => {
    await updateUserRole(userId, isAdmin);
  };

  const handleDeleteUser = async (userId: string) => {
    await deleteUser(userId);
    setIsDeleteModalOpen(false);
  };

  const sortedUsers = users?.sort((a, b) => {
    return a.username.localeCompare(b.username);
  });

  return (
    <Container size="xl">
      <Modal
        centered
        opened={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete user"
        size="sm"
      >
        <div>Are you sure you want to delete this user?</div>
        <Flex justify="right">
          <Group mt="md" spacing="sm">
            <Button
              variant="outline"
              color="blue"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="filled"
              color="red"
              onClick={() => handleDeleteUser(userIdToDelete)}
            >
              Delete
            </Button>
          </Group>
        </Flex>
      </Modal>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {sortedUsers &&
          sortedUsers.map((user) => (
            <MediaQuery
              key={user._id}
              query="(max-width: 500px)"
              styles={{ width: '20rem' }}
            >
              <Paper shadow="sm" p="md" m="sm" sx={{ width: '30rem' }}>
                <Flex
                  justify="space-between"
                  align="center"
                  sx={{
                    '@media (max-width: 600px)': {
                      flexDirection: 'column',
                      gap: '1rem',
                    },
                  }}
                >
                  <UserAvatar
                    image="https://cdn.pixabay.com/photo/2022/08/27/15/48/crocodile-7414745_960_720.jpg"
                    name={user?.username || ''}
                  />
                  <Group>
                    <Button
                      variant="outline"
                      onClick={() => handleMakeAdmin(user._id, !user.isAdmin)}
                      color={user.isAdmin ? 'red' : 'green'}
                    >
                      {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                    </Button>
                    <Button
                      onClick={() => {
                        setUserIdToDelete(user._id);
                        setIsDeleteModalOpen(true);
                      }}
                      color="red"
                    >
                      Delete
                    </Button>
                  </Group>
                </Flex>
              </Paper>
            </MediaQuery>
          ))}
      </Box>
    </Container>
  );
}

export default AdminPage;
