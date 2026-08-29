const { exec } = require("child_process");

app.get("/api/run", (req, res) => {
    const command = req.query.command;

    exec(command, (error, stdout) => {
        res.json({ output: stdout });
    });
});
