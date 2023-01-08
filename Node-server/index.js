let express=require('express');
let app=express();
var http=require('http').Server(app);   //connecting http to server
var io=require('socket')(http);        //connecting socket to server 
const path=require('path');
const port=5000;

