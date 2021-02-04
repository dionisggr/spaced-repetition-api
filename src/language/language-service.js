const LinkedList = require("./linked-list");

const LanguageService = {
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
        "word.id",
        "language_id",
        "original",
        "translation",
        "next",
        "memory_value",
        "correct_count",
        "incorrect_count",
        "language.head"
      )
      .join("language", "language.id", "=", "word.language_id")
      .where({ language_id });
  },
  getNextWord(db, user_id) {
    return db
      .from("language")
      .select(
        "language.head",
        "word.correct_count",
        "word.incorrect_count",
        "language.total_score",
        "word.original",
        "word.translation"
      )
      .where("language.user_id", user_id)
      .first()
      .leftJoin("word", "language.head", "word.id");
  },

  getHeadWord(db, head_id) {
    return db.from("word")
      .select("*")
      .where("id", head_id);
  },
  createList(words) {
    const wordsLinkedList = new LinkedList();

    const current = words.find((word) => word.id === word.head);
    wordsLinkedList.insertFirst(current);
    let nextWord = words.find((word) => {
      return word.id === current.next;
    });

    while (nextWord) {
      wordsLinkedList.insertLast(nextWord);
      nextWord = words.find((word) => {
        return word.id === nextWord.next;
      });
    }
    return wordsLinkedList;
  },

  async updateDatabase(db, language, word, user_id) {
    try {
    const wordUpdate = await db("word")
      .where({ id: word.id })
      .update({
        next: word.next.id,
        correct_count: word.correct_count,
        incorrect_count: word.incorrect_count,
        memory_value: word.memory_value,
      });

    const languageUpdate = await db("language")
      .where({ user_id })
      .update({
        head: language.head,
        total_score: language.total_score,
      });

    } catch (e) {
      console.log(e);
    }
  },

  displayList(list) {
    let currNode = list.head;
    while (currNode !== null) {
      console.log(currNode.value.original)
      currNode = currNode.next;
    }
  },
};

module.exports = LanguageService;
