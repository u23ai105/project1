import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "thisKeyIsSupposedToBeSecret";

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return payload;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}