-- AddForeignKey
ALTER TABLE "Planet" ADD CONSTRAINT "Planet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;