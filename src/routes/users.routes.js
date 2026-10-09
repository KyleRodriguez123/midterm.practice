const express = require('express');
const router = express.Router();

// Mock initial data collection
let users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "member" }
];

const buildResponse = (data, count) => ({
    "success": true,
    "data": data,
    "meta": { "timestamp": new Date().toISOString(), "count": count }
});

// GET /api/users (Filter by role)
router.get('/', (req, res) => {
    let result = users;
    if (req.query.role) {
        result = result.filter(item => item.role === req.query.role);
    }
    res.status(200).json(buildResponse(result, result.length));
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
    const item = users.find(u => u.id === parseInt(req.params.id));
    if (!item) return res.status(404).json({ success: false, error: "User not found" });
    res.status(200).json(buildResponse([item], 1));
});

// POST /api/users (Payload validation for name, email, role)
router.post('/', (req, res) => {
    const { name, email, role } = req.body;
    
    if (!name || !email || !role) {
        return res.status(400).json({ 
            success: false, 
            error: "Bad Request: Missing mandatory fields (name, email, role required)" 
        });
    }

    const newItem = { id: Date.now(), name, email, role };
    users.push(newItem);
    res.status(201).json(buildResponse([newItem], 1));
});

// DELETE /api/users/:id
router.delete('/:id', (req, res) => {
    const initialCount = users.length;
    users = users.filter(u => u.id !== parseInt(req.params.id));
    if (users.length < initialCount) return res.status(204).send();
    res.status(404).json({ success: false, error: "User not found" });
});

module.exports = router;