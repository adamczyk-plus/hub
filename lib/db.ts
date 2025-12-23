import mysql, { Connection } from "mysql2/promise.js";

let connection: Connection;
export const createConnection = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    connection.on("error", (e) => console.error(e));
  }

  return connection;
};
