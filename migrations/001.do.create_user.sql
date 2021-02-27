CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "name" TEXT NOT NULL
);

CREATE TABLE "language" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "total_score" SMALLINT DEFAULT 0,
  "user_id" INTEGER REFERENCES "user"(id)
    ON DELETE CASCADE NOT NULL
);

CREATE TABLE "word" (
  "id" SERIAL PRIMARY KEY,
  "original" TEXT NOT NULL,
  "translation" TEXT NOT NULL,
  "memory_value" SMALLINT DEFAULT 1,
  "correct_count" SMALLINT DEFAULT 0,
  "incorrect_count" SMALLINT DEFAULT 0,
  "language_id" INTEGER REFERENCES "language"(id)
    ON DELETE CASCADE NOT NULL,
  "next" INTEGER REFERENCES "word"(id)
    ON DELETE SET NULL
);

ALTER TABLE "language"
  ADD COLUMN "head" INTEGER REFERENCES "word"(id)
    ON DELETE SET NULL;
