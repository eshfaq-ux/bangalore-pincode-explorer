# 📍 Bangalore Pincode Explorer

A full-stack web app to explore Bangalore pincodes ↔ area names. Search by pincode or area name, filter by zone, and view detailed info for each area.

![Node.js](https://img.shields.io/badge/Node.js-16+-green?style=flat-square)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square)
![Express](https://img.shields.io/badge/Express-4.18-lightgrey?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

## ✨ Features

- 🔍 **Bidirectional search** — search by pincode (`560001`) or area name (`Koramangala`)
- 🗺️ **Zone filter** — browse by Central, North, South, East, West
- 📋 **100+ pincodes** covering all major Bangalore areas
- 🖱️ **Click any card** for full details in a modal
- ⚠️ **Error handling** — input validation, API errors, 404s all handled gracefully

## 🛠 Tech Stack

| Layer    | Tech              |
|----------|-------------------|
| Backend  | Node.js + Express |
| Frontend | React 18          |
| Data     | Static JS dataset |

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm

### Installation

```bash
git clone https://github.com/eshfaq-ux/bangalore-pincode-explorer.git
cd bangalore-pincode-explorer

# Install backend deps
npm install

# Install frontend deps
cd client && npm install && cd ..
```

### Run

```bash
# Terminal 1 — Backend (http://localhost:3001)
npm start

# Terminal 2 — Frontend (http://localhost:3000)
npm run client
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📡 API Endpoints

| Method | Endpoint               | Description                    |
|--------|------------------------|--------------------------------|
| GET    | `/api/all`             | All pincodes                   |
| GET    | `/api/search?q=<term>` | Search by pincode or area name |
| GET    | `/api/pincode/:code`   | Single pincode lookup          |
| GET    | `/api/zones`           | List all zones                 |
| GET    | `/api/zone/:zone`      | All pincodes in a zone         |

### Examples

```bash
# Search by area name
curl "http://localhost:3001/api/search?q=koramangala"

# Lookup a specific pincode
curl "http://localhost:3001/api/pincode/560001"

# Get all South zone pincodes
curl "http://localhost:3001/api/zone/South"
```

### Error Responses

```json
{ "error": "Pincode must be a 6-digit number" }
{ "error": "Query must be at least 2 characters" }
{ "error": "Invalid zone. Valid zones: Central, North, South, East, West" }
{ "error": "Route not found" }
```

## 📁 Project Structure

```
bangalore-pincode-explorer/
├── server.js           # Express API server with error handling
├── data/
│   └── pincodes.js     # Pincode dataset (100+ entries)
├── client/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js      # Main React component
│       ├── index.js    # Entry point
│       └── index.css   # Styles
└── package.json
```

## 📄 License

MIT
