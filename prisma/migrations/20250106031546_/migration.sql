/*
  Warnings:

  - You are about to drop the column `poster` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Movie` table. All the data in the column will be lost.
  - The primary key for the `MovieToGenre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `description` on the `Playlist` table. All the data in the column will be lost.
  - You are about to drop the column `isPrivate` on the `Playlist` table. All the data in the column will be lost.
  - The primary key for the `PlaylistToMovie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `authorId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserLikedReviews` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Genre` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `MovieToGenre` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `PlaylistToMovie` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_authorId_fkey";

-- DropForeignKey
ALTER TABLE "_UserLikedReviews" DROP CONSTRAINT "_UserLikedReviews_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserLikedReviews" DROP CONSTRAINT "_UserLikedReviews_B_fkey";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "poster",
DROP COLUMN "rating",
ALTER COLUMN "releaseDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MovieToGenre" DROP CONSTRAINT "MovieToGenre_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "MovieToGenre_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Playlist" DROP COLUMN "description",
DROP COLUMN "isPrivate",
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "PlaylistToMovie" DROP CONSTRAINT "PlaylistToMovie_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "PlaylistToMovie_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "authorId",
DROP COLUMN "updatedAt",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "content" DROP NOT NULL;

-- DropTable
DROP TABLE "Like";

-- DropTable
DROP TABLE "_UserLikedReviews";

-- CreateTable
CREATE TABLE "ReviewToGenre" (
    "id" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "genreId" TEXT NOT NULL,

    CONSTRAINT "ReviewToGenre_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- AddForeignKey
ALTER TABLE "ReviewToGenre" ADD CONSTRAINT "ReviewToGenre_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewToGenre" ADD CONSTRAINT "ReviewToGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
