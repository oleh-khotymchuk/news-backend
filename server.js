const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: false
}));
app.use(express.json());

// Additional CORS middleware to ensure headers are always present
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// News API endpoint
app.get('/api/news', async (req, res) => {
  try {
    const { category, q: searchTerm } = req.query;
    const apiKey = process.env.NEWSAPI_KEY;
    
    if (!apiKey) {
      return res.status(400).json({ error: 'NewsAPI key not configured' });
    }
    
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    
    if (category) {
      url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
    }
    if (searchTerm) {
      url = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${apiKey}`;
    }

    // Use dynamic import for node-fetch
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.articles) {
      // Remove duplicates based on title
      const uniqueArticles = data.articles.filter((article, index, self) => 
        index === self.findIndex(a => a.title === article.title)
      );
      
      res.json({ articles: uniqueArticles });
    } else {
      res.json({ articles: [] });
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Favicon route to prevent 404 errors
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // No content response
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'News API Server is running!',
    endpoints: {
      '/api/health': 'Health check',
      '/api/news': 'Get all news',
      '/api/news?category=business': 'Get news by category',
      '/api/news?q=searchterm': 'Search news'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});