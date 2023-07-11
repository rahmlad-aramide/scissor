import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  name?: string;
  username: string;
  token: string;
  profile_photo?: string | null;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  authenticatedUser: User | null;
  setAuthenticatedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => null,
  authenticatedUser: null,
  setAuthenticatedUser: () => null,
});

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = () => {
    let authUser = localStorage.getItem('user');
    setUser(authUser ? JSON.parse(authUser) : null);
  };

  const value: UserContextType = {
    user,
    setUser,
    authenticatedUser,
    setAuthenticatedUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = (): UserContextType => useContext(UserContext);

export default UserProvider;
