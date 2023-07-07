import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import {
//   createUserDocumentFromAuth,
//   onAuthStateChangedListener,
// } from '../../utils/firebase/firebase.utils';
interface User {
  token?: string;
  user?: object;
}

interface UserContextType {
  user: User | null | object | string | undefined | any;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  authenticatedUser: User | null | object | string | undefined | any;
  setAuthenticatedUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  authenticatedUser: null,
  setAuthenticatedUser: () => {},
});


interface UserProviderProps {
  children: ReactNode;
}
interface User {
  token?: string;
}
const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null | object>(null);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const value = {
    user: null as null,
    setUser: () => {},
    authenticatedUser: null as null,
    setAuthenticatedUser : () => {},
  };
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChangedListener((user) => {
  //     if (user) {
  //       createUserDocumentFromAuth(user);
  //     }
  //     setUser(user);
  //   });
  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = () => {
    let authUser = localStorage.getItem('user');
    if (authUser !== null) {
      setUser(JSON.parse(authUser));
    } else {setUser(null);}
  };
  console.log(user);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(UserContext);
export default UserProvider;
