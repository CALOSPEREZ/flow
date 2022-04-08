import { User } from "../db";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import fs from "fs-extra";
import path from "path";

export const user_list = async (req, res) => {
  try {
    const user_token = req.token;
    if (user_token.user.super != 1) {
      return res.status(401).json({
        mensaje: "usuario no autorizado",
        ok: false,
      });
    }
    const user = await User.findAndCountAll({
      where: {
        super: 0,
      },
      orden: [["id", "ASC"]],
    });
    return res.status(200).json({
      mensaje: "Consulta realizada con exito",
      users: user.rows,
      ok: true,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Ha ocurrido un error",
      error,
    });
  }
};
const eliminarArchivo = (ruta) => {
  const p = path.join(__dirname, "../public/" + ruta);
  fs.unlink(p);
};
const eliminarFichero = (ruta) => {
  const p = path.join(__dirname, "../public/" + ruta);
  fs.removeSync(p);
};
export const user_crear = async (req, res) => {
  try {
    await check("nombre_cliente", "El nombre_cliente es requerido")
      .notEmpty()
      .run(req);

    await check("cod_empresa", "El cod_cliente  es requerido")
      .notEmpty()
      .run(req);
    await check("cod_inicial", "El cod_inicial de categoria es requerido")
      .notEmpty()
      .run(req);
    await check("cod_final", "cod_final es requerido").notEmpty().run(req);
    await check("habilitado", "El habilitado de categoria es requerido")
      .notEmpty()
      .run(req);
    await check("email", "email es requerido").notEmpty().run(req);
    await check("password", "El password es requerido").notEmpty().run(req);
    await check("AdminSuper", "El super  es requerido")
      .notEmpty()
      .run(req);
      await check("reporte", "El reporte es requerido")
      .notEmpty()
      .run(req);
      

    const user_token = req.token;
    const request = validationResult(req);
    var {
      nombre_cliente,
      cod_inicial,
      cod_final,
      email,
      password,
      AdminSuper,
      habilitado,
      cod_empresa,
      medidatLogo,
      medidatSublogo,
      reporte

    } = req.body;
    let codEmpresa = req.cod_cliente;
    const files = req.files;
    var rutaLogo = "";
    var rutaSublogo = "";
    if (files) {
      if (files.length > 0) {
        if (files.length == 1) {
          if (files[0].fieldname == "logo") {
            rutaLogo = `clientes/${codEmpresa}/logo/${files[0].filename}`;
          } else {
            rutaSublogo = `clientes/${codEmpresa}/logo/${files[0].filename}`;
          }
        } else {
          rutaLogo = `clientes/${codEmpresa}/logo/${files[0].filename}`;
          rutaSublogo = `clientes/${codEmpresa}/logo/${files[1].filename}`;
        }
      }
    }

    if (!request.isEmpty()) {
      if (files) {
        if (files.length > 0) {
          if (files.length == 1) {
            if (files[0].fieldname == "logo") {
              eliminarArchivo(rutaLogo);
            } else {
              eliminarArchivo(rutaSublogo);
            }
          } else {
            eliminarArchivo(rutaLogo);
            eliminarArchivo(rutaSublogo);
          }
        }
      }
      return res.status(422).json(request);
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const user = await User.create({
      nombre_cliente,
      cod_cliente: req.cod_cliente,
      cod_inicial,
      cod_final,
      email,
      password,
      medidatLogo,
      medidatSublogo,
      super: AdminSuper,
      habilitado,
      reporte,
      medidatLogo,
      medidatSublogo,
      ruta_sublogo: rutaSublogo == "" ? null : rutaSublogo,
      ruta_logo: rutaLogo == "" ? null : rutaLogo,
      cod_empresa,
    });

    return res.status(200).json({
      mensaje: "Consulta realizada con exito",
      ok: true,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Ha ocurrido un error",
      error,
    });
  }
};

export const user_update = async (req, res) => {
  try {
    await check("nombre_cliente", "El nombre_cliente es requerido")
      .notEmpty()
      .run(req);
    await check("cod_empresa", "El cod_cliente  es requerido")
      .notEmpty()
      .run(req);
    await check("cod_inicial", "El cod_inicial de categoria es requerido")
      .notEmpty()
      .run(req);
    await check("cod_final", "cod_final es requerido").notEmpty().run(req);
    await check("habilitado", "El habilitado  es requerido")
      .notEmpty()
      .run(req);
    await check("email", "email es requerido").notEmpty().run(req);
    await check("AdminSuper", "El super  es requerido")
      .notEmpty()
      .run(req);

    await check("ruta_logo", "El ruta_logo  es requerido")
      .notEmpty()
      .run(req);
    await check("ruta_sublogo", "El ruta_sublogo  es requerido")
      .notEmpty()
      .run(req);
    await check("validate", "El validate  es requerido")
      .notEmpty()
      .run(req);
      await check("reporte", "El reporte  es requerido")
      .notEmpty()
      .run(req);
      
    const request = validationResult(req);
    let codEmpresa = req.cod_cliente;
    const files = req.files;
    var rutaLogo = "";
    var rutaSublogo = "";
    if (files) {
      if (files.length > 0) {
        if (files.length == 1) {
          if (files[0].fieldname == "logo") {
            rutaLogo = `clientes/${codEmpresa}/logo/${files[0].filename}`;
          } else {
            rutaSublogo = `clientes/${codEmpresa}/logo/${files[0].filename}`;
          }
        } else {
          rutaLogo = `clientes/${codEmpresa}/logo/${files[0].filename}`;
          rutaSublogo = `clientes/${codEmpresa}/logo/${files[1].filename}`;
        }
      }
    }

    if (!request.isEmpty()) {
      if (files) {
        if (files.length > 0) {
          if (files.length == 1) {
            if (files[0].fieldname == "logo") {
              eliminarArchivo(ruta_logo);
            } else {
              eliminarArchivo(ruta_sublogo);
            }
          } else {
            eliminarArchivo(ruta_logo);
            eliminarArchivo(ruta_sublogo);
          }
        }
        return res.status(422).json(request);
      }
    }
    var {
      nombre_cliente,
      cod_inicial,
      cod_final,
      email,
      password,
      AdminSuper,
      ruta_logo,
      ruta_sublogo,
      habilitado,
      cod_empresa,
      validate,
     medidatLogo,
     reporte,
      medidatSublogo
    } = req.body;
    var { id } = req.params;

    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (files) {
      if (files.length > 0) {
        if (files.length == 1) {
          if (files[0].fieldname == "logo") {
            eliminarArchivo(user.ruta_logo);
          } else {
            eliminarArchivo(user.ruta_sublogo);
          }
        } else {
          eliminarArchivo(user.ruta_logo);
          eliminarArchivo(user.ruta_sublogo);
        }
      }
    }
    if (!user) {
      if (files) {
        if (files.length > 0) {
          if (files.length == 1) {
            if (files[0].fieldname == "logo") {
              eliminarArchivo(rutaLogo);
            } else {
              eliminarArchivo(rutaSublogo);
            }
          } else {
            eliminarArchivo(rutaLogo);
            eliminarArchivo(rutaSublogo);
          }
        }
      }
      return res.status(401).json({
        mensaje: "Usuario no encontrada",
        ok: false,
      });
    }
    if (validate === "true") {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    user.nombre_cliente = nombre_cliente;
    user.cod_inicial = cod_inicial;
    user.cod_final = cod_final;
    user.email = email;
    user.reporte= reporte;
    user.medidatLogo= medidatLogo;
    user.medidatSublogo=medidatSublogo;
    user.AdminSuper = AdminSuper;
    if (files) {
      if (files.length > 0) {
        if (files.length == 1) {
          if (files[0].fieldname == "logo") {
            user.ruta_logo = rutaLogo;
          } else {
            user.ruta_sublogo = rutaSublogo;
          }
        } else {
          user.ruta_logo = rutaLogo;
          user.ruta_sublogo = rutaSublogo;
        }
      }
    }
    if(ruta_sublogo=="null")

    {

        eliminarArchivo(user.ruta_sublogo);

        user.ruta_sublogo = null;

    }


    user.habilitado = habilitado;
    user.cod_empresa = cod_empresa;

    user.save();
    res.status(200).json({
      ok: true,
      user: user,
      mensaje: "Usuario Actualizado",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Ha ocurrido un error",
      error,
    });
  }
};

export const user_delete = async (req, res) => {
  try {
    var { id } = req.params;
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!user)
      return res.status(401).json({
        mensaje: "Usuario no encontrada",
        ok: false,
      });

    eliminarFichero(user.cod_cliente);
    await user.destroy();

    return res.status(200).json({
      mensaje: "Usuario eliminada con exito",
      user,
      ok: true,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Ha ocurrido un error",
      error,
    });
  }
};

export const user_habilitado = async (req, res) => {
  try {
    var { id, habilitado } = req.params;
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!user)
      return res.status(401).json({
        mensaje: "Usuario no encontrada",
        ok: false,
      });
    user.habilitado = habilitado;
    user.save();

    return res.status(200).json({
      mensaje: "Usuario Actualizado con exito",
      user,
      ok: true,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Ha ocurrido un error",
      error,
    });
  }
};
