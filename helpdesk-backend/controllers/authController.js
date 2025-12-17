const users = require("../data/users.json");

exports.login = (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (password !== user.password)
        return res.status(401).json({ message: "Contraseña incorrecta" });

    res.json({
        message: "Login exitoso",
        user: { id: user.id, name: user.name, role: user.role }
    });
};
