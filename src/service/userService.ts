import { getManager } from "typeorm";
import { User } from "../interfaces/user";

export const createUser = async (user: User): Promise<User> => {
  const res = await getManager().query(
    `
    INSERT INTO users (first_name, last_name, email, password, avatar)
    VALUES ($1, $2, $3, $4, $5)
  `,
    [user.first_name, user.last_name, user.email, user.password, "test"]
  );

  return res;
};

export const isUserExist = async (email: string): Promise<boolean> => {
  const res = await getManager().query(
    `
    SELECT * FROM users WHERE email=$1
  `,
    [email]
  );
  return res.length === 1;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  const res = await getManager().query(
    `
    SELECT * FROM users WHERE email=$1 AND password=$2
  `,
    [email, password]
  );

  if (res.length !== 1) {
    throw new Error();
  }
  return res[0];
};

export const getUserByToken = async (id: string): Promise<User> => {
  const res = await getManager().query(
    `
    SELECT * FROM users WHERE id=$1
  `,
    [id]
  );
  if (res.length !== 1) {
    throw new Error();
  }
  return res.pop();
};

export const saveRefreshToken = async (
  refreshToken: string,
  id: string
): Promise<void> => {
  await getManager().query(
    `
    UPDATE users 
    SET refresh_token = $1
    WHERE id = $2
  `,
    [refreshToken, id]
  );
};

export const GetNewAccessTokenByRefresh = async (
  refreshToken: string,
  id: string
): Promise<void> => {
  await getManager().query(
    `
    Update users 
    SET refresh_token = $1
    WHERE id = $2
  `,
    [refreshToken, id]
  );
};
