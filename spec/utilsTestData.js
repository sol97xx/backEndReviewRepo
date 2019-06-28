const formattedArticles = [{
    "article_id": 1,
    "title": "Seafood substitutions are increasing",
    "body": "fisha’s study suggests that the phenomenon is spreading.",
    "votes": 0,
    "topic": "cooking",
    "author": "weegembump",
    "created_at": "2018-05-30T15:59:13.341Z",
    "comment_count": "6"},{
        "article_id": 2,
        "title": "What does Jose Mourinho's handwriting say about his personality?",
        "body": "Jose Mourinho was at The O2 on Sunday night",
        "votes": 0,
        "topic": "football",
        "author": "weegembump",
        "created_at": "2018-04-16T19:29:32.774Z",
        "comment_count": "6"
      }]
const rawArticles = [{
    title: 'Living in the shadow of a great man',
    topic: 'mitch',
    author: 'butter_bridge',
    body: 'I find this existence challenging',
    created_at: 1542284514171,
    votes: 100,
  }, {
    title: 'Eight pug gifs that remind me of mitch',
    topic: 'mitch',
    author: 'icellusedkars',
    body: 'some gifs',
    created_at: 1289996514171,
  },{
    title: 'UNCOVERED: catspiracy to bring down democracy',
    topic: 'cats',
    author: 'rogersop',
    body: 'Bastet walks amongst us, and the cats are taking arms!',
    created_at: 1037708514171,
  }]

  const comments = [{
    body:
      'What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.',
    belongs_to: 'Seafood substitutions are increasing',
    created_by: 'icellusedkars',
    votes: 16,
    created_at: 1101386163389,
  },
  {
    body: "I am 100% sure that we're not completely sure.",
    belongs_to: 'Seafood substitutions are increasing',
    created_by: 'butter_bridge',
    votes: 1,
    created_at: 1069850163389,
  },
  {
    body: 'This is a bad article name',
    belongs_to: "What does Jose Mourinho's handwriting say about his personality?",
    created_by: 'butter_bridge',
    votes: 1,
    created_at: 1038314163389,
  },
  {
    body: 'The owls are not what they seem.',
    belongs_to: "What does Jose Mourinho's handwriting say about his personality?",
    created_by: 'icellusedkars',
    votes: 20,
    created_at: 1006778163389,
  }]


  module.exports = {formattedArticles, rawArticles, comments}