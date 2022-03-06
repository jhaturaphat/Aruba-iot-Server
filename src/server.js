require('dotenv').config();
const websocket = require('ws')
const aruba_tmp_proto = require("./aruba_iot_proto").aruba_telemetry;


const wss = new WebSocket.Server({
    port: process.env.PORT,
    path:"/aruba"
})
// สร้าง websocket server 
wss.on("connection", (ws)=>{
    ws.on('message', (message)=>{
        
    })
})

