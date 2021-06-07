module.exports = (io) =>
{
    // list contain all online user
    let listUser = [];
    io.sockets.on('connection', (socket) => {

        let username;
        // init basic info when user enter chat room. Such as: ip, user_name,...
        socket.on('init_user', (data) => {
            username = data.user_name;

            // push user to the list
            listUser.push(username);
            console.log(`${username} joined`);
            console.log(listUser);

            // broadcast message to other users that this user has entered chat room
            socket.broadcast.emit('update_message', {sender: "SERVER", message: `${username} has joined`});
        });

        // send info to other users if this user left
        socket.on('disconnect', () => {
            listUser.splice(listUser.indexOf(username), 1);
            socket.broadcast.emit('update_message', {sender: "SERVER", message: `${username} has left`})
            console.log(`${username} exited`);
            console.log(listUser);
        });

        // listener when user send a message
        socket.on('message_send', message => {
            console.log(`${username}: ${message}`);

            // wasted 30mins of my life to debug this :(
            // emit to all sockets include the one trigger this event
            io.emit('update_message', {sender: username, message: message});
        })
    });
}