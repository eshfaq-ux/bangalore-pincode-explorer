# Bangalore Pincode Explorer

A full-stack web app to explore Bangalore pincodes ↔ area names.

## Features
- Search by pincode or area name
- Filter by zone (Central, North, South, East, West)
- 100+ Bangalore pincodes
- Click any card for detailed info

## Tech Stack
- **Backend:** Node.js + Express
- **Frontend:** React 18

## Getting Started

```bash
git clone https://github.com/eshfaq-ux/bangalore-pincode-explorer.git
cd bangalore-pincode-explorer
npm run setup
```

**Terminal 1 — Backend (port 3001):**
```bash
npm start
```

**Terminal 2 — Frontend (port 3000):**
```bash
npm run client
```

## API Endpoints

| Endpoint | Description |
|---|---|
| `GET /api/all` | All pincodes |
| `GET /api/search?q=<term>` | Search by pincode or area |
| `GET /api/pincode/:code` | Single pincode lookup |
| `GET /api/zones` | List all zones |
| `GET /api/zone/:zone` | Pincodes by zone |

## License
MIT
