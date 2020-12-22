import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios';
import { userPicture } from './ProfilePicture';

import Main from './Main';

export default function Login({ LS_KEY, setLoggedIn }) {

    const [login, setLogin] = useState(true);
    const [user, setUser] = useState();
    const [error, setError] = useState('');

    const usernameRef = useRef()
    const passwordRef = useRef()

    useEffect(()=>{
        submit();
    }, [user])

    useEffect(()=>{
       if(error) alert(error);
    }, [error])

    function onLogin(e){
        e.preventDefault();
        setUser({username: usernameRef.current.value, password:passwordRef.current.value, submit:'login'})
        
    }
    function onRegister(e){
        e.preventDefault();
        setUser({username: usernameRef.current.value, password:passwordRef.current.value, submit:'register'})
    }

    function submit(){
        if(!(user && user.username && user.password) || user.username.length < 1 || user.password.length < 1) return;
        /*axios.post(`http://localhost:3001/user/${user.submit}`, user)
        .then(res => {
            const data = {
                username:user.username, 
                token:res.data, 
                profile_picture:userPicture(res.data), 
                focus: 1,
                last: {
                  dm: '',
                  server: '', 
                  channel: []//{server,channel}
                }
              }
            localStorage.setItem(LS_KEY, JSON.stringify(data));
            setLoggedIn(data)
        })
        .catch(err => setError(err));*/
        setLoggedIn({"token":"123"});
    }

    return (
        <div id="login">
            <h2>{login? "Welcome back!": "Create an account"}</h2>
            <h3>{login?"We're so excited to see you again!":""}</h3>
            <form onSubmit={login ? onLogin : onRegister}>
                <div className="form-group">
                    <div className="in">
                        <h4>EMAIL OR PHONE NUMBER</h4>
                        <input type="text" ref ={usernameRef} id="username" required/>
                    </div>

                    <div className="in">
                        <h4>PASSWORD</h4>
                        <input type="password" ref={passwordRef} id="password" required/>
                    </div>

                    <h4 id="forgot"><a href="#">{login?"Forgot your password?":""}</a></h4>

                    <button type="submit">{login?"Log in":"register"}</button>

                    <h4>{login?"Need an account?":""} <a href="#" onClick={() => setLogin(!login)}>{login?" Register": "Already have an account?"}</a></h4>
                </div>
            </form>
            
        </div>
    );
}
