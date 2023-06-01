import React, { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

// const AuthContext = React.createContext([null, () => {}]);

// export const AuthProvider = (props) => {
//   const [auth, setAuth] = useLocalStorage("auth", null);

//   const handleSetAuth = (updatedAuth) => {
//     setAuth({
//       ...auth,
//       name: updatedAuth.name,
//       email: updatedAuth.email,
//       banner: updatedAuth.banner,
//       avatar: updatedAuth.avatar,
//       accessToken: updatedAuth.accessToken,
//     });
//   };

//   return (
//     <AuthContext.Provider value={[auth, handleSetAuth]}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

const AuthContext = createContext([null, () => {}]);

export const AuthProvider = (props) => {
  const [auth, setAuth] = useLocalStorage("auth", null);
  
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
