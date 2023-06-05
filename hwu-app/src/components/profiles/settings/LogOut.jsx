import { useContext } from 'react';
import AuthContext from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogoutBtn } from '../../styledComponents/Buttons';



export default function LogOut() {
  const [, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();
  
  function handleLogOut() {
    const confirm = window.confirm("Are you sure you want to log out?");
    
    if(confirm) {
      setAuth(null);
      navigate("/");
    }
  }
  
  return (
    <LogoutBtn onClick={handleLogOut}>Log out</LogoutBtn>
  )
}
