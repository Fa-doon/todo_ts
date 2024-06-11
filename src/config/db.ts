import { Sequelize } from "sequelize-typescript";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from "./env";
import Todo from "../models/todo";
import User from "../models/user";

const sequelize = new Sequelize({
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
  models: [Todo, User],
});

export default sequelize;
