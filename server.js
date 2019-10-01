const express = require("express")
const app = express()
var cors = require("cors")

app.use(cors())
app.use(express.json({ extended: false }))
const PORT = 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
app.get("/", (req, res) => res.send("API Running"))
app.use("/api/getWalletBalance", require("./routes/api/getWalletBalance"))
