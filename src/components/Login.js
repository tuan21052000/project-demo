import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { loginApi } from "../services/UserService";
import {Link, useNavigate} from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loadingAPI, setLoadingAPI] = useState(false);

    const {loginContext} = useContext(UserContext);
    const  navigate = useNavigate();

    // useEffect(() => {  // login vào rồi trả về trang chủ
    //        let token = localStorage.getItem("token");
    //        if(token) {
    //           navigate("/");
    //        }
    //      },[])

    const handleLogin = async () =>{ 
        if(!email || !password) {
           toast.error("Email/Password is required!");
           return;
        }
        setLoadingAPI(true);
        let res = await loginApi(email.trim(), password);
        if(res && res.token){
          loginContext(email, res.token);
          navigate("/");
        }else {
           //error
           if(res && res.status === 400){
             toast.error(res.data.error);
           }
        }
        setLoadingAPI(false);
     }
     const handleGoBack = () => {
       navigate("/");
     }
     const handlePressEnter = (event  ) => {
       if(event && event.key === "Enter"){}
          handleLogin();
     }

   return (
    <>
        <div className="login-container col-12 col-sm-4">   
            <div className="title">Login</div>
            <div className="text">Email or username (eve.holt@reqres.in) </div>
            <input 
              type="text" placeholder="Email or usename..."
               value={email} 
                onChange={(event) => setEmail(event.target.value)}  />
                <div className="input-2">
                    <input
                        type={isShowPassword === true ? "text" : "password"}
                        placeholder="Password..."
                        value={password}
                        onChange={(event) => setPassword(event.target.value)} 
                        onKeyDown={(event) => handlePressEnter(event)}
                        />
                    <i className={isShowPassword === true ? "fa-solid fa-eye-slash" : "fa-solid fa-eye-slash"}
                      onClick={() => setIsShowPassword(!isShowPassword)}></i> 
                </div>
    
            <button className={email && password ? "active" : ""}
                    disabled={email && password ? false : true}
                    onClick={() => handleLogin()} >
                    {loadingAPI && <i className="fa-solid fa-sync fa-spin"></i>}  &nbsp;Login </button>
            <div className="back">
                <i className="fa-solid fa-angles-left"></i>
                <span onClick={() => handleGoBack()}>&nbsp;Go back</span>
                
            </div>
           
        </div>
    </>
   )
}
export default Login;