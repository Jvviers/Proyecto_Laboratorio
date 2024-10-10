import crypto from "crypto";
//agregar import de la base de datos from 'tantotanto'
import bcrypt from "bcrypt";

import { SALT_ROUNDS } from "./config.js";

//crear const { Schema } =  new Database({path: './db'})

const Session = Schema("Session", {
  _id: { type: String, required: true },
  user: { type: String, required: true },
  expires: { type: Date, required: true },
});
const User = Schema("User", {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export class UserRepository {
  static async create({ username, password }) {
    //Validar username (opcional:usar zod)
    Validation.username(username);
    Validation.password(password);

    //Validar que el username no exista
    const id = crypto.randomUUID(); //el random puede tener problemas de rendimientos pero hay que ver como funciona primero
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);


    User.create({
      _id: id,
      username,
      password: hashedPassword,
    }).save();

    return id;
  }

  static async login({ username, password }) {
    Validation.username(username);
    Validation.password(password);

    const user = User.findOne({ username })
    if (!user) throw new Error("invalid username or password");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("invalid username or password");

    const { password: _,publicUser } = user;

    return publicUser //devolver el usuario
  }
}


class Validation {
    static username(username) {
        if (username != "string") throw new Error("username must be a string");
        if (username.length < 3) throw new Error("username must be at least 3 characters");
    }

    static password(password) {
        if (typeof password != "string") throw new Error("password must be a string");
        if (password.length < 6) throw new Error("password must be at least 8 characters");
    }
}