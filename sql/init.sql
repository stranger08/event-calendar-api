CREATE TABLE IF NOT EXISTS "People" (
    "id"   SERIAL ,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255),
    "placeOfWork" VARCHAR(255),
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("id")
);

INSERT INTO public."People"(
	"firstName", "lastName", "placeOfWork", "createdAt", "updatedAt")
	VALUES
		('Andreas', 'Fowler', 'andy@gmail.com', now(), now()),
		('Molly', 'Thompson', 'molyy.thompson@email.com', now(), now()),
		('Kaylem', 'Sharp', 'kayle@yahoo.com', now(), now()),
		('test3', 'test3', 'test3@email.com', now(), now()),
		('Campbell', 'Edmonds', 'c.edmonds@gamil.com', now(), now());