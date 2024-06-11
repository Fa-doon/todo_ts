import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
  BeforeCreate,
} from "sequelize-typescript";
import bcrypt from "bcrypt";

@Table({
  tableName: "users",
  timestamps: true,
})
export default class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  fullname!: string;

  @Unique(true)
  @AllowNull(false)
  @Column(DataType.STRING)
  username!: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  // Hashing the password
  @BeforeCreate
  static async hashPassword(instance: User) {
    const hashedPassword = await bcrypt.hash(instance.password, 10);
    instance.password = hashedPassword;
  }

  // Comparing password
  async isMatch(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
