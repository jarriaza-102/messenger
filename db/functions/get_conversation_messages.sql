CREATE OR REPLACE FUNCTION get_conversation_messages(conversation_id INT) 
	RETURNS table
		(
			conversationId INT, conversationType INT, isGroupConversation boolean, messageId INT, sender INT,
			messageType INT, message TEXT, answerId INT
		)
	AS
	$BODY$
		SELECT "conversation"."id", "conversationType", "isGroupConversation",
			"message"."id" as "messageId", "message"."userId" as sender, "messageType", "message", "answerId"
			FROM "conversation"
				INNER JOIN "message" ON "conversation"."id" = "message"."conversationId"
			WHERE  "conversation"."statusId" = 1
				AND "conversation"."id" = conversation_id
			ORDER BY "message"."sentDate" ASC
	$BODY$
LANGUAGE 'sql';