const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const casesPath = path.join(__dirname, "../data/cases.json");
let cases = require("../data/cases.json");

exports.getCases = (req,res)=> res.json(cases);

exports.createCase = (req,res)=>{
    const { titulo, descripcion, categoria } = req.body;
    const newCase = {
        id: uuid(),
        titulo,
        descripcion,
        categoria,
        estado:"abierto",
        creadoPor:"usuario_externo",
        asignadoA:"soporte_nivel_1",
        fechaCreacion:new Date().toISOString(),
        fechaActualizacion:new Date().toISOString(),
        historial:[
            { fecha:new Date().toISOString(), accion:"Caso creado por usuario externo" }
        ]
    };
    cases.push(newCase);
    fs.writeFileSync(casesPath,JSON.stringify(cases,null,2));
    res.json({message:"Caso creado", caso:newCase});
};
