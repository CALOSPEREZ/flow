
const { Sequelize } = require("sequelize");
import * as config from './libs/config'
import { UserModel, } from './models/users';
import { CategoriaModel } from './models/categorias';
import { AreaModel } from './models/areas';
import { ContactoModel } from './models/contacto';
import { ExternoModel } from './models/externos';
import { InstalacionModel } from './models/instalaciones';
import { reporteModel } from './models/reportes';
import { SintomaModel } from './models/sintoma';
import { UserExternoModel } from './models/usuarioexterno';
let db = null;
export const database = () => {
  if (!db) {
    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params
    );
    db = {
      sequelize,
      Sequelize,
    };
  
  }
  return db;
}
const timestap = { timestamps: false };
const UserM = database().sequelize.define('users', UserModel, timestap);
const CategoriaM = database().sequelize.define('categorias', CategoriaModel, timestap);
const InstalacionM = database().sequelize.define('instalaciones', InstalacionModel, timestap);
const AreanM = database().sequelize.define('areas', AreaModel, timestap);
const SintomaM = database().sequelize.define('sintomas', SintomaModel, timestap);
const ContactoM = database().sequelize.define('contactos', ContactoModel, timestap);
const ExternoM = database().sequelize.define('entidades_externas', ExternoModel, timestap);
const UsuarioExternoM = database().sequelize.define('usuarios_externos', UserExternoModel, timestap);
const ReporteM = database().sequelize.define('reportes', reporteModel, timestap);
//categoria
// UserM.hasMany(CategoriaM, { foreignKey: 'id_cliente', sourceKey: 'cod_cliente', as: 'categorias' });
// CategoriaM.belongsTo(UserM, { foreignKey: 'id_cliente', targetKey: 'cod_cliente', as: 'users' });
//instalacion
UserM.hasMany(InstalacionM, { as: 'instalaciones', onDelete: 'cascade' });

//area
InstalacionM.hasMany(AreanM, { as: 'areas', onDelete: 'cascade' });
AreanM.belongsTo(InstalacionM, { as: 'instalacione' });
//sintoma
UserM.hasMany(SintomaM, { as: 'sintomas', onDelete: 'cascade' });
//contacto
UserM.hasMany(ContactoM, { as: 'contactos', onDelete: 'cascade' });
//entidades externas
UserM.hasMany(ExternoM, { as: 'entidades_externas', onDelete: 'cascade' });
//usuarios externos
UserM.hasMany(UsuarioExternoM, { as: 'usuario_externos', onDelete: 'cascade' });
UsuarioExternoM.belongsTo(ExternoM, { as: 'entidad_externa' });
//Synchronizing all models at once
UserM.hasMany(ReporteM, { as: 'reportes', onDelete: 'cascade' });

// const syncModels = async () => {

//   try {
//     await UserM.sync({ alter: true })
//     await CategoriaM.sync({ alter: true })
//     await InstalacionM.sync({ alter: true })
//     await AreanM.sync({ alter: true })
//     await SintomaM.sync({ alter: true })
//     await ContactoM.sync({ alter: true })
//     await ExternoM.sync({ alter: true })
//     await UsuarioExternoM.sync({ alter: true })
//     await ReporteM.sync({ alter: true })
//   } catch (error) {
//     console.log(error)
//   }
// }

// syncModels()
export const User = UserM
export const Categoria = CategoriaM
export const Instalacion = InstalacionM;
export const Area = AreanM;
export const Sintoma = SintomaM;
  export const Contacto = ContactoM;
export const Externo = ExternoM;
export const UsuarioExterno = UsuarioExternoM;
export const Reporte = ReporteM;