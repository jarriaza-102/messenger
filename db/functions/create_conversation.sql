 CREATE OR REPLACE FUNCTION create_conversation(user_owner INT, user_slave INT) 
    RETURNS INT AS $$
    BEGIN
      INSERT INTO "conversation" ("owner", "creationDate", "conversationType", "statusId", "name", "isGroupConversation", "slave")
	VALUES(user_owner, 123, 2, 1, '', false, user_slave);

      INSERT INTO "conversation_users" ("user_id", "status", "conversation_id")
	VALUES(user_owner, 1, (SELECT "conversation"."id" FROM conversation WHERE "owner" = user_owner AND "slave" = user_slave));

      INSERT INTO "conversation_users" ("user_id", "status", "conversation_id")
	VALUES(user_slave, 1, (SELECT "conversation"."id" FROM conversation WHERE "owner" = user_owner AND "slave" = user_slave));

	RETURN "conversation"."id" FROM conversation WHERE "owner" = user_owner AND "slave" = user_slave;

    END;
    $$ LANGUAGE plpgsql;