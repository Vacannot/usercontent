import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  _id: string;
  username: string;
  isAdmin: boolean;
}

interface UserContextType {
  user: User | null;
  users: User[] | null;
  register: (username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  getAllUsers: () => Promise<void>;
  updateUserRole: (userId: string, newRole: boolean) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType>({
  user: null,
  users: null,
  register: async (_username: string, _password: string) => {},
  login: async (_username: string, _password: string) => false,
  logout: async () => {},
  getAllUsers: async () => {},
  updateUserRole: async (_userId: string, _newRole: boolean) => {},
  deleteUser: async (_userId: string) => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const { user: loggedInUser } = useUser();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const response = await axios.get('/api/users/auth');
      if (response.data.success) {
        setUser(response.data.user);
      }
    };

    checkLoggedIn();
  }, []);

  const register = async (username: string, password: string) => {
    await axios.post('/api/users/register', {
      username,
      password,
    });
  };

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await axios.post('/api/users/login', {
        username,
        password,
      });
      setUser(response.data);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    await axios.post('/api/users/logout');
    setUser(null);
  };

  const getAllUsers = async () => {
    const response = await axios.get('/api/users');
    setUsers(response.data);
  };

  const updateUserRole = async (userId: string, newRole: boolean) => {
    await axios.put(`/api/users/${userId}`, { isAdmin: newRole });
    if (users) {
      const updatedUsers = users.map((user) => {
        if (user._id === userId) {
          // Update the current user's role if necessary
          if (user._id === loggedInUser?._id) {
            setUser({ ...user, isAdmin: newRole });
          }

          return { ...user, isAdmin: newRole };
        } else {
          return user;
        }
      });
      setUsers(updatedUsers);
    }
  };

  const deleteUser = async (userId: string) => {
    await axios.delete(`/api/users/${userId}`);
    if (users) {
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        users,
        register,
        login,
        logout,
        getAllUsers,
        updateUserRole,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
