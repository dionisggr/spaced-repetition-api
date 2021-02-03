const express = require("express");
const bodyParser = express.json();
const LanguageService = require("./language-service");
const LinkedList = require("./words-linked-list");
const { requireAuth } = require("../middleware/jwt-auth");

const languageRouter = express.Router();

languageRouter.use(requireAuth).use(async (req, res, next) => {
  try {
    const language = await LanguageService.getUsersLanguage(
      req.app.get("db"),
      req.user.id
    );

    if (!language)
      return res.status(404).json({
        error: `You don't have any languages`,
      });

    req.language = language;
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get("/", async (req, res, next) => {
  try {
    const words = await LanguageService.getLanguageWords(
      req.app.get("db"),
      req.language.id
    );
    res.json({
      language: req.language,
      words,
    });
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get("/head", async (req, res, next) => {
  try {
    const language = req.language;
    const words = await LanguageService.getLanguageWords(
      req.app.get("db"),
      language.id
    );

    const wordsLinkedList = new LinkedList();
    words.forEach((word) => wordsLinkedList.insert(word));

    const head = wordsLinkedList.show();
    const nextWord = {
      nextWord: head.original,
      totalScore: language.total_score,
      wordCorrectCount: head.correct_count,
      wordIncorrectCount: head.incorrect_count,
    };

    return res.json(nextWord);
  } catch (error) {
    next(error);
  }
});

languageRouter.post("/guess", bodyParser, async (req, res, next) => {
  try {
    const { guess } = req.body;
    const language = req.language;
    const words = await LanguageService.getLanguageWords(
      req.app.get("db"),
      language.id
    );

    if (!guess) {
      return res.status(400).send({ error: "Missing 'guess' in request body" });
    }

    const wordsLinkedList = new LinkedList();
    words.forEach((word) => wordsLinkedList.insert(word));

    const headID = language.head;
    const head = await wordsLinkedList.findByID(headID);

    const nextID = head.next;
    const nextWord = await wordsLinkedList.findByID(nextID);

    const isCorrect = guess === "correct";

    const feedback = {
      nextWord: nextWord.original,
      totalScore: language.total_score,
      wordCorrectCount: head.correct_count,
      wordIncorrectCount: head.incorrect_count,
      answer: head.translation,
      isCorrect,
    };

    let languageUpdate;
    let wordUpdate;

    if (isCorrect) {
      languageUpdate = {
        head: headID * 2,
        total_score: language.total_score + 1
      };
      wordUpdate = {
        correct_count: head.correct_count + 1,
      };
    } else {
      languageUpdate = { head: 1 };
      wordUpdate = {
        correct_count: head.correct_count + 1,
      };
    }

    LanguageService.updateLanguage(
      req.app.get("db"),
      language.id,
      languageUpdate
    );

    LanguageService.updateWord(
      req.app.get("db"),
      headID,
      wordUpdate
    );

    return res.json(feedback);
  } catch (error) {
    next(error);
  }
});

module.exports = languageRouter;
