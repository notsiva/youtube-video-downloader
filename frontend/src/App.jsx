import { useState } from "react";
import { api } from "./services/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

import { useEffect } from "react";
import { socket } from "./services/socket";

export default function App() {
  const [url, setUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);

  const [loading, setLoading] = useState(false);

  const [videoFormat, setVideoFormat] = useState("");
  // const [audioFormat, setAudioFormat] = useState("");

  const [metadata, setMetadata] = useState(true);

  const [progress, setProgress] = useState(0);

  const [status, setStatus] = useState("Idle");

  const searchVideo = async () => {
    if (!url.trim()) {
      alert("Please enter a YouTube URL");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/formats", {
        url,
      });

      setVideoInfo(response.data);

      setVideoFormat("");
      // setAudioFormat("");
    } catch (error) {
      console.error(error);
      alert("Failed to fetch video information");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    socket.on("progress", (data) => {
      setProgress(data.percent);
      setStatus("Downloading");
    });

    socket.on("completed", () => {
      setProgress(100);
      setStatus("Completed");
    });

    socket.on("error", () => {
      setStatus("Failed");
    });

    return () => {
      socket.off("progress");
      socket.off("completed");
      socket.off("error");
    };
  }, []);
  const downloadVideo = async () => {
    if (!videoFormat) {
      alert("Select a video quality");
      return;
    }

    setStatus("Starting");
    setProgress(0);

    // if (!audioFormat) {
    //   alert("Select an audio quality");
    //   return;
    // }

    try {
      const response = await api.post("/download", {
        url,
        videoFormat,
        metadata,
      });

      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Download failed");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-4">
      <div className="w-full h-full">
        <h1 className="text-4xl font-bold text-center mb-6">YouTube Downloader</h1>

        <div className="flex gap-3 max-w-[1600px] mx-auto">
          <Input
            className="h-14 text-base bg-zinc-900 border-zinc-700 focus:ring-0 focus:border-zinc-500"
            placeholder="Paste YouTube URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <Button
            onClick={searchVideo}
            disabled={loading}
            className="h-14 min-w-[120px] bg-blue-600 hover:bg-blue-700 focus:ring-0  text-white"
          >
            {loading ? "Loading..." : "Search"}
          </Button>
        </div>

        {videoInfo && (
          <div className="grid grid-cols-[45%_55%] gap-6 w-full max-w-[1600px] mx-auto mt-6">
            {/* LEFT SIDE */}
            <Card className="bg-zinc-900 border-zinc-700 p-4 ">
              <img
                src={videoInfo.thumbnail}
                alt="thumbnail"
                className="w-full h-[320px] object-cover rounded-lg"
              />

              {/* <h2 className="text-2xl font-bold mt-4">{videoInfo.title}</h2> */}
              <h2 className="text-xl font-bold line-clamp-2">
                {videoInfo.title}
              </h2>
              <p className="text-zinc-400 mt-2">
                Duration: {videoInfo.duration} sec
              </p>
            </Card>

            {/* RIGHT SIDE */}
            <Card className="bg-zinc-900 border-zinc-700 p-6 h-fit">
              <div className="mb-6">
                <label className="block mb-2 font-medium">Video Quality</label>

                <select
                  className="w-full p-3 rounded bg-zinc-800 border border-zinc-700"
                  value={videoFormat}
                  onChange={(e) => setVideoFormat(e.target.value)}
                >
                  <option value="">Select Video Quality</option>

                  {videoInfo?.videoFormats?.map((f) => (
                    <option key={f.format_id} value={f.format_id}>
                      {f.height}p{f.fps > 30 ? ` ${f.fps}fps` : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Audio Quality
              <div className="mb-6">
                <label className="block mb-2 font-medium">Audio Quality</label>

                <select
                  className="w-full p-3 rounded bg-zinc-800 border border-zinc-700"
                  value={audioFormat}
                  onChange={(e) => setAudioFormat(e.target.value)}
                >
                  <option value="">Select Audio Quality</option>

                  {videoInfo?.audioFormats?.map((f) => (
                    <option key={f.format_id} value={f.format_id}>
                      {f.abr ? `${f.abr} kbps` : "Best Audio"}
                    </option>
                  ))}
                </select>
              </div> */}

              {/* Metadata Checkbox */}
              <div className="mt-4">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={metadata}
                    onChange={() => setMetadata(!metadata)}
                  />
                  Embed metadata & thumbnail
                </label>
              </div>

              <Button
                disabled={!videoFormat}
                className="mt-6 w-full h-12 bg-blue-600 hover:bg-blue-700 focus:ring-0  text-white font-semibold"
                onClick={downloadVideo}
              >
                Download
              </Button>

              <div className="mt-6">
                <p className="mb-2">Status: {status}</p>

                <div className="w-full bg-zinc-800 rounded h-4">
                  <div
                    className="bg-green-500 h-4 rounded"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <p className="mt-2">{progress.toFixed(1)}%</p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
