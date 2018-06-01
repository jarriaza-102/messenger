CREATE OR REPLACE FUNCTION check_conversation_exists(user_id_1 INT, user_id_2 INT) 
    RETURNS table 
	(conversationid int) 
    AS
    $BODY$
	SELECT "conversation"."id" FROM "conversation"
		INNER JOIN "user" ON "conversation"."owner" = "user"."id"
		OR "conversation"."slave" = "user"."id"
		where ( ("user"."id" = user_id_1 AND "slave" = user_id_2)
			OR ("slave" = user_id_1 AND "user"."id" = user_id_2) )
			AND "conversation"."isGroupConversation" = false
    $BODY$
   LANGUAGE 'sql'

--   DROP FUNCTION check_conversation_exists(integer,integer)