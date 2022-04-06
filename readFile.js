const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const readStream = fs.createReadStream(
  path.resolve(__dirname, "file.txt"),
  "ascii"
);
const bf = fs.readFileSync(path.resolve(__dirname, "file.txt"), "utf8");
const bf2 = fs.readFileSync(path.resolve(__dirname, "file2.txt"), "utf8");
console.log(JSON.parse(bf2).age);
// console.log(bf.toString());
function spliceSlice(str, index, count, add) {
  // We cannot pass negative indexes directly to the 2nd slicing operation.
  if (index < 0) {
    index = str.length + index;
    if (index < 0) {
      index = 0;
    }
  }

  return str.slice(0, index) + (add || "") + str.slice(index + count);
}

readStream.on("data", (data) => {
  // data.
  // bf.
});
const startString = "chat_sidebar_contact_rankings";
// bf.indexOf("chat_sidebar_contact_rankings")+100
const index1 =
  bf.indexOf("chat_sidebar_contact_rankings") +
  startString.length +
  ":[".length +
  1;
let newString = bf.slice(index1);
// console.log(newString);
let count = 1;
while (newString.indexOf('{"status"') !== -1) {
  let start = newString.indexOf('{"status"');
  let end = newString.indexOf('"}}}') + 4;
  const info=JSON.parse(newString.slice(0, newString.indexOf('"}}}') + 4));
  newString = spliceSlice(newString, start, end + 1, "");
  //   console.log(newString.slice(0, 300), start, end);
  //   if (count === 1) break;
}
// console.log();
// {"status"
// while(){

// }
