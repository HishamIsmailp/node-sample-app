require("dotenv").config();
const express = require('express');

const app = express();

app.use(express.json())

const port = process.env.PORT || 3001

const meetingRooms = require("./routes/MeetingRoom.js")
app.use('/api/v1/meeting-rooms', meetingRooms)

const login = require("./routes/login.js")
app.use('/api/v1/login', login)

const user = require("./routes/user.js")
app.use('/api/v1/user', user)

app.listen(port, () => {
    console.log(`server is up listening on port ${port}`);
})
