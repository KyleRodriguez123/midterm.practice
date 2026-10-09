const express = require('express');
const app = express();

// 1. Body Parsing Middleware (Must be before routes)
app.use(express.json());

// 2. Route Mounting (Modify based on your 3 or 4 team members)
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/products', require('./routes/products.routes'));
app.use('/api/orders', require('./routes/orders.routes'));
// app.use('/api/categories', require('./routes/categories.routes')); // Add if 4 members

// 3. Catch-All 404 Route Handler (Must be at the very bottom)
app.use((req, res) => {
    res.status(404).json({
        "success": false,
        "error": {
            "code": "NOT_FOUND",
            "message": "The requested endpoint does not exist on this server."
        }
    });
});

// 4. Server Binding
app.listen(1234, () => {
    console.log('Server is running on http://localhost:1234');
});
