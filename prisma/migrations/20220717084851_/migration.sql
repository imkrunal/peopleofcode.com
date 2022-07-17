-- CreateEnum
CREATE TYPE "IdentityProvider" AS ENUM ('PEOPLEOFCODE', 'TWITTER', 'GITHUG', 'LINKEDIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "identityProvider" "IdentityProvider" NOT NULL DEFAULT 'PEOPLEOFCODE';
