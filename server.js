const express =require( 'express');
const http=require("http")
const cors=require("cors")
//import routes from './routes';

class Server {
  constructor() {
    this.clients=[];
    this.app = express();
    this.app.use(cors({origin:"http://localhost:3000",credentials:true }))
    this.server=http.createServer(this.app);
    this.io = require('socket.io')(this.server);
    this.io.origins("http://localhost:3000")
    this.middlewares();
    this.routes();
    this.socket();
  }

  middlewares() {
    this.app.use(express.json());
  }
socket(){
  this.io.sockets.on('connection',  (socket) =>{
    socket.broadcast.emit('broadcast', 'hello friends!');
    socket.emit("check","check")
    socket.on("peerid",(id)=>{
      socket.broadcast.emit("newguy",id)
    })
    
  }
)
}
  routes() {
    //this.server.use(routes);
  }
}

new Server().server.listen(3001,()=>{
  console.log("success")
});
