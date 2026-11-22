import React, { createContext, useContext, useEffect, useState } from 'react';
import { api, ApiError } from '../../utils/api/apiClient';

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  totpEnabled: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => null,
  isLoading: true,
  refreshUser: async () => undefined,
});

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const data = await api.get<{ user: User }>('/auth/me');
      setUser(data.user);
    } catch (error) {
      if (!(error instanceof ApiError && error.status === 401)) {
        console.error('Failed to load current user:', error);
      }
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: UserContextType = { user, setUser, isLoading, refreshUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = (): UserContextType => useContext(UserContext);

export default UserProvider;
