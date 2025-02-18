import { OpenAI } from 'openai'; // Import OpenAI client
import * as dotenv from 'dotenv'; // Import dotenv to load environment variables
import { createServer } from 'node:http';

// Load .env configuration
dotenv.config();

// Ensure the API key is loaded
const apiKey = process.env.OPENAI_API_KEY;
console.log('API Key:', apiKey); // Check if the key is printed here.

if (!apiKey) {
  throw new Error('API Key is missing!');
}

// Configure OpenAI with API key from .env
const openai = new OpenAI({
  apiKey: apiKey, // Your API Key from .env
});

// Server logic
const server = createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/chat') {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', async () => {
      const { prompt } = JSON.parse(data);

      try {
        const response = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ response: response.choices[0].message.content }));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

// Start the server
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});
