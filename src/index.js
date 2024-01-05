const express  = require("express")
const ejs = require("ejs")
const path = require("path")
const uuid = require("uuid/v4")

//initialization
const app = express()




// seting
app.set("port",4000)
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

//static 
app.use(express.static(path.join(__dirname,"router/public/uploads")))


app.use(require("./router/index.router"))

//Start
app.listen(app.get("port"),()=>{
    console.log(`escuchando en el puerto watch ${app.get("port")}`);
})