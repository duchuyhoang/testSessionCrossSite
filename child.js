process.on("message",(data)=>{
    console.log(data);
    process.send("nncc")
})
console.log(process.argv)
const a = require('esm')
// processs