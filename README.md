# 📍 Bangalore Pincode Explorer

A full-stack web app to explore Bangalore pincodes ↔ area names. Search by pincode or area name, filter by zone, and view detailed info for each area.

![Node.js](https://img.shields.io/badge/Node.js-16+-green?style=flat-square)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

## ✨ Features

- 🔍 **Bidirectional search** — search by pincode (`560001`) or area name (`Koramangala`)
- 🗺️ **Zone filter** — browse by Central, North, South, East, West
- 📋 **100+ pincodes** covering all major Bangalore areas
- 🖱️ **Click any card** for detailed info in a modal
- ⚡ Fast in-memory search, no external database needed

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

### Installation & Run

```bash
git clone https://github.com/eshfaq-ux/bangalore-pincode-explorer.git
cd bangalore-pincode-explorer

# Install dependencies
npm install
cd client && npm install && cd ..

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
curl http://localhost:3001/api/search?q=koramangala
# [{ "pincode": "560017", "area": "Koramangala", "locality": "Koramangala", "zone": "South" }]

curl http://localhost:3001/api/pincode/560001
# { "pincode": "560001", "area": "Bangalore GPO", "locality": "MG Road", "zone": "Central" }

curl http://localhost:3001/api/zone/North
# [...all North zone pincodes]
```

## 📁 Project Structure

```
bangalore-pincode-explorer/
├── server.js           # Express API server
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

## 📸 Preview

| Feature | Description |
|---|---|
| Search | Type pincode or area name, press Enter or click Search |
| Zone Filter | Click Central / North / South / East / West tabs |
| Card Grid | All matching areas shown as cards |
| Detail Modal | Click any card to see full details |

## 📄 License

MIT
