import server from "./server";
import colors from 'colors'

const port = process.env.DB_PORT || 4000

server.listen(port, () => {
  console.log(colors.cyan(`REST API en el puerto http://localhost:${port}`));
})