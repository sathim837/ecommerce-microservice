import mysql from "mysql2/promise";

async function main() {
  const conn = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "userdb",
  });

  console.log("Connected to MySQL successfully");

  await conn.end();
}

main().catch(console.error);