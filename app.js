const express = require('express');
const path = require('path');
const os = require('os');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// API Routes
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'ABC Bank API is running',
        version: '1.0.0',
        deployment: 'Automated - v2.0 TEST SUCCESS',
        timestamp: new Date().toISOString(),
        server: 'AWS EC2',
        hostname: os.hostname(),
        platform: os.platform()
    });
});

app.get('/api/balance', (req, res) => {
    res.json({
        accountNumber: '****1234',
        balance: 12543.80,
        currency: 'USD',
        lastUpdated: new Date().toISOString()
    });
});

app.get('/api/transactions', (req, res) => {
    res.json({
        transactions: [
            {
                id: 1,
                description: 'Salary Deposit',
                amount: 3500.00,
                type: 'credit',
                date: '2025-10-15'
            },
            {
                id: 2,
                description: 'Online Shopping',
                amount: -127.50,
                type: 'debit',
                date: '2025-10-18'
            },
            {
                id: 3,
                description: 'Electricity Bill',
                amount: -85.20,
                type: 'debit',
                date: '2025-10-19'
            }
        ]
    });
});

app.get('/api/user', (req, res) => {
    res.json({
        name: 'John Doe',
        accountNumber: '****1234',
        accountType: 'Savings',
        branch: 'Main Branch'
    });
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log('=================================');
    console.log('   ABC Bank API Server');
    console.log('=================================');
    console.log(`Status: Running ✓`);
    console.log(`Port: ${PORT}`);
    console.log(`Deployment: Manual - Before DevOps`);
    console.log(`Server: AWS EC2`);
    console.log(`Hostname: ${os.hostname()}`);
    console.log(`Access: http://localhost:${PORT}`);
    console.log('=================================');
    console.log('Press Ctrl+C to stop server');
});
