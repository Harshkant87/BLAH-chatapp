// node server to handle socket.io connections

const io=require('socket.io')(8000)

const users={};

io.on('connection',socket =>{

  // when new user joins
    socket.on('new-user-joined', name=>{
      // console.log("New user",name);
      users[socket.id]=name;
      socket.broadcast.emit('user-joined',name)
    });

   //when send msg
    socket.on('send', message=>{
      socket.broadcast.emit('receive',{message: message,name: users[socket.id]})
    });
  // when someone left
    socket.on('disconnect', message=>{
      socket.broadcast.emit('left',users[socket.id]);
      delete users[socket.id];
    });


})
