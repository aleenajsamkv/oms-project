import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "oms_new",
  entities: ["dist/entities/*.js"],
  migrations: ["dist/db/migrations/*.js"],
  synchronize: false,
  logging: true,
});

export default dataSource;