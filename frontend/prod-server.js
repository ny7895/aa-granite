const { createServer } = require('http');
const next = require('next');
const path = require('path');
const fs = require('fs');

const appDir = __dirname;
const app = next({
  dev: false,
  dir: appDir,
  customServer: false
});

const handler = app.getRequestHandler();

// Create static file middleware
const staticFileHandler = (req, res) => {
  const staticPath = path.join(appDir, '.next', req.url.replace('/_next', ''));

  fs.access(staticPath, fs.constants.R_OK, (err) => {
    if (!err) {
      res.setHeader('Content-Type', getContentType(staticPath));
      fs.createReadStream(staticPath).pipe(res);
    } else {
      handler(req, res);
    }
  });
};

function getContentType(filePath) {
  const ext = path.extname(filePath);
  switch (ext) {
    case '.css': return 'text/css';
    case '.js': return 'application/javascript';
    case '.woff2': return 'font/woff2';
    case '.png': return 'image/png';
    case '.jpg': return 'image/jpeg';
    default: return 'text/html';
  }
}

app.prepare().then(() => {
  createServer((req, res) => {
    if (req.url.startsWith('/_next/static')) {
      return staticFileHandler(req, res);
    }
    return handler(req, res);
  }).listen(3000, '0.0.0.0', () => {
    console.log('> Ready on http://0.0.0.0:3000');
  });
}).catch(err => {
  console.error('Server failed to start:', err);
  process.exit(1);
});