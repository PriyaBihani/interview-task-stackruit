const express = require('express');
require('dotenv').config();
const { connectDB } = require('./utils/db.utils');
const req = require('express/lib/request');
const app = express();

connectDB();
app.use(express.json());
app.use('/posts', require('./routes/post'));

app.get("/", (req, res) => {
    res.send(`Server is running `);
});

const PORT = 5555;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = {
    app
};