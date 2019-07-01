const { formatComments, formatArticles } = require("../utils/format-data");
const chai = require("chai");
const { expect } = chai;
const { formattedArticles, rawArticles, comments } = require("./utilsTestData");

describe("formatComments", () => {
  it("does not mutate the original array", () => {
    let originalArray = [...comments];
    let newFormattedComments = formatComments(originalArray, formattedArticles);
    expect(comments).to.eql(originalArray);
  });
  it("successfully formats a single comment", () => {
    let comments2 = [
      {
        body: "The owls are not what they seem.",
        belongs_to:
          "What does Jose Mourinho's handwriting say about his personality?",
        created_by: "icellusedkars",
        votes: 20,
        created_at: 1006778163389
      }
    ];

    let articles2 = [
      {
        article_id: 2,
        title:
          "What does Jose Mourinho's handwriting say about his personality?",
        body: "Jose Mourinho was at The O2 on Sunday night",
        votes: 0,
        topic: "football",
        author: "weegembump",
        created_at: "2018-04-16T19:29:32.774Z",
        comment_count: "6"
      }
    ];
    let expected = [
      {
        body: "The owls are not what they seem.",
        votes: 20,
        created_at: new Date(1006778163389),
        article_id: 2,
        author: "icellusedkars"
      }
    ];
    let actual = formatComments(comments2, articles2);
    expect(actual).to.eql(expected);
  });
  it("successfully formats multiple comments", () => {
    let expected = [
      {
        body:
          "What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.",
        votes: 16,
        created_at: new Date(1101386163389),
        article_id: 1,
        author: "icellusedkars"
      },
      {
        body: "I am 100% sure that we're not completely sure.",
        votes: 1,
        created_at: new Date(1069850163389),
        article_id: 1,
        author: "butter_bridge"
      },
      {
        body: "This is a bad article name",
        votes: 1,
        created_at: new Date(1038314163389),
        article_id: 2,
        author: "butter_bridge"
      },
      {
        body: "The owls are not what they seem.",
        votes: 20,
        created_at: new Date(1006778163389),
        article_id: 2,
        author: "icellusedkars"
      }
    ];
    let actual = formatComments(comments, formattedArticles);
    expect(actual).to.eql(expected);
  });
});

describe.only("formatArticles", () => {
  it("does not mutate the original array", () => {
    let originalArray = rawArticles;
    let newFormattedArticles = formatArticles(originalArray);
    expect(originalArray).to.equal(rawArticles);
  });
  it("successfully formats 1 article", () => {
    let rawArticle = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];

    let expected = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: new Date(1542284514171),
        votes: 100
      }
    ];
    let actual = formatArticles(rawArticle);

    expect(expected).to.eql(actual);
  });

  it("successfully formats multiple articles", () => {
    let expected = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: new Date(1542284514171),
        votes: 100
        
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: new Date(1289996514171),
        
      },
      {
        title: "UNCOVERED: catspiracy to bring down democracy",
        topic: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: new Date(1037708514171),
        
      }
    ];

    let actual = formatArticles(rawArticles);
    expect(actual).to.eql(expected);
  });
});
