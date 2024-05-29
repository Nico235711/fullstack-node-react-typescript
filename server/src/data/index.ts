import colors from 'colors';
import db from '../config/db';
import { exit } from 'node:process' // cancela una operacion de node

const clearDB = async () => {
  try {
    await db.sync({ force: true }) // elimina todos los datos de la BD
    console.log(colors.bgMagenta.bold("Datos eliminados correctamente"));
    exit()
    
  } catch (error) {
    console.log(error);
    exit(1)
  }
}

if (process.argv[2] === "--clear") {
  clearDB()
}