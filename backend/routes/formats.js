const express = require("express");
const router = express.Router();
const { exec } = require("child_process");

router.post("/", (req, res) => {
  const { url } = req.body;

  exec(
    `yt-dlp -J "${url}"`,
    { maxBuffer: 1024 * 1024 * 50 },
    (error, stdout) => {
      if (error) {
        return res.status(500).json({
          error: error.message,
        });
      }

      const info = JSON.parse(stdout);

      const mp4Formats = info.formats.filter(
        (f) => f.vcodec !== "none" && f.height && f.ext === "mp4",
      );

      const uniqueFormats = [];

      const seenHeights = new Set();

      for (const format of mp4Formats) {
        if (!seenHeights.has(format.height)) {
          seenHeights.add(format.height);
          uniqueFormats.push(format);
        }
      }

      res.json({
        title: info.title,
        thumbnail: info.thumbnail,
        duration: info.duration,
        videoFormats: uniqueFormats,
      });
    },
  );
});

module.exports = router;
