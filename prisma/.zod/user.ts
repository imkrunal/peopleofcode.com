import * as z from "zod"
import * as imports from "../zod-utils"
import { IdentityProvider, UserPermissionRole } from "@prisma/client"

export const UserModel = z.object({
  id: z.number().int(),
  username: z.string(),
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.date().nullish(),
  password: z.string().nullish(),
  identityProvider: z.nativeEnum(IdentityProvider),
  bio: z.string().nullish(),
  avatar: z.string().nullish(),
  timeZone: z.string(),
  theme: z.string().nullish(),
  role: z.nativeEnum(UserPermissionRole).nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
