import { getManager } from "typeorm";

export const createUser = async (user: User): Promise<void> => {
  const res = await getManager().query(
    `
    INSERT INTO user (firstName, lastName, email, password, role)
    VALUES ($1, $2, $3, $4, $5)
  `,
    [user.firstName, user.secondName, user.email, user.password, "user"]
  );
};

export const isUserExist = (email: string): boolean => {};
