const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const {spawn} = require('child_process');


const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static("files"));
// app.use(express.static('/home/hackerearth/IGEM_SOFT/backend'))
const server = app.listen(
    8000,
    console.log(
      `Server running`
    )
  );

const uid = function(){
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

app.get("/",(req,res,next)=>{
  res.send("hello");
})

app.post('/basic',(req,res,next)=>{
    const id = uid();
    const python = spawn('python', ['test.py',`${id}`,req.body.volume,req.body.h_d]);
    let dataToSend = [];
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend.push(data.toString());
       });
       python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        const filename=id+"Reactor.stl"
        const filenamestep = id+"Reactor.step"
        res.json({
          files:[filename,filenamestep]
        });
        });
})

app.post('/advanced',(req,res,next)=>{
  const id = uid();
  const python = spawn('python', ['advanced.py',`${id}`,req.body.volume,req.body.h_d,req.body.baffleLen,req.body.baffleWid,req.body.thickness,req.body.baseThickness,req.body.shaftDiameter,req.body.baffle_count,req.body.hub_diameter,req.body.hub_height,req.body.blade_length,req.body.blade_angle,req.body.blade_thickness,req.body.blade_count]);
  let dataToSend = [];
  python.stdout.on('data', function (data) {
      console.log('Pipe data from python script ...');
      dataToSend.push(data.toString());
     });
     python.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`);
      // send data to browser
      const filename=id+"Reactor.stl"
      const filenamestep = id+"Reactor.step"
      res.json({
        files:[filename,filenamestep]
      });
      });
})