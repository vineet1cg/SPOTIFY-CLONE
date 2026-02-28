const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const musicRoutes = require('./routes/music.routes');

//middleware
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api/auth',authRoutes);
app.use('/api/music',musicRoutes);
module.exports = app;


//ways to get access to a rest api deployed on a server

//1) Cookie Injection
//2) Intelligence Gathering Of Network Using Nmap() scans and Sniffer()
//3) Compromised Browser Using BeEF (->>Most Effective)
//4) Role Based Access On Protected Route 
//5) Using Curl For Malicious Payload 
//6) Using Console On The Same Origin So That We Can Fetch Data
