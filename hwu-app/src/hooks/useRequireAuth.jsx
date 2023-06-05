import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const useRequireAuth = () => {
  const [auth] = useContext(AuthContext);
  
  return auth !== null;
};

export default useRequireAuth;
