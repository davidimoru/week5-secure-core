const allowedCommands = {
    status: "System is running",
    version: "Training application v1.0"
};

app.get("/api/run", (req, res) => {
    if (!req.query.command) return res.status(400).json({ error: "Invalid command" });
    const command = req.query.command;

    if (command !== "status" && command !== "version") {
        return res.status(400).json({ error: "Invalid command" });
    }

    res.json({ output: allowedCommands[command] });
});
