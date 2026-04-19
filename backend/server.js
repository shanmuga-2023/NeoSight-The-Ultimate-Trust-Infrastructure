require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 5001;

// Initialize Google Generative AI SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy_key');

app.use(cors());
app.use(express.json());

// Configure multer for file uploads (memory storage for OCR processing)
const upload = multer({ storage: multer.memoryStorage() });

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'NeoSight Backend Running' });
});

// Mock OCR Analysis Endpoint
app.post('/api/analyze', upload.single('document'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No document uploaded' });
  }

  console.log(`Received file: ${req.file.originalname} (${req.file.size} bytes)`);

  // Simulate OCR processing delay
  setTimeout(() => {
    res.json({
      confidence: Math.floor(Math.random() * 10) + 85, // 85-95
      forgeryProbability: Math.floor(Math.random() * 20), // 0-20
      extractedText: "INVOICE #9482\nDATE: 2026-04-19\nTOTAL: $4,500.00\nVENDOR: Advanced Cybernetics Inc.\n\n[OCR CONFIDENCE: HIGH]",
      regions: [
        { top: '20%', left: '10%', width: '40%', height: '5%' },
        { top: '35%', left: '10%', width: '80%', height: '2%' }
      ]
    });
  }, 2000);
});

// Gemini Forensic Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'dummy_key' || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      // Return a simulated response for the hackathon demo if no key is provided
      return res.json({
        response: `[SIMULATED GEMINI RESPONSE]\n\nBased on the Error Level Analysis and Typography anomalies provided in the context, your question "${message}" can be answered as follows:\n\nThe document exhibits highly suspicious compression artifacts around the 'TOTAL' field indicating pixel manipulation. Furthermore, the 'Helvetica Neue' font detected here mismatches the baseline 'Helvetica' used in the rest of the generated template.`
      });
    }

    const systemInstruction = `You are the NeoSight Forensic Engine Assistant. You specialize in Document Forgery Detection. Utilize the following document context to answer the officer's queries.\n\nContext:\n${JSON.stringify(context)}`;
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: systemInstruction 
    });
    
    const result = await model.generateContent(message);
    const text = result.response.text();

    res.json({ response: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to communicate with AI Assistant." });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
