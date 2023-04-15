class WebSockets {
    //users array
    users = [];

    //connection method
    connection(client){
        //event fired when the chat room is disconnected
        client.on("disconnected", () => {
            this.users = this.users.filter((user) => {user.socketId !== client.Id })
        });
            //Add identity of user mapped to the socket id
            client.on("identity", (userId) => {
                this.users.push({
                    socketId: client.id,
                     userId
                })
            });

            // subscribe person to chat and other user as well
            client.on("subscribe", (room, otherUserId = " ") => {
                this.subscribeOtherUser(room, otherUserId)
                client,join(room)
            });

            //mute a chat room
            client.on("unsubscribe", (room) => {
                client.leave(room)
            });
    }

    //subscrbing members of a chat room
    subscribeOtherUser(room, otherUserId){
        const userSockets = this.users.filter((user)=>{user.userId === otherUserId});
        userSockets.map((userInfo)=>{
            const  socketConn = global.io.sockets.connected(userInfo.socketId);
            if(socketConn){
                socketConn.join(room)
            }
        });
    }
}
export default new WebSockets()