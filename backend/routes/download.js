const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");
const path = require("path");
const os = require("os");

router.post("/", async (req, res) => {
  const { url, videoFormats, metadata } = req.body;

  const downloadPath = path.join(os.homedir(), "Downloads");

  const args = [
    "-f",
    `${videoFormat}+bestaudio`,
    "-o",
    `${downloadPath}/%(title)s.%(ext)s`,
  ];

  if (metadata) {
    args.push("--embed-thumbnail");
    args.push("--embed-metadata");
  }

  args.push(url);

  const process = spawn("yt-dlp", args);

  const io = req.app.get("io");

  process.stdout.on("data", (data) => {
    const output = data.toString();

    const match = output.match(/\[download\]\s+(\d+\.\d+)%/);

    if (match) {
      io.emit("progress", {
        percent: parseFloat(match[1]),
      });
    }
  });

  process.on("close", (code) => {
    if (code === 0) {
      io.emit("completed");
    } else {
      io.emit("error");
    }
  });

  res.json({
    success: true,
    message: "Download started",
  });
});

module.exports = router;
