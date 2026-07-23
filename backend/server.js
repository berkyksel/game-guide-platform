const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); //Farklı portlardan gelen isteklere izin ver
app.use(express.json());//JSON formatında gelen verileri parse et

app.post('/api/chat', (req, res) => {
    const { input } = req.body;

    if (!input) {

        return res.status(400).json({ error: 'Oyun ismi boş olamaz. ' });
    }

    const mockResponse = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Node.js sunucusundan selam! "${input}" oyununun mekaniklerini ve hangi motor ile çalıştığını öğrenmek için araştırma yapabilirsin.`

    };

    setTimeout(() => {
        res.json(mockResponse);
    }, 1000);
});

app.listen(PORT, () => {
    console.log(`Backend sunucusu http://localhost:"${PORT}" adresinde çalışıyor.`);
});


