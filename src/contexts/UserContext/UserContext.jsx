import { createContext, useContext, useEffect, useState } from 'react';
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

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = () => {
    let authUser = localStorage.getItem('user');
    setUser(JSON.parse(authUser));
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(UserContext);
export default UserProvider;
