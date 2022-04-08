import { User,Categoria } from "../db";
import * as config_email from "../libs/mail_config";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs-extra";
import path from "path";
import pdf from "pdf-creator-node";

export const new_password = async (req, res) => {
  await check("password", "la contraseña es requerida").notEmpty().run(req);
  await check("rePassword", "la contraseña es requerida").notEmpty().run(req);
  await check("token", "el token es requerido").notEmpty().run(req);
  const request = validationResult(req);
  if (!request.isEmpty()) return res.status(422).json(request);

  const { password, rePassword, token } = req.body;

  let verifiedToken = null;

  jwt.verify(token, "my_secret_ke", (err, data) => {
    if (err) {
      res.status(403).json({ mensaje: "Usuario invalido" });
    } else {
      verifiedToken = jwt.decode(token);
    }
  });

  const user = await User.findOne({
  
    where: {
      id: verifiedToken.userid,
    },
  });

  const salt = await bcrypt.genSalt(10);
  const passwordEncrip = await bcrypt.hash(rePassword, salt);
  await user.update({ password: passwordEncrip });
  return res.status(200).json({
    mensaje: "Contraseña actualizada con exito",
    ok: true,
  });
};

export const forgot_password = async (req, res) => {
  try {
    await check("correo")
      .isEmail()
      .withMessage("correo invalido")
      .notEmpty()
      .withMessage("correo requerido")
      .run(req);
    const request = validationResult(req);
    if (!request.isEmpty()) return res.status(422).json(request);
    const { correo } = req.body;
    const user = await User.findOne({
      where: {
        cod_cli: cod_cli,
      },
    });
    if (user == null)
      return res.status(401).json({
        mensaje: "El usuario no se encuentra registrado en la aplicacion",
        ok: false,
      });

    const token = jwt.sign(
      { userid: user.dataValues.id, email: user.dataValues.email },
      "my_secret_ke",
      { expiresIn: "10m" }
    );
    const verificationLink = `http://localhost:8080/new-password?q=${token}`;
    await user.update({ remember_token: token });
    // enviar

    let info = await config_email.email_config().sendMail({
      from: '"Actualizar contraseña 👻" <contacto@cartaenqr.me>', // sender address
      to: `${correo}`, // list of receivers
      subject: "Requcuperar contraseña ✔️", // Subject line
      html: `
    <b>ingrese a esta url</b>
    <a href="${verificationLink}"> cambiar contraseña </a>
    `, // html body
    });

    return res.status(200).json({
      mensaje: "Se ha enviado el correo electronico",
      ok: true,
      token: token,
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const login = async (req, res) => {
  await check("cod_cliente")
    .notEmpty()
    .withMessage("cod_cliente requerido")
    .run(req);
  await check("password", "la contraseña es requerida").notEmpty().run(req);

  const request = validationResult(req);
  if (!request.isEmpty()) return res.status(422).json(request);
  const { cod_cliente, password } = req.body;

  const user = await User.findOne({
    where: {
      cod_cliente: cod_cliente,
    },
  });

  if (user == null)
    return res.status(401).json({
      mensaje: "El usuario no se encuentra registrado en la aplicacion",
      ok: false,
    });

  const bool = await bcrypt.compare(password, user.dataValues.password);
  if (bool) {
    const token = jwt.sign({ user }, "my_secret_ke");
    return res.status(200).json({
      token: token,
      user: {
        id: user.id,
        logo: user.ruta_logo,
        codCliente: user.cod_cliente,
        reporte: user.reporte,
        super: user.super
      },
      ok: true,
      mensaje: "Autenticacíon exitosa",
    });
  } else {
    return res.status(401).json({
      mensaje: "La contraseña no coincide con la registrada",
      ok: false
    });
  }
};

export const refresh = async (req, res) => {
  try {
    console.log(req.token);
    res.json(req.token);
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error,
    });
  }
};

export const prueba = async (req, res) => {
  try {


    await check("cod_cliente", " cod_cliente es requerido").notEmpty().run(req);
await check("nombre", " nombre es requerido").notEmpty().run(req);
await check("apellido", " apellido es requerido").notEmpty().run(req);
await check("correo", " correo es requerido").notEmpty().run(req);
await check("nacionalidad", " nacionalidad es requerido").notEmpty().run(req);
await check("telefono", " telefono es requerido").notEmpty().run(req);
await check("rut", " rut es requerido").notEmpty().run(req);
 
await check("covid", " covid es requerido").notEmpty().run(req);
await check("sintomas", " sintomas es requerido").notEmpty().run(req);
await check("contacto", " contacto es requerido").notEmpty().run(req);
await check("cuarentena", " cuarentena es requerido").notEmpty().run(req);
await check("acompat", " acompat es requerido").run(req);
await check("menores", " menores es requerido").notEmpty().run(req);
await check("hijos", " hijos es requerido").run(req);

await check("texto", " texto es requerido").notEmpty().run(req);
await check("titulo", " titulo es requerido").notEmpty().run(req);
await check("logo", " logo es requerido").notEmpty().run(req);
await check("idioma", " idioma es requerido").notEmpty().run(req);
const request = validationResult(req);
if (!request.isEmpty()) return res.status(422).json(request);
      
var  {
  titulo,
  texto,
  logo,
cod_cliente,
nombre,
apellido,
correo,
nacionalidad,
telefono,
rut,
fechainicial,
fechafinal,
covid,
sintomas,
contacto,
cuarentena,
sublogo,
acompat,
menores,
hijos,
idioma

} = req.body;
 
if(hijos.length>0)
  hijos.forEach( (entry) => idioma=='ESP' ? entry.validatei = true : entry.validatei = false);
if(acompat.length>0)
  acompat.forEach( (entry) => idioma=='ESP'? entry.validatei = true : entry.validatei = false);

  idioma = require(`../idiomas/${idioma}`)
    const user = await User.findOne({
      where: {
        cod_cliente: cod_cliente,
      },
    });
    if (!user) {
      return res.status(401).json({
        mensaje: "Usuario no encontrada",
        ok: false,
      });
    }
    var html = fs.readFileSync(
      path.join(__dirname, "../helpers/plantilla.html"),
      "utf8"
    );
    var options = {
      format: "A3",
      orientation: "portrait",
      border: "10mm",
      header: {
        height: "20mm",
        contents:
          '<div style="text-align: center;"><h1>'+titulo+'</h1></div>',
      },
    };
    var users = [
      {
        name: "Shyam",
        age: "26",
      },
      {
        name: "Navjot",
        age: "26",
      },
      {
        name: "Vitthal",
        age: "26",
      },
    ];
    var document = {
      html: html,
      data: {
        users: users,
        nombre,
        apellido,
        correo,
        nacionalidad,
        telefono,
        rut,
        idioma,
        covid,
        sintomas,
        contacto,
        cuarentena,
        acompat,
        menores,
        texto,
        logo,
        hijos,
        fechainicial,
fechafinal,
sublogo
      },
      path: "./declaracion.pdf",
      type: "",
    };

    const url = await pdf.create(document, options);
   
   
   /* let info = await config_email.email_config().sendMail({
      from: "<contacto@cartaenqr.me>", // sender address
      to: `${user.email}`, // list of receivers
      subject: "Declaración Jurada de Salud", // Subject line
      html: `
    Declaracion de salud del usuario ${nombre} ${apellido}
      `, // html body
      attachments: [
        {
          path: url.filename,
        },
      ],
    });
    const p = url.filename;*/
    //fs.unlink(p);
    return res.status(200).json({
      mensaje: "Correo enviado",
      correo: correo,
      ok: true,
    });
  } catch (error) {
    console.log("error", error.toString());
  }
};
export const validate = async (req, res) => {
  try {
    const { cod } = req.query;
const user = await User.findOne({
  where: {
    cod_cliente: cod,
    habilitado : 1,
    super:0  
  }
});
if (!user) {
  return res.status(401).json({
    mensaje: "No se encuentra el cliente o este no esta habilitado",
    ok: false,
  });
}else {
  return res.status(200).json({
    user: user.cod_cliente,
    ok: true,
  });
}
 } catch (error) {
    console.log("error", error.toString());
  }
};