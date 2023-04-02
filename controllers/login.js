const { pool } = require("../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await pool.query(
            'SELECT id, name, email, customer_password FROM customer WHERE email = $1',
            [email]
        );
        if (result.rowCount === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.customer_password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id }, "upcode12345", { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
}
