// cors-proxy.js

// eslint-disable-next-line no-undef
import { createServer } from 'cors-anywhere';

const host = 'localhost';
const port = 8080;

createServer({
  originWhitelist: [], // Allow all origins
}).listen(port, host, () => {
  console.log(`CORS Anywhere proxy server is running on ${host}:${port}`);
});
