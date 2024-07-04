const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8080;

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.txt': 'text/plain',
};

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath == './') {
        filePath = './index.html';
    }

    const extName = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extName] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Sorry, an error occurred: ' + error.code + '..\n');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
