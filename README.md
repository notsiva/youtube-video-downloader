# YouTube Downloader

A modern desktop YouTube downloader built with **Electron**, **React**, **Express.js**, **Tailwind CSS**, and **yt-dlp**.

The application allows users to fetch available video formats, select a preferred MP4 quality, embed metadata and thumbnails, and download videos directly from a clean desktop interface.

---

## Features

* Download YouTube videos using yt-dlp
* Modern desktop application built with Electron
* React + Tailwind CSS user interface
* Fetch available video qualities automatically
* MP4-only quality selection
* Automatic best audio selection
* Embed video metadata
* Embed video thumbnails
* Download progress tracking
* Cross-platform support (Linux & Windows)
* Built-in Electron packaging support

---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* shadcn/ui

### Backend

* Node.js
* Express.js
* Socket.IO

### Desktop

* Electron
* Electron Builder

### Download Engine

* yt-dlp
* FFmpeg

---

## Project Structure

```text
youtube-downloader/
├── assets/
├── backend/
│   ├── routes/
│   └── server.js
├── electron/
│   ├── main.js
│   └── preload.js
├── frontend/
│   ├── src/
│   └── dist/
├── package.json
└── README.md
```

---

## Prerequisites

### Linux

Install yt-dlp:

```bash
sudo dnf install yt-dlp
```

Install FFmpeg:

```bash
sudo dnf install ffmpeg
```

### Ubuntu

```bash
sudo apt install yt-dlp ffmpeg
```

### Windows

Install:

* yt-dlp
* FFmpeg

Ensure both are added to the system PATH.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/notsiva/youtube-video-downloader.git
cd youtube-downloader
```

Install root dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

Install backend dependencies:

```bash
cd ../backend
npm install
```

---

## Development

Start the application:

```bash
npm run dev
```

This launches:

* Express Backend
* React Frontend
* Electron Desktop App

---

## Building Frontend

```bash
cd frontend
npm run build
```

---

## Packaging Electron Application

Generate AppImage:

```bash
npm run build-electron
```

Output:

```text
dist/
└── YouTube Downloader-1.0.0.AppImage
```

Run:

```bash
chmod +x dist/*.AppImage
./dist/*.AppImage
```

---

## Usage

1. Paste a YouTube URL
2. Click Search
3. Select a video quality
4. Enable metadata embedding (optional)
5. Click Download
6. Track progress in real-time

Downloaded files are saved to the system Downloads folder.

---

## Future Improvements

* Playlist downloads
* Audio-only downloads (MP3)
* Download queue manager
* Download history
* Theme customization
* Automatic yt-dlp updates
* Built-in FFmpeg packaging
* Built-in yt-dlp packaging

---

## Disclaimer

This project is intended for educational and personal use only.

Users are responsible for complying with YouTube's Terms of Service and applicable copyright laws.

---

## Author

**Sivakaran**

GitHub: https://github.com/notsivaa
