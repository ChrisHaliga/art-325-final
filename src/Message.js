import React from 'react'
import { userPicture, getUserStatus } from './ProfilePicture';

export default function channel( {message} ) {

    function getMessage(){
        let imgs = message.images.sort((a,b)=>{return a.index-b.index});
        let last_index = 0;
        let ret = [];
        for(let i = 0; i < imgs.length; i++){
            if(imgs[i].index <= last_index || imgs[i].index >= message.text.length) 
                ret.push(<img src={imgs[i].path}/>);
            else{
                ret.push(<p>{message.text.substring(last_index, imgs[i].index)}</p>);
                ret.push(<img src={imgs[i].path}/>);
                last_index = imgs[i].index;
            }
        }
        if(last_index < message.text.length)
            ret.push(<p>{message.text.substring(last_index, message.text.length)}</p>);
        return <>{ret.map(x => x)}</>;
    }
    return (
        <div className ="message">
            <button className="profile" style={userPicture(message.user)}>{getUserStatus(message.user)}</button>
            <div className="text">
                <h2>{message.user.name}</h2>
                {getMessage()}
            </div>
            <div class="clearfix"></div>
        </div>
    )
}
