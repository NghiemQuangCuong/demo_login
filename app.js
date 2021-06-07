const express = require('express');
const http = require('http');
const expressHandlebars = require('express-handlebars');
const expressSession = require('express-session');
const socketio = require('socket.io');

const config = require('config');

// init static variables
const port = config.get("server.port");

// create express application
const app = express();
const server = http.createServer(app);

// socketio instance
const io = socketio(server);


// post with json ???
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//set path for static resource
app.use(express.static('./public'));

// set default views path
app.set("views", __dirname + "/apps/views");
//set default layout handlebars
app.engine("handlebars", expressHandlebars({defaultLayout: "main"}));
//set view engine
app.set("view engine", "handlebars");

//set session 
app.set("trust proxy", 1);
app.use(expressSession({
    secret: config.get("secret_key"),
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));



// cau hinh chia route
app.use(require(__dirname + "/apps/controllers"));

// module socketControl
const socketControl = require('./apps/common/socketControl')(io);

server.listen(port, () => 
{
    console.log(`Server started at port ${port}`);
});
