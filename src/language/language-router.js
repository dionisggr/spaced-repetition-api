const express = require("express");
const LanguageService = require("./language-service");
const { requireAuth } = require("../middleware/jwt-auth");

const languageRouter = express.Router();
const jsonBodyParser = express.json();
const list = require('./linked-list');

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

    let words;
    if (!list.head) {
      words = await LanguageService.getLanguageWords(
        req.app.get("db"),
        language.id
      );
      words.forEach(word => {
        list.insertLast(word);
      });
    };

    req.language = language;
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get("/", async (req, res, next) => {
  try {
    const language = req.language;
    const words = await LanguageService.getLanguageWords(
      req.app.get("db"),
      req.language.id
    );

    res.json({
      language,
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
    const head = list.head;
    const response = {
      // language, // REMOVE
      nextWord: head.value.original,
      wordCorrectCount: head.value.correct_count,
      wordIncorrectCount: head.value.incorrect_count,
      totalScore: language.total_score,
    }

    return res.json(response);
  } catch (error) {
    next(error);
  }
});

languageRouter.post("/guess", jsonBodyParser, async (req, res, next) => {
  const { guess } = req.body;
  const language = req.language;
  const words = await LanguageService.getLanguageWords(
    req.app.get("db"),
    language.id
  );

  if (!guess) {
    return res.status(400).send({
      error: `Missing 'guess' in request body`,
    });
  }

  try {
    const head = list.head.value;
    const previous = { ...head };
    const isCorrect = guess === head.translation;

    if (isCorrect) {
      language.total_score++;
      head.correct_count++;

      const mem_val = head.memory_value * 2;
      head.memory_value = Math.min(mem_val, words.length-1);
    } else {
      head.incorrect_count++;
      head.memory_value = 1;
    }
    
    list.insertAt(head.memory_value, head);
    list.remove(head);

    const newHead = list.head.value;
    language.head = newHead.id;

    await LanguageService.updateDatabase(
      req.app.get("db"),
      language,
      head,
      req.user.id
    );

    const response = {
      nextWord: newHead.original,
      totalScore: language.total_score,
      wordCorrectCount: previous.correct_count,
      wordIncorrectCount: previous.incorrect_count,
      answer: previous.translation,
      isCorrect,
    };

    return res.json(response);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

module.exports = languageRouter;
