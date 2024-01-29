const express = require('express');
const multer = require('multer');
const fs = require('fs');
const mammoth = require('mammoth');
const pdf = require('html-pdf');

const app = express();
const port = process.env.PORT || 3000;

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint for Word to PDF conversion
app.post('/convert', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Convert Word document to HTML using mammoth
  mammoth.extractRawText({ arrayBuffer: req.file.buffer })
    .then((result) => {
      const html = result.value;

      // Convert HTML to PDF using html-pdf
      pdf.create(html).toBuffer((err, buffer) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Conversion failed' });
        }

        // Send the PDF file in the response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
        res.send(buffer);
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Conversion failed' });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
