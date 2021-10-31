import { ConnectionOptions, createConnection } from "typeorm";
const Database = () => {
  const dbConfig: ConnectionOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [__dirname + "/../app/models/*{.ts,.js}"],
    synchronize: true,
    ssl: {
      rejectUnauthorized: false,
    },
  };

  (async () => {
    console.time("Database Connection Timing");
    try {
      console.log(dbConfig);
      
      await createConnection(dbConfig);
      console.timeEnd("Database Connection Timing");
    } catch (error) {
      console.error("Unable to connect the database");
      console.error(error);
    }
  })();
};

export default Database;
