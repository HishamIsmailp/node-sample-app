const { pool } = require("../db");

exports.getAllMeetingRooms = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM meeting_room");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error retrieving meeting rooms" });
    }
}

exports.createMeetingRoom = async (req, res) => {
    const { name, price } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO meeting_room(name,price) VALUES($1,$2) RETURNING *",
            [name, price]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error inserting meeting room" });
    }
}

exports.updateMeetingRoom = async (req, res) => {
    const id = req.params.id;
    const { name, price } = req.body;
    try {
        const result = await pool.query(
            "UPDATE meeting_room SET name = $1, price = $2 WHERE id = $3 RETURNING *",
            [name, price, id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: `Meeting room with ID ${id} not found` });
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating meeting room" });
    }
}

exports.deleteMeetingRoom = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query(
            "DELETE FROM meeting_room WHERE id = $1 RETURNING *",
            [id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: `Meeting room with ID ${id} not found` });
        } else {
            res.json({ message: `Meeting room with ID ${id} deleted successfully` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error deleting meeting room" });
    }
}

exports.getMeetingRoom = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query(
            "SELECT * FROM meeting_room WHERE id = $1",
            [id]
        );
        if (result.rows.length === 0) {
            res.status(404).json({ error: `Meeting room with ID ${id} not found` });
        } else {
            res.json(result.rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error retrieving meeting room" });
    }
}

