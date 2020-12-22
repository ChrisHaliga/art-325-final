import React from 'react'
import { defaultPicture } from './ProfilePicture';

export default function channel( {channel, last, clickChannel} ) {

    function clicked(e){
        clickChannel(channel);
    }

    return (
        <div className={`profile_card ${last === channel?'active':''}`} onClick={clicked}> 
			<div className ="container">
				<button className={`profile channel ${last === channel?'selected':''}`} ></button>
                <h2>{channel.name}</h2>
			</div>
		</div>
    )
}
