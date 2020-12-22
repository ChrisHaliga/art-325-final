import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { getUserStatus } from './ProfilePicture';

import Server from './Server';
import Friend from './Friend';
import Channel from './Channel';
import Message from './Message';

const {v4: uuidv4} = require('uuid');

const MODE = {
  CHAT: 0,
  DM: 1
}
const REFRESH = 1000*10;

let click_time = Date.now();

//-----------------------Simulated Server -------------------------------//

let SERVERS = [
    {
      "name": "Cool Guys",
      "new": true,
      "profile_picture": "fakeserver/pepe.jpg",
      "channels": [
        {
          "name": "general",
        },
        {
            "name": "Banana Land"
          }
      ],
      "members": [
        {
            "last_read": "2020-12-21T00:26:40.616Z",
            "admin": true,
            "owner": true,
            "user": "cehaliga",
            "date_joined": "2020-11-30T07:32:59.332Z",
            "online": true,
            "busy": false,
            "profile_picture": "fakeserver/cehaliga.png"
        },
        {
            "last_read": "1970-01-01T00:00:00.000Z",
            "admin": false,
            "owner": false,
            "user": "josh",
            "date_joined": "2020-11-30T07:34:40.332Z",
            "online": false,
            "busy": false,
            "profile_picture": null
        },
        {
            "last_read": "2020-12-21T00:26:42.616Z",
            "admin": false,
            "owner": false,
            "user": "matt",
            "date_joined": "2020-11-30T07:35:05.332Z",
            "online": true,
            "busy": false,
            "profile_picture": "fakeserver/matt.png"
        }
      ],
      "createdAt": "2020-11-30T07:32:59.332Z",
      "updatedAt": "2020-12-21T00:26:40.615Z",
      "owners": [
        {
            "last_read": "2020-12-21T00:26:40.616Z",
            "admin": true,
            "owner": true,
            "user": "cehaliga",
            "date_joined": "2020-11-30T07:32:59.332Z",
            "online": true,
            "busy": false,
            "profile_picture": "fakeserver/cehaliga.png"
        }
      ],
      "admins": [
        {
            "last_read": "2020-12-21T00:26:40.616Z",
            "admin": true,
            "owner": true,
            "user": "cehaliga",
            "date_joined": "2020-11-30T07:32:59.332Z",
            "online": true,
            "busy": false,
            "profile_picture": "fakeserver/cehaliga.png"
        }
      ]
    }
  ];

let FRIENDS = [
    {
      "friend": "matt",
      "new": true,
      "requester_last_read": "1970-01-01T00:00:00.000Z",
      "accepter_last_read": "1970-01-01T00:00:00.000Z",
      "online": true,
      "busy": false,
      "profile_picture": "fakeserver/matt.png"
    },
    {
      "friend": "josh",
      "new": true,
      "requester_last_read": "1970-01-01T00:00:00.000Z",
      "accepter_last_read": "1970-01-01T00:00:00.000Z",
      "online": false,
      "busy": false,
      "profile_picture": null
    },
    {
      "friend": "chad",
      "new": true,
      "requester_last_read": "1970-01-01T00:00:00.000Z",
      "accepter_last_read": "1970-01-01T00:00:00.000Z",
      "online": false,
      "busy": true,
      "profile_picture": null
    },
    {
        "friend": "kate",
        "new": false,
        "requester_last_read": "1970-01-01T00:00:00.000Z",
        "accepter_last_read": "1970-01-01T00:00:00.000Z",
        "online": true,
        "busy": false,
        "profile_picture": null
      }
  ]

