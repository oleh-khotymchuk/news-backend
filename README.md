# News Backend API

A Node.js Express server that provides news data from NewsAPI.

## API Endpoints

- `GET /` - Server information and available endpoints
- `GET /api/health` - Health check endpoint
- `GET /api/news` - Get all top headlines
- `GET /api/news?category=business` - Get news by category
- `GET /api/news?q=searchterm` - Search news articles

### Supported Categories

- business
- entertainment
- general
- health
- science
- sports
- technology

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in the root directory:

   ```
   NEWSAPI_KEY=your_newsapi_key_here
   PORT=3001
   ```

3. **Get NewsAPI Key:**
   - Visit [NewsAPI.org](https://newsapi.org)
   - Sign up for a free account
   - Copy your API key to the `.env` file

## Running the Server

**Development mode:**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will start on `http://localhost:3001` (or your configured PORT).

## Environment Variables

- `NEWSAPI_KEY` - Your NewsAPI.org API key (required)
- `PORT` - Server port (default: 3001)

## Response Format

### Success Response

```json
{
  "articles": [
    {
      "title": "Article title",
      "description": "Article description",
      "url": "https://...",
      "urlToImage": "https://...",
      "publishedAt": "2023-...",
      "source": {
        "name": "Source name"
      }
    }
  ]
}
```
