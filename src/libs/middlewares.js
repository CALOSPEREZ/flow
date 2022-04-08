import jwt from "jsonwebtoken";
import { User } from "../db";

export const token_auth = async (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  var { id } = req.params;
  const { cod } = req.query;
  var user = new User();
  if (id) {
    user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!user)
      return res.status(404).json({ mensaje: "Usuario no Encontrado" });
  } else if (cod) {
    const validate = await User.findOne({
      where: {
        cod_cliente: cod,
      },
    });
    if (validate)
      return res
        .status(404)
        .json({ mensaje: "El codigo ya se encuentra en uso" });
  }

  if (!req.headers.authorization) {
    return res.status(403).send({ message: "Token invalido ", ok: false });
  }

  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];

  jwt.verify(bearerToken, "my_secret_ke", (err, data) => {
    if (err) {
      res.status(403).json({ mensaje: "Usuario no Autenticado" });
    } else {
      req.token = jwt.decode(bearerToken);

      req.cod_cliente = cod || user.cod_cliente;
      next();
    }
  });
};

export const token = async (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "Token invalido ", ok: false });
  }

  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];

  jwt.verify(bearerToken, "my_secret_ke", (err, data) => {
    if (err) {
      res.status(403).json({ mensaje: "Usuario no Autenticado" });
    } else {
      req.token = jwt.decode(bearerToken);
      next();
    }
  });
};
