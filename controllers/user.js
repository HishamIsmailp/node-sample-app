const { pool } = require("../db");
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
    try {
        const result = await pool.query("SELECT name,email FROM customer");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error retrieving User" });
    }
}

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO customer(name,email,customer_password) VALUES($1,$2,$3) RETURNING name,email",
            [name, email, await this.encodeUserPassword(password)]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error inserting User" });
    }
}

exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    try {
        const result = await pool.query(
            "UPDATE customer SET name = $1, email = $2 ,customer_password=$3 WHERE id = $4 RETURNING name,email",
            [name, email, await this.encodeUserPassword(password), id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: `User with ID ${id} not found` });
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating User" });
    }
}

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query(
            "DELETE FROM customer WHERE id = $1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: `User with ID ${id} not found` });
        } else {
            res.json({ message: `User with ID ${id} deleted successfully` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error deleting meeting room" });
    }
}

exports.getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query(
            "SELECT * FROM customer WHERE id = $1",
            [id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: `User with ID ${id} not found` });
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error retrieving User" });
    }
}

exports.encodeUserPassword = async (password) => {
    return await bcrypt.hash(password, 10);;
}