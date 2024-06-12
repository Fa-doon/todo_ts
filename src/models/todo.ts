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
  Default,
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

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  completed!: boolean;

  @BelongsTo(() => User)
  user!: User;
}
