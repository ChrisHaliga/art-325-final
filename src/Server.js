import React from 'react'
import { serverPicture } from './ProfilePicture';


export default function Server( {key, server, last, clickServer} ) {
    
    function clicked(e){
        clickServer(server);
    }

    function generate(){
        const [has, background] = serverPicture(server);
        if(has) 
            return (<button onClick={clicked} className={`server pic ${last==server?'active':''}`} style={background}></button>);
        else{
            let initials = server.name.split(' ').map(w => w[0].toUpperCase() + w.substring(1,w.length).replace(/[a-z\s]/g, '')).toString().replace(',', '');
            return (<button onClick={clicked} className={`server noPic ${last==server?'active':''}`}>{initials}</button>)
        }
    }
    
    return (
        <>
          {generate()}  
        </>
    )
}
