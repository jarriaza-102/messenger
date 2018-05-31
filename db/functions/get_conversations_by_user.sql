CREATE OR REPLACE FUNCTION get_conversations_by_user(user_id_ INT) 
    RETURNS table 
	(id INT , "owner" INT, conversationType INT, "name" VARCHAR,message VARCHAR, sender VARCHAR, senderid INT, sendto INT, photo VARCHAR) 
    AS
    $BODY$
	SELECT "conversation"."id" , "conversation"."owner", "conversation"."conversationType", "conversation"."name",
		(SELECT message FROM "message" WHERE "conversationId" = "conversation"."id" ORDER BY id DESC LIMIT 1) as "message",

		CASE (SELECT "user"."id" FROM "message" 
			INNER JOIN "user" ON "message"."userId" = "user"."id"
			WHERE "conversationId" = "conversation"."id"
			ORDER BY "message"."id" DESC LIMIT 1)
			
		WHEN user_id_ 
			THEN 
				(SELECT "user"."fullName" FROM "conversation" as "conv"
					INNER JOIN "user" ON "conv"."owner" = "user"."id"
						OR "conv"."slave" = "user"."id"
					WHERE "conv"."id" = "conversation"."id"
						AND "user"."id" != user_id_
				)
		WHEN (SELECT "user"."id" FROM "conversation" as "conv"
			INNER JOIN "user" ON "conv"."owner" = "user"."id"
				OR "conv"."slave" = "user"."id"
			WHERE "conv"."id" = "conversation"."id"
				AND "user"."id" != user_id_
			) 
			THEN 
				(SELECT "user"."fullName" FROM "message" 
					INNER JOIN "user" ON "message"."userId" = "user"."id"
					WHERE "conversationId" = "conversation"."id"
					ORDER BY "message"."id" DESC LIMIT 1) 
		END as "sender",
			
		(SELECT "user"."id" FROM "message" 
			INNER JOIN "user" ON "message"."userId" = "user"."id"
			WHERE "conversationId" = "conversation"."id"
			ORDER BY "message"."id" DESC LIMIT 1) as "senderid",

		CASE (SELECT "user"."id" FROM "message" 
			INNER JOIN "user" ON "message"."userId" = "user"."id"
			WHERE "conversationId" = "conversation"."id"
			ORDER BY "message"."id" DESC LIMIT 1)
			
		WHEN user_id_ 
			THEN 
				(SELECT "user"."id" FROM "conversation" as "conv"
					INNER JOIN "user" ON "conv"."owner" = "user"."id"
						OR "conv"."slave" = "user"."id"
					WHERE "conv"."id" = "conversation"."id"
						AND "user"."id" != user_id_
				)
		WHEN (SELECT "user"."id" FROM "conversation" as "conv"
			INNER JOIN "user" ON "conv"."owner" = "user"."id"
				OR "conv"."slave" = "user"."id"
			WHERE "conv"."id" = "conversation"."id"
				AND "user"."id" != user_id_
			) 
			THEN 
				(SELECT "user"."id" FROM "message" 
					INNER JOIN "user" ON "message"."userId" = "user"."id"
					WHERE "conversationId" = "conversation"."id"
					ORDER BY "message"."id" DESC LIMIT 1) 
		END as "sendto",

		(SELECT "user"."photo" FROM "message" 
			INNER JOIN "user" ON "message"."userId" = "user"."id"
			WHERE "conversationId" = "conversation"."id"
			AND "user"."id" != user_id_
			ORDER BY "message"."id" DESC LIMIT 1) as "photo"
			
		FROM "conversation" 
		INNER JOIN "conversation_users" ON "conversation"."id" = "conversation_users"."conversation_id"	
		INNER JOIN "user" ON "conversation_users"."user_id" = "user"."id"	
		WHERE "conversation_users"."user_id" = user_id_;
    $BODY$
   LANGUAGE 'sql';

   --DROP FUNCTION get_conversations_by_user(integer) 