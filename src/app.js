import http from 'http';
import { parse } from 'url';
import { handleWebhook } from './controllers/webhook.js';
import dotenv from 'dotenv';

dotenv.config();

// Start the server
const server = http.createServer(async (req, res) => {
  const WEBHOOK = '/eden-tradingview-telegram-bot-webhook';
  const parsedUrl = parse(req.url, true);

  if (parsedUrl.pathname === WEBHOOK && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString(); // Convert Buffer to string
    });

    req.on('end', async () => {
      const requestBody = JSON.parse(body);
      const response = await handleWebhook(requestBody);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('No webhook');
  }
});

// Start server on port 8080
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});