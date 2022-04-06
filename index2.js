const {fork}=require("child_process");


const child=fork("./child.js",["hello world"],{
    detached:true
})
child.send("hello11");
child.on("message",(d)=>{
    console.log(d);
})