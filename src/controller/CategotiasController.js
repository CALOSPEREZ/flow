import { User,Categoria } from "../db";
import { check, validationResult } from "express-validator";
import fs from "fs-extra";
import path from "path";
import { paginate, getPagination, getPagingData } from "../helpers/paginate";
import { isNull } from "util";

const fetch = require("node-fetch");

export const categoria_list = async (req, res) => {
  const user_token = req.token;
  try {
    const categorias = await Categoria.findAndCountAll({
      where: {
        id_cliente: user_token.user.cod_cliente,
      }, order: [
        ['orden', 'ASC']
      ]
    });

    return res.status(200).json({
      mensaje: "Consulta realizada con exito",
      categorias: categorias.rows,
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


export const ordenar = async (req, res) => {
  await check("data").isArray().withMessage("data debe ser un arreglo").notEmpty().withMessage("data es requerido").run(req);
  await check("data.*.id").notEmpty().withMessage("id es requerido").run(req);
  await check("data.*.orden").notEmpty().withMessage("orden es requerido").run(req);
  const request = validationResult(req);
  if (!request.isEmpty()) {
    return res.status(422).json(request);
  }


  const { data } = req.body;
  try {
    for (let index = 0; index < data.length; index++) {
      await Categoria.update(
        { orden: data[index].orden },
        {
          where: {
            id: data[index].id,
            id_cliente: req.token.user.cod_cliente
          }
        }
      )
    }
    res.status(200).json({
      ok: true,
      mensaje: "Actualizacion exitosa",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Ha ocurrido un error",
      error,
    });
  }


};

export const categoria_l = async (req, res) => {
  const cliente = req.params.route;
  try {
    const categorias = await Categoria.findAndCountAll({
      where: {
        id_cliente: cliente,
        habilitado: 'ON'
      },
      order: [
        ['orden', 'ASC']
      ]
    });
    const idiomas = await Categoria.findAndCountAll({
      where: {
        id_cliente: cliente,
        habilitado: 'ON'
      },
      group: ["idioma"],
      attributes: ["idioma"],
    });
    const user = await User.findOne({
      where: {
        cod_cliente: cliente,
        habilitado: 1,
      },
    });
    if (user === null) {
      return res.status(200).json({
        mensaje: "usuario no habilitado",
        idiomas: idiomas.rows,
        categorias: categorias.rows,
        user: user,
        ok: false,
      });
    } else {
      return res.status(200).json({
        mensaje: "Consulta realizada con exito",
        idiomas: idiomas.rows,
        categorias: categorias.rows,
        user: user,
        ok: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      mensaje: "Ha ocurrido un error",
      error,
    });
  }
};

export const categoria_create = async (req, res) => {
  await check("idioma", "El idioma es requerido").notEmpty().run(req);
  await check("nombre_categoria", "El nombre de la categoria es requerido")
    .notEmpty()
    .run(req);
  await check("tipo_categoria", "El tipo de categoria es requerido")
    .notEmpty()
    .run(req);
  // await check('opcion', 'La opción es requerida').notEmpty().run(req)
  // await check('valor', 'El valor es requerido').notEmpty().run(req)
  await check("habilitado", "Habilitado es requerido").notEmpty().run(req);

  try {
    var user_token = req.token;
    var ruta_archivo;
    var imagen = req.file;

    if (imagen) {
      let codEmpresa = user_token.user.cod_cliente;
      const name = imagen.filename;
      let ext = path.extname(imagen.originalname).toLowerCase();
      if (ext === ".pdf") ruta_archivo = `clientes/${codEmpresa}/pdf/${name}`;
      if (ext === ".png" || ext === ".jpg" || ext === ".jpeg")
        ruta_archivo = `clientes/${codEmpresa}/img/${name}`;
    }

    const request = validationResult(req);
    if (!request.isEmpty()) {
      if (ruta_archivo) fs.unlink(`public/${ruta_archivo}`);

      return res.status(422).json(request);
    }

    var {
      idioma,
      nombre_categoria,
      tipo_categoria,
      opcion,
      valor,
      url_externa,
      habilitado,
    } = req.body;

    if (tipo_categoria === "Imagen" && !imagen) {
      fs.unlink(`public/${ruta_archivo}`);

      return res.status(401).json({
        mensaje: "Debe ingresar una imagen",
        ok: false,
      });
    }

    if (tipo_categoria === "URL") {
      if (!url_externa) {
        return res.status(401).json({
          mensaje: "Debe ingresar una url externa",
          ok: false,
        });
      } else {
        const fileName = req.body.url_externa.split("/").pop();
        const fileNameExt = fileName.split(".").pop();

        if (fileNameExt) {
          const fileTypes = /gif|jpeg|jpg|svg+xml|tiff|webp|pdf/;

          const isValidExtention = fileTypes.test(fileNameExt.toLowerCase());

          if (isValidExtention) {
            const response = await fetch(req.body.url_externa);
            const buffer = await response.buffer();
            const codEmpresa = req.token.user.cod_cliente;
            let url;
            if (fileNameExt === "pdf") {
              url = path.join(
                __dirname,
                `../public/clientes/${codEmpresa}/pdf`
              );
              fs.mkdirSync(url, { recursive: true });
              url_externa = `clientes/${codEmpresa}/pdf/${fileName}`;
            } else {
              url = path.join(
                __dirname,
                `../public/clientes/${codEmpresa}/img`
              );
              fs.mkdirSync(url, { recursive: true });
              url_externa = `clientes/${codEmpresa}/img/${fileName}`;
            }
            fs.writeFile(url + "/" + fileName, buffer);
          } else {
            return res.status(401).json({
              mensaje:
                "Formato de archivo invalido, solo se admiten imagenes o PDF",
              ok: false,
            });
          }
        } else {
          return res.status(401).json({
            mensaje: "La ruta suministrada no posee ningun archivo",
            ok: false,
          });
        }
      }
    }

    if (tipo_categoria === "Opción" && !opcion && !valor) {
      fs.unlink(`public/${ruta_archivo}`);

      return res.status(401).json({
        mensaje: "Debe ingresar opción y valor",
        ok: false,
      });
    }
    const orden = await Categoria.max('orden', { where: { 'id_cliente': req.token.user.cod_cliente } });
    const categoria = await Categoria.create({
      idioma,
      nombre_categoria,
      tipo_categoria,
      ruta_archivo,
      opcion,
      valor,
      id_cliente: user_token.user.cod_cliente,
      url_externa,
      habilitado,
      orden: !isNaN(orden) ? orden + 1 : 1
    });

    if (!categoria) {
      if (ruta_archivo) fs.unlink(`public/${ruta_archivo}`);

      return res.status(401).json({
        mensaje: "No se ha podido agregar la categoria",
        ok: false,
      });
    }

    return res.status(200).json({
      mensaje: "Categoria creada con exito",
      categoria,
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

export const categoria_update = async (req, res) => {
  await check("idioma", "El idioma es requerido").notEmpty().run(req);
  await check("nombre_categoria", "El nombre de la categoria es requerido")
    .notEmpty()
    .run(req);
  await check("tipo_categoria", "El tipo de categoria es requerido")
    .notEmpty()
    .run(req);
  // await check('opcion', 'La opción es requerida').notEmpty().run(req)
  // await check('valor', 'El valor es requerido').notEmpty().run(req)
  await check("habilitado", "Habilitado es requerido").notEmpty().run(req);

  try {
    var user_token = req.token;
    var imagen = req.file;
    var ruta_archivo;

    if (imagen) {
      let codEmpresa = user_token.user.cod_cliente;
      const name = imagen.filename;
      let ext = path.extname(imagen.originalname).toLowerCase();
      if (ext === ".pdf") ruta_archivo = `clientes/${codEmpresa}/pdf/${name}`;
      if (ext === ".png" || ext === ".jpg" || ext === ".jpeg")
        ruta_archivo = `clientes/${codEmpresa}/img/${name}`;
    }

    const request = validationResult(req);

    if (!request.isEmpty()) {
      if (ruta_archivo) fs.unlink(`public/${ruta_archivo}`);

      return res.status(422).json(request);
    }

    var {
      idioma,
      nombre_categoria,
      tipo_categoria,
      opcion,
      valor,
      url_externa,
      habilitado,
    } = req.body;

    var { id_categoria } = req.params;

    const categoria = await Categoria.findOne({
      where: {
        id: id_categoria,
      },
    });

    if (!categoria) {
      if (ruta_archivo) fs.unlink(`public/${ruta_archivo}`);

      return res.status(401).json({
        mensaje: "Categoria no encontrada",
        ok: false,
      });
    }


    if (tipo_categoria === "URL") {
      if (categoria.ruta_archivo) {
        fs.unlink(`public/${categoria.ruta_archivo}`);
        categoria.ruta_archivo = "";
      }

      if (categoria.url_externa) {
        fs.unlink(`public/${url_externa}`);
      }

      // optimizar
      const fileName = req.body.url_externa.split("/").pop();
      const fileNameExt = fileName.split(".").pop();

      if (fileNameExt) {
        const fileTypes = /gif|jpeg|jpg|svg+xml|tiff|webp|pdf/;

        const isValidExtention = fileTypes.test(fileNameExt.toLowerCase());

        if (isValidExtention) {
          const response = await fetch(req.body.url_externa);
          const buffer = await response.buffer();
          const codEmpresa = req.token.user.cod_cliente;
          let url;
          if (fileNameExt === "pdf") {
            url = path.join(__dirname, `../public/clientes/${codEmpresa}/pdf`);
            fs.mkdirSync(url, { recursive: true });
            url_externa = `clientes/${codEmpresa}/pdf/${fileName}`;
            categoria.url_externa = url_externa;
          } else {
            url = path.join(__dirname, `../public/clientes/${codEmpresa}/img`);
            fs.mkdirSync(url, { recursive: true });
            url_externa = `clientes/${codEmpresa}/img/${fileName}`;
            categoria.url_externa = url_externa;
          }
          fs.writeFile(url + "/" + fileName, buffer);
        } else {
          return res.status(401).json({
            mensaje:
              "Formato de archivo invalido, solo se admiten imagenes o PDF",
            ok: false,
          });
        }
      } else {
        return res.status(401).json({
          mensaje: "La ruta suministrada no posee ningun archivo",
          ok: false,
        });
      }
    }
    else {
      categoria.url_externa = url_externa;
    }

    if (ruta_archivo) {
      if (categoria.ruta_archivo) 
      fs.unlink(`public/${categoria.ruta_archivo}`);

      categoria.ruta_archivo = ruta_archivo;
      categoria.url_externa = "";
    }

    if (tipo_categoria === "Opción") {
      if (categoria.url_externa) {
        fs.unlink(`public/${categoria.url_externa}`);
        categoria.url_externa = "";
      }

      if (categoria.ruta_archivo) {
        fs.unlink(`public/${categoria.ruta_archivo}`);
        categoria.ruta_archivo = "";
      }
    }

    categoria.idioma = idioma;
    categoria.nombre_categoria = nombre_categoria;
    categoria.tipo_categoria = tipo_categoria;
    categoria.opcion = opcion;
    categoria.valor = valor;
    categoria.habilitado = habilitado;
    await categoria.save();

    return res.status(200).json({
      mensaje: "Categoria actualizada con exito",
      categoria,
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

export const categoria_show = async (req, res) => {
  try {
    var { id_categoria } = req.params;
    const categoria = await Categoria.findOne({
      where: {
        id: id_categoria,
      },
    });

    if (!categoria)
      return res.status(401).json({
        mensaje: "Categoria no encontrada",
        ok: false,
      });

    return res.status(200).json({
      mensaje: "Categoria encontrada con exito",
      categoria,
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

export const categoria_delete = async (req, res) => {
  try {
    var { id_categoria } = req.params;
    const categoria = await Categoria.findOne({
      where: {
        id: id_categoria,
      },
    });

    if (!categoria)
      return res.status(401).json({
        mensaje: "Categoria no encontrada",
        ok: false,
      });

    if (categoria.ruta_archivo) fs.unlink(`public/${categoria.ruta_archivo}`);

    await categoria.destroy();

    return res.status(200).json({
      mensaje: "Categoria eliminada con exito",
      categoria,
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
