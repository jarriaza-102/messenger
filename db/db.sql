CREATE TABLE "role" (
 id SERIAL PRIMARY KEY,
 "role" VARCHAR(100) NOT NULL
);

CREATE TABLE "user" (
 id serial primary key,
 email VARCHAR(250) NOT NULL,
 full_name VARCHAR(250) NOT NULL,
 "password" VARCHAR(250) NOT NULL,
 photo VARCHAR(100) NOT NULL,
 "role" INT NOT NULL,
 FOREIGN KEY("role") REFERENCES "role"(id)
);

CREATE TABLE "key" (
 "key" VARCHAR(200) PRIMARY KEY
);

CREATE TABLE "user_keys" ( 
 "key" VARCHAR(200) NOT NULL,
 user_id INT NOT NULL,
 "value" TEXT NOT NULL,
 PRIMARY KEY("key", user_id),
 FOREIGN KEY (user_id) REFERENCES "user"(id),
 FOREIGN KEY ("key") REFERENCES "key"("key")
);

CREATE TABLE "token" (
 id SERIAL PRIMARY KEY,
 token VARCHAR(255) UNIQUE NOT NULL,
 user_id INT NOT NULL,
 FOREIGN KEY (user_id) REFERENCES "user"(id)
);

CREATE TABLE "conversation_type" (
 id SERIAL PRIMARY KEY,
 "type" VARCHAR(255) NOT NULL
);

CREATE TABLE "status" (
 id SERIAL PRIMARY KEY,
 status VARCHAR(100) NOT NULL
);

CREATE TABLE "conversation" (
 id SERIAL PRIMARY KEY,
 "name" VARCHAR(300) NOT NULL,
 "owner" INT NOT NULL,
 creation_date timestamp NOT NULL,
 conversation_type INT NOT NULL,
 status_id INT NOT NULL,
 FOREIGN KEY (conversation_type) REFERENCES "conversation_type"(id),
 FOREIGN KEY (status_id) REFERENCES "status"(id)
);

CREATE TABLE "conversation_users" (
 conversation_id INT NOT NULL,
 user_id INT NOT NULL,
 "name" VARCHAR(300) NOT NULL,
 creation_date timestamp NOT NULL,
 status INT NOT NULL,
 PRIMARY KEY(conversation_id, user_id),
 FOREIGN KEY (conversation_id) REFERENCES conversation(id),
 FOREIGN KEY (user_id) REFERENCES "user"(id),
 FOREIGN KEY (status) REFERENCES status(id)
);

CREATE TABLE "message_type" (
 id SERIAL PRIMARY KEY,
 "type" VARCHAR(50) NOT NULL
);

CREATE TABLE "message" (
 id SERIAL PRIMARY KEY,
 user_id INT NOT NULL,
 conversation_id INT NOT NULL,
 message TEXT NOT NULL,
 message_type INT NOT NULL,
 answer_id INT NOT NULL,
 FOREIGN KEY (conversation_id) REFERENCES conversation(id),
 FOREIGN KEY (user_id) REFERENCES "user"(id),
 FOREIGN KEY (message_type) REFERENCES message_type(id),
 FOREIGN KEY (answer_id) REFERENCES "message"(id)
);

CREATE TABLE "message_seen" (
 id SERIAL PRIMARY KEY,
 message_id INT NOT NULL,
 user_id INT NOT NULL,
 FOREIGN KEY (message_id) REFERENCES "message"(id),
 FOREIGN KEY (user_id) REFERENCES "user"(id)
);

CREATE TABLE "system_notification" (
 id SERIAL PRIMARY KEY,
 notification TEXT NOT NULL,
 "action" TEXT NOT NULL,
 created_date timestamp NOT NULL
);

CREATE TABLE "system_notification_users" (
 system_notification_id INT NOT NULL,
 user_id INT NOT NULL,
 seen bit NOT NULL,
 PRIMARY KEY(system_notification_id, user_id ),
 FOREIGN KEY(system_notification_id) REFERENCES system_notification(id),
 FOREIGN KEY(user_id) REFERENCES "user"(id)
);

/* POPULATE DATA */
INSERT INTO "role"("role") VALUES('Administrator');
INSERT INTO "role"("role") VALUES('Pedas Administrator');
INSERT INTO "role"("role") VALUES('Conversations Administrator');
INSERT INTO "role"("role") VALUES('User');

INSERT INTO "key" ("key") VALUES('USER_DESCRIPTION');
INSERT INTO "key" ("key") VALUES('USER_PEDAS_REQUESTED');
INSERT INTO "key" ("key") VALUES('USER_PEDAS_RECEIVED');
INSERT INTO "key" ("key") VALUES('USER_IS_ACTIVE');

INSERT INTO "conversation_type" ("type") VALUES('Public');
INSERT INTO "conversation_type" ("type") VALUES('Private');
INSERT INTO "conversation_type" ("type") VALUES('Secret');

INSERT INTO "status" (status) VALUES('Active');
INSERT INTO "status" (status) VALUES('Inactive');
INSERT INTO "status" (status) VALUES('Destroyed');

INSERT INTO "message_type" ("type") VALUES('Text');
INSERT INTO "message_type" ("type") VALUES('Image');
INSERT INTO "message_type" ("type") VALUES('Video');
INSERT INTO "message_type" ("type") VALUES('Audio');
INSERT INTO "message_type" ("type") VALUES('File');