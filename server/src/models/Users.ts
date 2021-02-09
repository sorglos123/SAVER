import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface UserAttributes {
    user_id?: number;
    user_name: string;
    password: string;
    email: string;
    creation_date?: Date;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {}
export class Users extends Model<UserModel, UserAttributes> {}
