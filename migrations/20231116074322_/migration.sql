-- DropForeignKey
ALTER TABLE "ResourceToTag" DROP CONSTRAINT "ResourceToTag_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "ResourceToTag" DROP CONSTRAINT "ResourceToTag_tagId_fkey";

-- AddForeignKey
ALTER TABLE "ResourceToTag" ADD CONSTRAINT "ResourceToTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceToTag" ADD CONSTRAINT "ResourceToTag_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
