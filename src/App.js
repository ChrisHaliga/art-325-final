import React, { useState, useEffect } from 'react';

import Main from './Main';
import Login from './Login';

const LS_KEY = 'data.ls';
/*  Stored User Template
    --------------------
    data: {
      username,
      token,
      focus: <CHAT or DM>
      last: {
        dm: <friend username>,
        server: <chatroom name>, 
        channel: <channel name>
      }
      profile_picture
    }
*/

function App() {
  const [data, setData] = useState({logged_in: -1});
  

    useEffect(() => {
      const ls = JSON.parse(localStorage.getItem(LS_KEY))
      if(ls) {
        console.log(ls);
        setData({logged_in: 1, username: ls.username, token:ls.token, focus: ls.focus, last:ls.last, profile_picture: ls.profile_picture})
      }
      else
        setData({logged_in: 0})
    }, [])

    function setLoggedIn(data){
      setData({
        "username":"cehaliga",
        "token":"123",
        "focus": 1,
        "last": {
          "dm": null,
          "server": null, 
          "channel": null
        },
        "profile_picture":"fakeserver/cehaliga.png",
        "logged_in": 1})
    }

    function setLoggedOut(){
      localStorage.setItem(LS_KEY, null);
      setData({logged_in:0});
    }

  return (<>{data.logged_in === 0?<Login LS_KEY = {LS_KEY} setLoggedIn = {setLoggedIn}/>:(data.logged_in === 1?<Main data = {data} setLoggedOut = {setLoggedOut}/>:'') }</>);
}

export default App;
