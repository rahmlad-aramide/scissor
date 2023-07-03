import { createContext, useState, useEffect } from 'react';
// import {
//   createUserDocumentFromAuth,
//   onAuthStateChangedListener,
// } from '../../utils/firebase/firebase.utils';

export const UserContext = createContext({
  user: null,
  setUser: () => null,
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const value = {
    user,
    setUser,
    authenticatedUser,
    setAuthenticatedUser,
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

  let authUser = localStorage.getItem('user');
  useEffect(() => {
    if (!user) setUser(JSON.parse(authUser));
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
