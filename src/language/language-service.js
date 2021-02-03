const DatabaseService = {
  getUsersLanguage(db, user_id) {
    return db
      .from("language")
      .select(
        "language.id",
        "language.name",
        "language.user_id",
        "language.head",
        "language.total_score"
      )
      .where("language.user_id", user_id)
      .first();
  },

  getLanguageWords(db, language_id) {
    return db
      .from("word")
      .select(
        "id",
        "language_id",
        "original",
        "translation",
        "next",
        "memory_value",
        "correct_count",
        "incorrect_count"
      )
      .where({ language_id });
  },

  updateLanguage(db, id, values) {
    return db("language").update(values).where("id", id);
  },

  updateWord(db, id, values) {
    return db("word").update(values).where("id", id);
  },
};

const ListService = {
  populateList(db) {
    return 
  };
};

const LanguageService = { DatabaseService, ListService };

module.exports = LanguageService;
