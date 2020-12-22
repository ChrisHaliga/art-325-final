import React from 'react'
import { userPicture, getUserStatus } from './ProfilePicture';

export default function Friend( {friend, last, clickFriend} ) {

    function profileClicked(e){
        clickFriend(friend, true);
    }

    function selected(e){
        clickFriend(friend, false);
    }

    return (
        //TODO: use friend.new
        <div className={`profile_card ${last === friend?'active':''}`} onClick={selected}> 
			<div className ="container">
				<button className="profile" style={userPicture(friend)} onClick={profileClicked}>{getUserStatus(friend)}</button>
                <h2>{friend.friend}</h2>
			</div>
		</div>
    )
}
