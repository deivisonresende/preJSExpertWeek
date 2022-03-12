import http from 'http';
const PORT = 3000

async function handler(req, res) {}

http.createServer(handler)
.listen(PORT)
.on('listening', () => console.log(`Server running on port ${PORT}`))