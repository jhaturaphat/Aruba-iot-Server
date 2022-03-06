require('dotenv').config();
const WebSocket = require('ws')
const aruba_tmp_proto = require("./aruba_iot_proto").aruba_telemetry;
const databases = require("./config/Databases")

const db = databases.Databases

const _db = new db();

const wss = new WebSocket.Server({
    port: process.env.PORT,
    path:"/aruba"
});
// สร้าง websocket server 
wss.on("connection", (ws)=>{
    ws.on('message', (message)=>{
        try {
            // รอรับข้อมูลจาก Aruba ที่ส่งมาแบบตลอดเวลา
            let telemetryReport = aruba_tmp_proto.Telemetry.decode(message)
            let obj = JSON.parse(JSON.stringify(telemetryReport))
            console.log("###Befor###");
            console.log(obj);
            console.log("###EndBefor###");  

        if(!obj.hasOwnProperty("reported")){            
             console.log("Aruba Websocket Established");
        }else{
            console.log("++++++TO+++++");
            console.log(obj["reported"]); //
            console.log(obj["reporter"]["name"]); //ชื่อ Access point
            console.log("+++++++END++++++")
            console.log("If=================");
            console.log(obj);
            console.log("EnIf=================");
        }

    } catch (error) {
        // console.log(error);   
        
        _db.query("INSERT INTO device_inventory (d_name, d_macaddress) VALUES (?,?)", ["my name","macaddress"]).then(()=>{

       });     
    }    

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
  

