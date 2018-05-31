CREATE OR REPLACE FUNCTION set_timestamp_message()
	RETURNS trigger AS
	$$
	BEGIN
		UPDATE "message" SET "sentDate" = now()::timestamp WHERE "message"."id" = NEW.id;
		RETURN NEW;
	END;
	$$
LANGUAGE 'plpgsql';


CREATE TRIGGER set_timestamp_message_trigger
  AFTER INSERT
  ON "message"
  FOR EACH ROW
  EXECUTE PROCEDURE set_timestamp_message();