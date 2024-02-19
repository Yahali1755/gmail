import bcrypt from "bcrypt";

const saltRounds = 10;

export const hash = (input: string) => bcrypt.hash(input, saltRounds);