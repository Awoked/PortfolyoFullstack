import NextAuth, { DefaultUser } from "next-auth";
import { User } from "@prisma/client";
import { DefaultJWT } from "next-auth/jwt";

type UserType = Omit<User, "password">;

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserType;
  }

  interface User extends UserType {
  }

}
declare module "next-auth/jwt" {

  interface JWT extends UserType { }

}