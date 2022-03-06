require('dotenv').config();
const WebSocket = require('ws')
const aruba_tmp_proto = require("./aruba_iot_proto").aruba_telemetry;


const wss = new WebSocket.Server({
    port: process.env.PORT,
    path:"/aruba"
});
// สร้าง websocket server 
wss.on("connection", (ws)=>{
    ws.on('message', (message)=>{
        // รอรับข้อมูลจาก Aruba ที่ส่งมาแบบตลอดเวลา
        let telemetryReport = aruba_tmp_proto.Telemetry.decode(message)
        let myobj = JSON.stringify(telemetryReport);
        let obj = JSON.parse(myobj)

        console.log(obj);

        if(obj["reported"] == null)
            return console.log("Aruba Websocket Established");
        
            console.log(obj["reported"]);
            console.log(obj["reporter"]["name"]);
        

    })
    ws.on('close', function close() {
        // จะทำงานเมื่อปิด Connection ในตัวอย่างคือ ปิด Browser
          console.log('disconnected');
        });
    ws.send('init message to client');
        // ส่ง data ไปที่ client เชื่อมกับ websocket server นี้
    
})
wss.on('listening', ()=>{
    console.log(`server is listening on port ${process.env.PORT}`);
  })
  

