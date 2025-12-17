const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const caseRoutes = require("./routes/caseRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/cases", caseRoutes);
app.use("/reports", reportRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Helpdesk API funcionando correctamente" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor iniciado en puerto ${PORT}`));