let general_messages = [
    {
      "user": {
        "name": "cehaliga",
        "online": true,
        "busy": false,
        "profile_picture": "fakeserver/cehaliga.png"
      },
      "text": "Hey doods!",
      "images": [],
      "date_sent": "2020-12-21T00:26:40.616Z"
    },
    {
        "user": {
          "name": "matt",
          "online": true,
          "busy": false,
          "profile_picture": "fakeserver/matt.png"
        },
        "text": "Whaddup broski",
        "images": [{"path":"fakeserver/jake.jpg", "index":7}],
        "date_sent": "2020-12-21T00:26:42.616Z"
      },
      {
        "user": {
          "name": "cehaliga",
          "online": true,
          "busy": false,
          "profile_picture": "fakeserver/cehaliga.png"
        },
        "text": "Just making an example for my ART 325 final.",
        "images": [{"path":"fakeserver/jojo.png", "index":0}],
        "date_sent": "2020-12-21T00:26:40.616Z"
      }
  ];

  let bl_messages = [
    {
      "user": {
        "name": "cehaliga",
        "online": true,
        "busy": false,
        "profile_picture": "fakeserver/cehaliga.png"
      },
      "text": "B",
      "images": [{"path":"fakeserver/pepe.jpg", "index":0}],
      "date_sent": "2020-12-21T00:26:40.616Z"
    },
    {
    "user": {
        "name": "matt",
        "online": true,
        "busy": false,
        "profile_picture": "fakeserver/matt.png"
    },
    "text": "A",
    "images": [],
    "date_sent": "2020-12-21T00:26:42.616Z"
    },
    {
        "user": {
          "name": "cehaliga",
          "online": true,
          "busy": false,
          "profile_picture": "fakeserver/cehaliga.png"
        },
        "text": "N",
        "images": [],
        "date_sent": "2020-12-21T00:26:40.616Z"
      },
      {
        "user": {
            "name": "matt",
            "online": true,
            "busy": false,
            "profile_picture": "fakeserver/matt.png"
        },
        "text": "A",
        "images": [],
        "date_sent": "2020-12-21T00:26:42.616Z"
        },
        {
        "user": {
            "name": "cehaliga",
            "online": true,
            "busy": false,
            "profile_picture": "fakeserver/cehaliga.png"
        },
        "text": "N",
        "images": [],
        "date_sent": "2020-12-21T00:26:40.616Z"
        },
        {
        "user": {
            "name": "matt",
            "online": true,
            "busy": false,
            "profile_picture": "fakeserver/matt.png"
        },
        "text": "A",
        "images": [],
        "date_sent": "2020-12-21T00:26:42.616Z"
        },
        {
        "user": {
            "name": "cehaliga",
            "online": true,
            "busy": false,
            "profile_picture": "fakeserver/cehaliga.png"
        },
        "text": "S",
        "images": [],
        "date_sent": "2020-12-21T00:26:40.616Z"
        },
  ];

  let matt_messages = [
    {
        "user": {
          "name": "matt",
          "online": true,
          "busy": false,
          "profile_picture": "fakeserver/matt.png"
        },
        "text": "I shipped my pants!",
        "images": [],
        "date_sent": "2020-12-21T00:26:42.616Z"
      },
      {
        "user": {
          "name": "cehaliga",
          "online": true,
          "busy": false,
          "profile_picture": "fakeserver/cehaliga.png"
        },
        "text": "How unfortunate...",
        "images": [],
        "date_sent": "2020-12-21T00:26:40.616Z"
      }
  ];
  let josh_messages = [
    {
      "user": {
        "name": "josh",
        "online": false,
        "busy": false,
        "profile_picture": null
      },
      "text": "We gotta pay rent!",
      "images": [],
      "date_sent": "2020-12-21T00:26:40.616Z"
    },
    {
        "user": {
          "name": "cehaliga",
          "online": true,
          "busy": false,
          "profile_picture": "fakeserver/cehaliga.png"
        },
        "text": "I dont have enough money :'(",
        "images": [],
        "date_sent": "2020-12-21T00:26:42.616Z"
      },
      {
        "user": {
          "name": "cehaliga",
          "online": true,
          "busy": false,
          "profile_picture": "fakeserver/cehaliga.png"
        },
        "text": "If only I had a job..",
        "images": [],
        "date_sent": "2020-12-21T00:26:40.616Z"
      }
  ];
  let chad_messages = [
    {
      "user": {
        "name": "chad",
        "online": false,
        "busy": true,
        "profile_picture": null
      },
      "text": "I am the unicorn wizard!",
      "images": [],
      "date_sent": "2020-12-21T00:26:40.616Z"
    },
    {
        "user": {
          "name": "cehaliga",
          "online": true,
          "busy": false,
          "profile_picture": "fakeserver/cehaliga.png"
        },
        "text": "Teach me your ways, good sir.",
        "images": [],
        "date_sent": "2020-12-21T00:26:42.616Z"
      }
  ];
  let kate_messages = [
    {
      "user": {
        "name": "cehaliga",
        "online": true,
        "busy": false,
        "profile_picture": "fakeserver/cehaliga.png"
      },
      "text": "Yo",
      "images": [],
      "date_sent": "2020-12-21T00:26:40.616Z"
    }
  ];

//-----------------------Simulated Server end ----------------------------//

export default function Main({data, setLoggedOut}) {
    
    function DEBUG(){
        console.log(JSON.stringify(focus));
    }

    //const [user, setUser] = useState({username: data.username, token: data.token, profile_picture:data.profile_picture});
    const user = {"username":"cehaliga", "token":"123", profile_picture:"fakeserver/cehaliga.png"};
    const [focus, setFocus] = useState(data.focus);
    const [inNav, setInNav] = useState([]);
    const [outNav, setOutNav] = useState([]);
    const [last, setLast] = useState(data.last);

    const [servers, setServers] = useState([]);
    const [target, setTarget] = useState(false);
    const [friends, setFriends] = useState([]);
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        loadServers();
        loadFriends();

        // Timer for refreshing data
        setInterval(() => {
            refresh();
        }, REFRESH)
    }, [])

    useEffect(() =>{
        getInNav();
        getOutNav();
    }, [focus, last, servers, friends])

    useEffect(() => {
        
    }, [messages])

    function refresh(){
        // Check which data needs to be updated TODO: Write api request for last_updated for Servers, Channels, and Friends. Also return last_update when getting these.
        console.log('REFRESHING')
    }

    function loadServers(){
        /*axios.post('http://localhost:3001/user/chatrooms', {token:user.token})
        .then(res => setServers(res.data))*/
        
        setServers(SERVERS);
    }

    function loadFriends(){
        /*axios.post('http://localhost:3001/user/friends', {token:user.token})
        .then(res => setFriends(res.data))*/
          setFriends(FRIENDS);
    }

    function loadChannel(name){
        switch(name){
            case "general": setMessages(general_messages); break;
            case "Banana Land": setMessages(bl_messages); break;
        }
    }

    function loadDM(name){
        switch(name){
            case "matt": setMessages(matt_messages); break;
            case "josh": setMessages(josh_messages); break;
            case "chad": setMessages(chad_messages); break;
            case "kate": setMessages(kate_messages); break;
        }
    }

