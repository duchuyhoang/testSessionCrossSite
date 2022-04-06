const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
var session = require("express-session");
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "somesecret",
    cookie: {
      maxAge: 60000,
	  secure:true,
    //   domain: "http://127.0.0.1:5500",
      sameSite: "none",
	  path:"/"
    },
  })
);
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
  );
  
  app.get("/session", (req, res) => {
	req.session.user = {
	  name: "dddd",
  age: 10,
};
  // res.sendFile(path.resolve(__dirname,"index.html"));
  res.json({ ok: "dada" });
});
const storage = multer.memoryStorage();
const upload = multer({
  storage,
});

const getVideoStats = (fileName) => {
  const fileInfo = fs.statSync(path.join(__dirname, "/video.mp4"));

  return {
    size: fileInfo.size,
    path: path.join(__dirname, "/video.mp4"),
  };
};

const getChunkProps = (range, fileSize) => {
  const parts = range.replace(/bytes=/, "").split("-");

  const start = parseInt(parts[0], 10);
  const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
  const chunkSize = end - start + 1;

  return {
    start,
    end,
    chunkSize,
  };
};

app.get("/video", (req, res) => {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  const videoPath = "video.mp4";
  const videoSize = fs.statSync("video.mp4").size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
  //   res.json(videoStat);
});

app.get("/hello", (req, res) => {
  console.log(req.headers.range);
  res.json({ hello: "world" });
});

app.get("/re", (req, res) => {
  res.header("Location", "http://localhost:3000/re2");
  res.status(302);
  res.json({ token: "1313" });
});
app.get("/re2", (req, res) => {
  console.log(path.resolve(__dirname, "index2.html"));
  res.sendFile(path.resolve(__dirname, "index2.html"));
});
app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  const blob = Buffer.from(req.body.file, "base64");
  fs.appendFileSync(path.resolve(__dirname, "audio.mp4"), blob, {});
  // console.log(req.body);
  res.json({ message: "ok" });
});

app.listen(3000, () => {
  console.log("server listne");
});
