
function userPicture(user){
    if(user['profile_picture']){
        //return {backgroundImage:`url(data:image/png;base64,${user.profile_picture.trim()})`};
        return {backgroundImage:`url(${user.profile_picture})`}
    }
    else
        return {backgroundImage:`url(images/default.png)`};
}


function serverPicture(server){
    if(server['profile_picture']){
        //return [true, {backgroundImage:`url(data:image/png;base64,${server.profile_picture.trim()})`}];
        return [true, {backgroundImage:`url(${server.profile_picture})`}]
    }
    else
        return [false, null];
}

function getUserStatus(user){
    if(user.busy) return <i className={"fas fa-minus-circle status busy"}></i>;
    else if(user.online) return <i className={"fas fa-circle status online"}></i>;
    else return <i className={"far fa-circle status offline"}></i>;
}

function defaultPicture(name){
    switch(name){
        case "Channel": return {backgroundImage:`url(images/channel.png)`}
    }
}

export {userPicture, serverPicture, getUserStatus, defaultPicture}