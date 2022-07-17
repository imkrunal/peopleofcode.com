import { hashPassword } from "@lib/auth";
import prisma from "@lib/prisma";
import { UserPermissionRole } from "@prisma/client";

async function createUser(user: {
  name: string;
  username: string;
  email: string;
  password: string;
  role: UserPermissionRole;
}) {
  const { username, email, password, name, role } = user;
  const hashedPassword = await hashPassword(password);
  await prisma.user.upsert({
    where: { username },
    update: {
      email,
      name,
    },
    create: {
      name,
      username,
      email,
      password: hashedPassword,
      emailVerified: new Date(Date.now()),
      role,
    },
  });
}

async function main() {
  await createUser({
    name: "Krunal Shah",
    username: "admin",
    email: "krunal@peopleofcode.com",
    password: "Password123#",
    role: UserPermissionRole.ADMIN,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
