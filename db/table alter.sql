ALTER TABLE "conversation" ADD COLUMN "is_group_conversation" BIT NOT NULL
ALTER TABLE "conversation" ADD COLUMN "slave" INT;
ALTER TABLE "message" DROP COLUMN "answerId";
ALTER TABLE "message" ADD COLUMN "answerId" INT NULL;