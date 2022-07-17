-- CreateEnum
CREATE TYPE "UserPermissionRole" AS ENUM ('USER', 'AGENCY', 'ADMIN');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3) NOT NULL,
    "password" TEXT,
    "bio" TEXT,
    "avatar" TEXT,
    "timeZone" TEXT NOT NULL DEFAULT 'Europe/London',
    "theme" TEXT,
    "role" "UserPermissionRole",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
