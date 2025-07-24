const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// IMPORTANT: Removed app.use(express.static(...)) because there is no 'static' folder.
// All HTML files are expected to be in the root directory.
// If you have other assets (CSS, JS, images) that were in 'static',
// you will need to move them to the root or define new routes for them.

// Route to serve HTML files and inject API key
app.get('/:filename', (req, res, next) => {
    const filename = req.params.filename;
    // Adjust filePath to look directly in the root directory (__dirname)
    const filePath = path.join(__dirname, filename);

    // List of HTML files that need API key injection
    // Ensure this list is accurate for all your HTML files in the root
    const filesToInject = [
        'tailor.html', 
        'cover_letter_writer.html', 
        'index.html', 
        'coverletter.html', 
        'user_settings.html', 
        'login.html',
		'AI_Job_Tailor.html',
        'shared_coverletter.html' // If you ever implement this page, it would also be in root
    ]; 

    if (filesToInject.includes(filename) && fs.existsSync(filePath)) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading file ${filename}:`, err);
                // Send a more user-friendly error message
                return res.status(404).send(`File not found: ${filename}. Please ensure it's in the root directory.`);
            }

            // Inject the API key into the HTML
            const firebaseApiKey = process.env.FIREBASE_API_KEY || ''; 
            const apiKeyScript = `<script>window.FIREBASE_API_KEY = "${firebaseApiKey}";</script>`;
            const modifiedHtml = data.replace('</head>', `${apiKeyScript}\n</head>`);
            
            res.send(modifiedHtml);
        });
    } else {
        // If the requested file is not an HTML file that needs injection,
        // or if it's not found in the root, we'll try to serve it as a static asset
        // if express.static was used. Since it's removed, this will now result in 404
        // for non-HTML files unless specific routes are added for them.
        res.status(404).send('Resource not found or not configured to be served.');
    }
});

// Handle root URL to serve index.html
app.get('/', (req, res) => {
    // Adjust filePath to look directly in the root directory (__dirname)
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading index.html:', err);
            return res.status(404).send('Error loading index page: index.html not found in root.');
        }
        const firebaseApiKey = process.env.FIREBASE_API_KEY || '';
        const apiKeyScript = `<script>window.FIREBASE_API_KEY = "${firebaseApiKey}";</script>`;
        const modifiedHtml = data.replace('</head>', `${apiKeyScript}\n</head>`);
        res.send(modifiedHtml);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
