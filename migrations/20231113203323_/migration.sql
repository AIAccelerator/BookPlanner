/*
  Warnings:

  - You are about to drop the `_ResourceToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ResourceToTag" DROP CONSTRAINT "_ResourceToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ResourceToTag" DROP CONSTRAINT "_ResourceToTag_B_fkey";

-- DropTable
DROP TABLE "_ResourceToTag";

-- CreateTable
CREATE TABLE "ResourceToTag" (
    "id" SERIAL NOT NULL,
    "tagId" INTEGER NOT NULL,
    "resourceId" INTEGER NOT NULL,

    CONSTRAINT "ResourceToTag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ResourceToTag" ADD CONSTRAINT "ResourceToTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceToTag" ADD CONSTRAINT "ResourceToTag_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
