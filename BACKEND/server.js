require('dotenv').config();
const app = require('./src/app');
const catMe = require('cat-me');
const connectDB = require('./src/db/db');

//connect DB
connectDB()


//cat
console.log(catMe('nyan'));
app.listen(3000,()=>{
    console.log("Backend Running On Port 3000 💀");
})