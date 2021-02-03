const express = require("express");
const LanguageService = require("./language-service");
const { requireAuth } = require("../middleware/jwt-auth");

const languageRouter = express.Router();
const jsonBodyParser = express.json();

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
    const data = await LanguageService.getNextWord(
      req.app.get("db"),
      req.user.id
    );

    const response = {
      language: data.name,
      nextWord: data.original,
      wordCorrectCount: data.correct_count,
      wordIncorrectCount: data.incorrect_count,
      totalScore: data.total_score,
    }

    res.json(response);
    next();

  } catch (error) {
    next(error);
  }
});

languageRouter.post("/guess", jsonBodyParser, async (req, res, next) => {
  const { guess } = req.body;
  const language = req.language;

  if (!guess) {
    return res.status(400).send({
      error: `Missing 'guess' in request body`,
    });
  }

  try {
    const words = await LanguageService.getLanguageWords(
      req.app.get("db"),
      language.id
    );

    const list = await LanguageService.createList(words);

    const previous = list.head.value;
    const next = previous;
    const isCorrect = next.translation === guess;

    if (isCorrect) {
      language.total_score++;
      next.correct_count++;

      const mem_val = next.memory_value * 2;
      next.memory_value = Math.min(mem_val, words.length);
    } else {
      next.incorrect_count++;
      next.memory_value = 1;
    }
    
    list.remove(previous);
    list.insertAt(next.memory_value, next);

    language.head = list.head.value.id;

    await LanguageService.updateDatabase(
      req.app.get("db"),
      language,
      list,
      req.user.id
    );

    const nextWord = await LanguageService.getNextWord(
      req.app.get("db"),
      req.user.id
    );

    const response = {
      nextWord: nextWord.original,
      totalScore: nextWord.total_score,
      wordCorrectCount: nextWord.correct_count,
      wordIncorrectCount: nextWord.incorrect_count,
      answer: previous.translation,
      isCorrect,
    };

    res.json(response);
  } catch (error) {
    next(error);
    console.log(error);
  }
});

module.exports = languageRouter;
