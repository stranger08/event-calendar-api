CREATE TABLE IF NOT EXISTS "People" (
    "id"   SERIAL ,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255),
    "placeOfWork" VARCHAR(255),
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("id")
);