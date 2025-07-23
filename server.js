const express = require('express');
const path = require('path');
const fs = require('fs'); // Node.js File System module

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'static' directory
app.use(express.static(path.join(__dirname, 'static')));

// Route to serve HTML files and inject API key
app.get('/:filename', (req, res, next) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'static', filename);

    // List of HTML files that need API key injection
    const filesToInject = ['tailor.html', 'cover_letter_writer.html', 'index.html', 'coverletter.html', 'user_settings.html', 'login.html']; // Add all your HTML files here

    if (filesToInject.includes(filename) && fs.existsSync(filePath)) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading file ${filename}:`, err);
                return res.status(500).send('Error loading page.');
            }

            // Inject the API key into the HTML
            const apiKeyScript = `<script>window.FIREBASE_API_KEY = "${process.env.FIREBASE_API_KEY}";</script>`;
            const modifiedHtml = data.replace('</head>', `${apiKeyScript}\n</head>`);

            res.send(modifiedHtml);
        });
    } else {
        // If it's not an HTML file or not in the list, let express.static handle it
        next();
    }
});

// Handle root URL to serve index.html
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'static', 'index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading index.html:', err);
            return res.status(500).send('Error loading index page.');
        }
        const apiKeyScript = `<script>window.FIREBASE_API_KEY = "${process.env.FIREBASE_API_KEY}";</script>`;
        const modifiedHtml = data.replace('</head>', `${apiKeyScript}\n</head>`);
        res.send(modifiedHtml);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});