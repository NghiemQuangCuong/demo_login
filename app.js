const express = require('express');
const config = require('config');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');

// init static variables
const port = config.get("server.port");

// create express application
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));

// set default views path
app.set("views", __dirname + "/apps/views");
//set default layout handlebars
app.engine("handlebars", expressHandlebars({defaultLayout: "main"}));
//set view engine
app.set("view engine", "handlebars");

// cau hinh chia route
app.use(require(__dirname + "/apps/controllers"));

app.listen(port, () => 
{
    console.log(`Server started at port ${port}`);
});

