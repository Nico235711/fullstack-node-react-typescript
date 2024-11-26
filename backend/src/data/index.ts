import { exit } from 'node:process'
import colors from 'colors'
import db from '../config/db';

const clearDB = async () => {
  try {
    // borro la bd
    await db.sync({ force: true })
    console.log(colors.cyan("Base de datos eliminada"));
    exit()
  } catch (error) {
    console.log(error);
    exit(1)
  }
}

// ejecuta si el 2do. argumento del argv es --clear
if (process.argv[2] === "--clear") {
  clearDB()
}

// console.log(process.argv);
