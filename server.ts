import express = require("express");

const app: express.Application = express();

app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(3000, () => {
    console.log('App listening on port 3000')
})
