CREATE OR REPLACE FUNCTION check_conversation_exists(user_id_1 INT, user_id_2 INT) 
    RETURNS table 
	(conversationId int) 
    AS
    $BODY$
	SELECT (
		SELECT "conversation"."id" FROM "conversation_users" 
			INNER JOIN "conversation" as "conv" ON "conversation_users"."conversation_id" = "conv"."id"
			where ("user_id" = user_id_1 OR "user_id" = user_id_2) 
			AND "conversation_id" = "conversation"."id"
			AND "conv"."isGroupConversation" = false
			LIMIT 1
		)
		as count
	FROM conversation
    $BODY$
   LANGUAGE 'sql';