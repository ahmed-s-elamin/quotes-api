const express = require("express");
const router = express.Router();
const Quote = require("../models/quote");

//getting all quotes
router.get("/", async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.send(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// getting specific quote
router.get("/:id", getQ, async (req, res) => {
  res.json(res.quote);
});

//creating a quote
router.post("/", async (req, res) => {
  const quote = new Quote({
    content: req.body.content,
    author: req.body.author,
  });

  try {
    const newQuote = await quote.save();
    res.status(201).json(quote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//updating a quote
router.patch("/:id", getQ, async (req, res) => {
  if (req.body.content != null) {
    res.quote.content = req.body.content;
  }
  if (req.body.author != null) {
    res.quote.author = req.body.author;
  }
  try {
    const updatedQuote = await res.quote.save();
    res.json(updatedQuote);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

//deleting a quote
router.delete("/:id", getQ, async (req, res) => {
  try {
    await res.quote.remove();
    res.json({ message: "quote deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//a middleware
async function getQ(req, res, next) {
  let quote;
  try {
    quote = await Quote.findById(req.params.id);
    if (quote == null) {
      return res.status(404).json({ message: "Quote not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.quote = quote; //for easier calling inside other requests

  next();
}

module.exports = router;