//.........................................................................
    function clickServer(server){
        setLast({...last, server:server})
        setFocus(MODE.CHAT);
    }

    //profile is a boolean whether checking profile or not
    function clickFriend(friend, profile){
        if(profile) alert(friend.friend)//TODO
        setLast({...last, dm:friend});
        loadDM(friend.friend);
   
    }

    function clickChannel(channel){
        setLast({...last, "channel":channel})
        loadChannel(channel.name);
    }


//.........................................................................

    function getOutNav(){
        return setOutNav(servers.map(server => (
            <div id="outList">
                <Server key = {uuidv4()} server={{...server, index:servers.indexOf(server)}} last={focus?null:last.server} clickServer={clickServer}/>
            </div>
        )));
    }

    function getInNav(){
        if(focus == MODE.DM)
            return setInNav(
                <div id="inList">
                    <div className={`profile_card`}> 
                        <div className ="container">
                            <button className="profile" style={{backgroundImage:'url(images/addFriend.png)'}} onClick={addFriend}></button>
                            <h2>Friends</h2>
                        </div>
                    </div>
                    <h4 style={{padding:20, paddingBottom:5, fontSize:14, fontWeight:"bold"}}>Direct Messages</h4>
                    {friends.map(friend => (<Friend key={uuidv4()} friend={friend} last={last.dm} clickFriend={clickFriend}/>))}
                </div>
                );
        else
            return setInNav(
                <div id="inList">
                    {last.server.channels.map(channel => (<Channel key={uuidv4()} channel={channel} last={last.channel} clickChannel={clickChannel}/>))}
                </div>
                );
    }

    function addFriend(){
        alert('TODO')
    }

    function backButton(){
        if(target && Date.now() - click_time > 60){
          setTarget(false);
          click_time = Date.now();
        }
    }

    function contentClicked(){
      if(!target && Date.now() - click_time > 60){
        setTarget(true);
        click_time = Date.now();
      }
    }

    function homeButton(){
        setFocus(MODE.DM)
        getInNav()
    }

    function myProfileButton(){
        setLoggedOut();
    }
    return (
        <>
            <nav id="outNav">
                <h1>CHRISCORD</h1>
                <button id="home" className={`server ${focus == MODE.DM || !last.server?'active':''}`} onClick={homeButton}>
                <i className="fas fa-gamepad"></i>
                </button>
                <div className="line"></div>
                
                {outNav}

                <button onClick ={DEBUG}id="addServer" className="server">
                <i className="fas fa-plus"></i>
                </button>
            </nav>

            <main>
                <nav id="inNav">
                    {inNav}
                    <div id="myProfile">
                        <div className="container">
                            <button onClick={myProfileButton} className="profile" style={{backgroundImage:`url(${user.profile_picture})`}}><i className="fas fa-circle status online"></i></button>
                            <h2 id="username">{user.username}</h2>
                            <button id="settings"><i className="fas fa-cog"></i></button>
                        </div>
                    </div>
                </nav>

                <content onClick={contentClicked} className={target?"active":""}>
                    <div id="header">
                        <button id="back" onClick={backButton}><i className="fas fa-bars"></i></button>
                        <h2 id="page">{focus?(last.dm?`@ ${last.dm.friend}`:''):(last.channel?`# ${last.channel.name}`:'')}</h2>
                        {focus && last.dm?getUserStatus(last.dm):''}
                    </div>

                    <div id="messages">
                        {messages.map(message => (<Message key={uuidv4()} message={message} />))}
                    </div>

                    <div id="input">
                        <form>
                            <i className={target?"fas fa-plus-circle":"hide"}></i>
                            <input type="text" id="textbox" name="textbox"/>
                        </form>
                    </div>
                </content>
            </main>
            <div id="bottom" className={target?"hide":""}>
                <div className={target?"container hide":"container"}>
                    <button className="profile" style={{backgroundImage:`url(${user.profile_picture})`}}><i className="fas fa-circle status online"></i></button>
                </div>
            </div>
        </>
    )
}
