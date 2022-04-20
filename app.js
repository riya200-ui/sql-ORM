const express = require('express');
const app = express();

const port = 8080;
require('./models/index');

app.get("/",(req,res) => {
    res.send('hey');
})

var userCtrl = require('./controllers/userController');
//app.get("/add",userCtrl.addUser );
//app.get("/crud",userCtrl.crudOperation );
app.get("/crud",userCtrl.querydata );


app.listen(port, ()=>{
    console.log(`app is lstening no server:${port}`);
});