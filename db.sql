
CREATE TABLE "users" (
 id SERIAL primary key,
 email varchar(150) not null,
 full_name varchar(150) not null,
 password varchar(150) not null
);


CREATE TABLE token (
 token varchar(255) primary key,
 user_id int not null,
 foreign key (user_id) references users(id)
);

CREATE TABLE conversation ( 
 id SERIAL primary key,
 user_id_1 int not null,
 user_id_2 int not null,
 creation_date timestamp not null,
 foreign key (user_id_1) references users(id),
 foreign key (user_id_2) references users(id)
);

CREATE TABLE message ( 
 id SERIAL primary key,
 conversation_id int not null,
 "from" int not null,
 "to" int not null,
 message text not null,
 status int not null,
 sent_on timestamp not null,
 foreign key (conversation_id ) references conversation(id),
 foreign key ("from") references users(id),
 foreign key ("to") references users(id)
);