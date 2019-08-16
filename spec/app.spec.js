process.env.NODE_ENV = "test";

const chai = require("chai");
chai.use(require("chai-sorted"));
const { expect } = chai;
const request = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("GET /api", () => {
    it("status:200", () => {
      return request(app)
        .get("/api")
        .expect(200)
    });
  });
  describe("GET /api/topics", () => {
    it("status:200, retrieves all topics in correctly formatted json", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).to.be.an("array");
          expect(body.topics.length).to.eql(3);
          expect(body.topics[0]).to.have.all.keys("slug", "description");
          expect(body.topics[1]).to.eql({
            slug: "cats",
            description: "Not dogs"
          });
        });
    });
  });

  describe("GET /api/users/:username", () => {
    it("status:200, retrieves the user by username", () => {
      return request(app)
        .get("/api/users/icellusedkars")
        .expect(200)
        .then(({ body }) => {
          expect(body.user).to.be.an("object");
          expect(body.user).to.have.all.keys("username", "avatar_url", "name");
          expect(body.user).to.eql({
            username: "icellusedkars",
            avatar_url:
              "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
            name: "sam"
          });
        });
    });
    it("status:404, responds with custom error when username non-existent", () => {
      return request(app)
        .get("/api/users/notAUser")
        .expect(404)
        .then(({ body }) => {
          expect(body).to.eql({ message: "username not found" });
        });
    });
  });

  describe("GET /api/articles/:article_id", () => {
    it("status:200, retrieves the article by article_id", () => {
      return request(app)
        .get("/api/articles/6")

        .expect(200)
        .then(({ body }) => {
          expect(body.article).to.be.an("object");
          expect(body.article).to.have.all.keys(
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "author",
            "created_at",
            "comment_count"
          );
          expect(body.article).to.eql({
            article_id: 6,
            title: "A",
            body: "Delicious tin of cat food",
            votes: 0,
            topic: "mitch",
            author: "icellusedkars",
            created_at: "1998-11-20T12:21:54.171Z",
            comment_count: "1"
          });
        });
    });
    it("status:404, responds with custom error when article_id nonexistent", () => {
      return request(app)
        .get("/api/articles/9999")
        .expect(404)
        .then(body => {
          expect(body.text).to.equal('{"message":"article not found"}');
        });
    });
    it("status:400 when article_id invalid", () => {
      return request(app)
        .get("/api/articles/NotAnInt")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal("bad request");
        });
    });
  });

  describe(" PATCH /api/articles/:article_id", () => {
    it("PATCH status:200, retrieves the article by article_id with votes incremented correctly", () => {
      return request(app)
        .patch("/api/articles/6")
        .send({ inc_votes: 15 })
        .expect(200)
        .then(({ body }) => {
          expect(body.article).to.be.an("object");
          expect(body.article).to.have.all.keys(
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "author",
            "created_at"
          );
          expect(body.article).to.eql({
            article_id: 6,
            title: "A",
            body: "Delicious tin of cat food",
            votes: 15,
            topic: "mitch",
            author: "icellusedkars",
            created_at: "1998-11-20T12:21:54.171Z"
          });
        });
    });

    it("status:404, responds with custom error when article_id nonexistent", () => {
      return request(app)
        .patch("/api/articles/6666")
        .send({ inc_votes: 15 })
        .expect(404)
        .then(({ body }) => {
          expect(body).to.eql({ message: "article not found" });
        });
    });
    it("status:400 when article_id invalid", () => {
      return request(app)
        .patch("/api/articles/NotAnInt")
        .send({ inc_votes: 15 })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal("bad request");
        });
    });
    it("status:400, responds with custom error when request body has invalid key or value", () => {
      return request(app)
        .patch("/api/articles/13")
        .send({ invalid_key: "notAnInt" })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal("malformed/missing request body");
        });
    });
    it("status:400, responds with custom error when request body non-existent", () => {
      return request(app)
        .patch("/api/articles/13")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal("malformed/missing request body");
        });
    });
    it("status:400 when value of inc_votes is not an integer", () => {
      return request(app)
        .patch("/api/articles/13")
        .send({ inc_votes: "notAnInt" })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal("bad request");
        });
    });
  });

  describe("POST /api/articles/:article_id/comments", () => {
    it("status:201, successfully added the supplied comment to database and returns it", () => {
      return request(app)
        .post("/api/articles/6/comments")
        .send({ username: "butter_bridge", body: "this is a test comment" })
        .expect(201)
        .then(({ body }) => {
          expect(body.comment).to.have.all.keys(
            "comment_id",
            "author",
            "article_id",
            "body",
            "votes",
            "created_at"
          );
        });
    });
    it("status:400 when article_id invalid", () => {
      return request(app)
        .post("/api/articles/NotAnInt/comments")
        .send({ username: "butter_bridge", body: "this is a test comment" })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal("bad request");
        });
    });
    it("status:404 when article_id nonexistent", () => {
      return request(app)
        .post("/api/articles/6666/comments")
        .send({ username: "butter_bridge", body: "this is a test comment" })
        .expect(404)
        .then(({ body }) => {
          expect(body).to.eql({ message: "specified resource not found" });
        });
    });
    it("status:400 when request body has missing key", () => {
      return request(app)
        .post("/api/articles/7/comments")
        .send({ body: "this is a stand-alone body" })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal("bad request");
        });
    });
    it("status:400 when request body has invalid key/value", () => {
      return request(app)
        .post("/api/articles/6/comments")
        .send({ nameOfUser: "butter_bridge", body: "this is a test comment" })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal("bad request");
        });
    });
  });

  describe("GET /api/articles/:article_id/comments", () => {
    it("status:200, successfully responds with all the correct comments for specified article, with default order of descending", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .then(({ body }) => {
          expect(body.comments).to.have.length(13);
          expect(body.comments[3]).to.have.all.keys(
            "comment_id",
            "author",
            "body",
            "votes",
            "created_at"
          );
          expect(body.comments).to.be.descendingBy("created_at");
        });
    });
    it("succesfully implements the sort_by and order queries", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=comment_id&order=asc")
        .expect(200)

        .then(({ body }) => {
          expect(body.comments).to.have.length(13);
          expect(body.comments[3]).to.have.all.keys(
            "comment_id",
            "author",
            "body",
            "votes",
            "created_at"
          );
          expect(body.comments).to.be.ascendingBy("comment_id");
        });
    });
    it("status:404, custom error when article_id nonexistent", () => {
      return request(app)
        .get("/api/articles/999/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body).to.eql({ message: "article not found" });
        });
    });
    it("status:400 when article_id invalid", () => {
      return request(app)
        .get("/api/articles/NotAnInt/comments")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal("bad request");
        });
    });
    it("status:400 when when sort_by set to non-existent column", () => {
      return request(app)
        .get("/api/articles/5/comments?sort_by=notAColumn&order=asc")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal("bad request");
        });
    });
  });

  describe("GET /api/articles", () => {
    it("status:200, successfully responds with all articles", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.have.length(12);
          expect(body.articles[2]).to.have.all.keys(
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "author",
            "created_at",
            "comment_count"
          );
          expect(body.articles[11]).to.eql({
            article_id: 12,
            title: "Moustache",
            body: "Have you seen the size of that thing?",
            votes: 0,
            topic: "mitch",
            author: "butter_bridge",
            created_at: "1974-11-26T12:21:54.171Z",
            comment_count: "1"
          });
        });
    });

    it("successfully sorts and orders by if given the corresponding queries", () => {
      return request(app)
        .get("/api/articles?sort_by=title&order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.have.length(12);
          expect(body.articles[2]).to.have.all.keys(
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "author",
            "created_at",
            "comment_count"
          );
          expect(body.articles).to.be.ascendingBy("title");
        });
    });

    it("successfully filters the results if given the corresponding queries", () => {
      return request(app)
        .get("/api/articles?sort_by=title&order=asc&author=rogersop&topic=cats")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.have.length(1);
          expect(body.articles[0]).to.have.all.keys(
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "author",
            "created_at",
            "comment_count"
          );
          expect(body.articles).to.be.ascendingBy("title");
          expect(body.articles[0].topic).to.equal("cats");
          expect(body.articles[0].author).to.equal("rogersop");
        });
    });
    it("status:400 when when sort_by set to non-existent column", () => {
      return request(app)
        .get("/api/articles?sort_by=notAColumn&order=asc")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal("bad request");
        });
    });
    it("status:404 when when author set to non-existent author", () => {
      return request(app)
        .get("/api/articles?author=iDontWrite&order=asc")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).to.equal("specified articles not found");
        });
    });
    it("status:404 when when topic set to non-existent topic", () => {
      return request(app)
        .get("/api/articles?topic=iAmNotWrittenAbout&order=asc")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).to.equal("specified articles not found");
        });
    });
  });

  describe("PATCH /api/comments/:comment_id", () => {
    it("status:200, succesfully updates specified comment votes and responds with updated comment", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: 10 })
        .expect(200)

        .then(({ body }) => {
          expect(body.comment.votes).to.equal(26);
        });
    });
    it("status:404, custom error when article_id nonexistent", () => {
      return request(app)
        .patch("/api/comments/711")
        .send({ inc_votes: 10 })
        .expect(404)
        .then(({ body }) => {
          expect(body).to.eql({ message: "comment not found" });
        });
    });
    it("status:400 when article_id invalid", () => {
      return request(app)
        .patch("/api/comments/notAnInt")
        .send({ inc_votes: 10 })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal("bad request");
        });
    });
    it("status:400, responds with custom error when request body has invalid key or value", () => {
      return request(app)
        .patch("/api/comments/10")
        .send({ invalid_key: "notAnInt" })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal("malformed/missing request body");
        });
    });
    it("status:400, responds with custom error when request body non-existent", () => {
      return request(app)
        .patch("/api/comments/2")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal("malformed/missing request body");
        });
    });
    it("status:400 when value of inc_votes is not an integer", () => {
      return request(app)
        .patch("/api/comments/3")
        .send({ inc_votes: "notAnInt" })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal("bad request");
        });
    });
  });

  describe("DELETE /api/comments/:comment_id", () => {
    it("status:204, responds with no content", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(204);
    });
    it("status:404, custom error when comment_id nonexistent", () => {
      return request(app)
        .delete("/api/comments/808")
        .expect(404)
        .then(({ body }) => {
          expect(body).to.eql({ message: "comment not found" });
        });
    });
    it("status:400 when comment_id invalid", () => {
      return request(app)
        .delete("/api/comments/notAnInt")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.equal("bad request");
        });
    });
  });
});
