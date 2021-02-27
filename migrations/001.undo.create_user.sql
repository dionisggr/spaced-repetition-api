ALTER TABLE "language"
  DROP COLUMN IF EXISTS "head";

DROP TABLE "word", "language", "user";
