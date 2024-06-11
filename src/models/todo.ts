import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  ForeignKey,
  AutoIncrement,
  AllowNull,
  BelongsTo,
} from "sequelize-typescript";
import User from "./user";

@Table({
  tableName: "todos",
  timestamps: true,
})
export default class Todo extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description!: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  @ForeignKey(() => User)
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}
