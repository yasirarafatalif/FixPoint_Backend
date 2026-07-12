import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";

async function server() {
  try {
    await prisma.$connect();
    console.log("Database Connect Success")
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(`Server Error ${error}`)
      await prisma.$disconnect();
        process.exit(1);

  }
}
server();
