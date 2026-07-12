import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const verifyToken = (token :string,screct: string )=>{
    const userToken= jwt.verify(token, screct)
    return userToken;

};

const createToken = (payload: JwtPayload , screct: string , expiresIn: SignOptions ) => {
  const token = jwt.sign(
    payload,
    screct,
    { expiresIn} as SignOptions,
  );
  return token;
};

export const jwtUtils = {
  createToken,
  verifyToken,
};
