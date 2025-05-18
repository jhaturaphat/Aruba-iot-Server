require('dotenv').config();
const fs = require('fs')
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const WebSocket = require('ws')
const aruba_tmp_proto = require("./aruba_iot_proto").aruba_telemetry;
const Databases = require("./config/Databases").Databases

const db = new Databases()

/* ส่วนของ API server*/
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
let PORT = process.env.HTTP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`API Server is up and running on ${PORT} ...`);
});

// ขอ Token เพื่อนำไปใส่ใน Controller Aruba
app.post("/aruba/token", (req, res)=>{
    // ตรวจสอบ Username และ Password
    if(req.body.username === "aruba" && req.body.password === "P@ssW0rd"){
        let data = {
            time: Date(),
            iot: "aruba-iot",
        }  
        return res.send(jwt.sign(data, process.env.SECRET_KEY))
    }
    return res.status(401).send({message:"username or password is invalid."})
    
});


/* ส่วนของ Web socket server*/
const wss = new WebSocket.Server({
    port: process.env.WS_PORT,
    path:"/aruba"
});
// สร้าง websocket server 
wss.on("connection", (ws)=>{
    ws.on('message', (message)=>{
        try {
            // รอรับข้อมูลจาก Aruba ที่ส่งมาแบบตลอดเวลา
            let telemetryReport = aruba_tmp_proto.Telemetry.decode(message)
            let json = JSON.stringify(telemetryReport)
            
            let obj = JSON.parse(json)
            const token = obj['meta']['access_token']    //ดึงค่า Token ที่มาจาก Aruba        
            // jwt.verify(token, process.env.SECRET_KEY, (err)=>{
            //     if(err) return console.log("401 Unauthorized")
            // });

        if(!obj.hasOwnProperty("reported")) 
            return console.log("Aruba Websocket Established");
        
            console.log("++++++TO+++++");
            console.log(obj["reported"]); //
            console.log(obj["reporter"]["name"]); //ชื่อ Access point
            console.log("+++++++END++++++")
            console.log("If=================");
            console.log(obj);
            console.log("EnIf=================");
            // fs.writeFileSync("./files/"+Date.now()+".json", json, 'utf8', function (err) {
            //     if (err) {
            //         console.log("An error occured while writing JSON Object to File.");
            //         return console.log(err);
            //     }
             
            //     console.log("JSON file has been saved.");
            // });
        

    } catch (error) {
        // console.log(error);                   
    }    

    })
    ws.on('close', function close() {
        // จะทำงานเมื่อปิด Connection ในตัวอย่างคือ ปิด Browser
          console.log('disconnected');
        });
    ws.send('init success data form Server');
        // ส่ง data ไปที่ client เชื่อมกับ websocket server นี้
    
})
wss.on('listening', ()=>{
    console.log(`server is listening on port ${process.env.WS_PORT}`);
  })
  

