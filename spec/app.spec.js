process.env.NODE_ENV = 'test';

const chai = require('chai')
chai.use(require('chai-sorted'));
const { expect } = chai;
const request = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

describe('/', () => {
  beforeEach(() => connection.seed.run())
  after(() => connection.destroy());

  describe('/api', () => {
    it('GET status:200', () => {
      return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
  });
  describe('/api/topics', () => {
  it('GET status:200, retrieves all topics in correctly formatted json', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          expect(body.topics).to.be.an('array');
          expect(body.topics.length).to.eql(3);
          expect(body.topics[0]).to.have.all.keys('slug','description')
          expect(body.topics[1]).to.eql({ slug: 'cats', description: 'Not dogs' })
        });
    });
  })
  
    describe('/api/users/:username', () => {
      it('GET status:200, retrieves the user by username', () => {
          return request(app).get('/api/users/icellusedkars')
            .expect(200)
            .then(({ body }) => {
              expect(body.user).to.be.an('array');
              
              expect(body.user.length).to.eql(1);
              expect(body.user[0]).to.have.all.keys('username','avatar_url','name')
              expect(body.user[0]).to.eql({ username: 'icellusedkars',
              avatar_url:'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4',name: 'sam' } )
    
            });
        });
      it('GET status:404, responds with custom error when username invalid/nonexistent', () => {
          return request(app).get('/api/users/notAUser')
            .expect(404)
            .then(( body ) => {
             expect(body.text).to.equal("username not found")
            });
        })
      })

  describe('/api/articles/:article_id', () => {
    it('GET status:200, retrieves the article by article_id', () => {
        return request(app).get('/api/articles/6')
          
          .expect(200)
          .then(({ body }) => {
            expect(body.Article).to.be.an('array');
            
            expect(body.Article.length).to.eql(1);
            expect(body.Article[0]).to.have.all.keys('article_id','title','body','votes',
            'topic','author','created_at','comment_count')
            expect(body.Article[0]).to.eql({ article_id: 6,
              title: 'A',
              body: 'Delicious tin of cat food',
              votes: 0,
              topic: 'mitch',
              author: 'icellusedkars',
              created_at: '1998-11-20T12:21:54.171Z',
              comment_count: '1' } )
  
          });
      });
    it('GET status:404, responds with custom error when article_id nonexistent', () => {
          return request(app).get('/api/articles/9999')
            .expect(404)
            .then(( body ) => {
             expect(body.text).to.equal("username not found")
            });
        })
    })

  describe(' PATCH /api/articles/:article_id', () => {
  it('GET status:200, retrieves the article by article_id with votes incremented correctly', () => {
    return request(app).patch('/api/articles/6')
      .send({ "inc_votes" : 15 })
      .expect(200)
      .then(({ body }) => {
        expect(body.Article).to.be.an('array');
        expect(body.Article.length).to.eql(1);
        expect(body.Article[0]).to.have.all.keys('article_id','title','body','votes',
        'topic','author','created_at')
        expect(body.Article[0]).to.eql({ article_id: 6,
          title: 'A',
          body: 'Delicious tin of cat food',
          votes: 15,
          topic: 'mitch',
          author: 'icellusedkars',
          created_at: '1998-11-20T12:21:54.171Z'} )

      });
  });
  })

describe('POST /api/articles/:article_id/comments', () => {
    it('status:201, successfully added the supplied comment to database and returns it', () => {
        return request(app).post('/api/articles/6/comments')
        .send({"username":"butter_bridge","body":"this is a test comment"}).expect(201)
        .then((data)=>{
        expect(data.body.comment[0]).to.have.all.keys(
        'comment_id','author','article_id','body','votes','created_at'
        )
        })
        });
    })

    describe('GET /api/articles/:article_id/comments', () => {
      it('status:200, successfully responds with all the correct comments for specified article', () => {
          return request(app).get('/api/articles/1/comments')

          .then((data)=>{
          expect(data.body.comments).to.have.length(13)
          expect(data.body.comments[3]).to.have.all.keys('comment_id','author','article_id',
          'body','votes','created_at')
          expect(data.body.comments[4].article_id).to.equal(1)
          
          })
          });
      })
  
      describe('GET /api/articles/:article_id/comments', () => {
        it('status:200, successfully responds with all the correct comments for specified article', () => {
            return request(app).get('/api/articles/1/comments').expect(200)
  
            .then((data)=>{
            expect(data.body.comments).to.have.length(13)
            expect(data.body.comments[3]).to.have.all.keys('comment_id','author','article_id',
            'body','votes','created_at')
            expect(data.body.comments[4].article_id).to.equal(1)
            
            })
            });
      it('succesfully implements the sort_by and order', () => {
            return request(app).get('/api/articles/1/comments?sort_by=comment_id&order=asc').expect(200)
  
            .then((data)=>{
            expect(data.body.comments).to.have.length(13)
            expect(data.body.comments[3]).to.have.all.keys('comment_id','author','article_id',
            'body','votes','created_at')
            expect(data.body.comments[4].article_id).to.equal(1)
            expect(data.body.comments).to.be.ascendingBy('comment_id')
            
            })
            })
        })

    describe('GET /api/articles', () => {
        it('status:200, successfully responds with all articles', () => {
        return request(app).get('/api/articles').expect(200)
        .then((data)=>{console.log(data.body)
        expect(data.body.articles).to.have.length(12)  
        expect(data.body.articles[2]).to.have.all.keys('article_id','title','body','votes','topic',
        'author','created_at')
        })
            });
        
        it('successfully sorts and orders by if given the corresponding queries', () => {
        return request(app).get('/api/articles?sort_by=title&order=asc').expect(200)
        .then((data)=>{console.log(data.body)
        expect(data.body.articles).to.have.length(12)  
        expect(data.body.articles[2]).to.have.all.keys('article_id','title','body','votes','topic',
        'author','created_at')
        expect(data.body.articles).to.be.ascendingBy('title')
        })
            });
        
        it('successfully filters the results if given the corresponding queries', () => {
        return request(app).get('/api/articles?sort_by=title&order=asc&author=rogersop&topic=cats').expect(200)
        .then((data)=>{console.log(data.body)
        expect(data.body.articles).to.have.length(1)  
        expect(data.body.articles[0]).to.have.all.keys('article_id','title','body','votes','topic',
        'author','created_at')
        expect(data.body.articles).to.be.ascendingBy('title')
        expect(data.body.articles[0].topic).to.equal('cats')
        expect(data.body.articles[0].author).to.equal('rogersop')
        })
            });
      
        })

    describe('PATCH /api/comments/:comment_id', () => {
      it('status:200, succesfully updates specified comment votes and responds with updated comment', () => {
          return request(app).patch('/api/comments/1').send({ "inc_votes": 10 }).expect(200)

          .then((data)=>{
          expect(data.body.comment).to.have.length(1)
          expect(data.body.comment[0].votes).to.equal(26)
          
          
          })
          });
      })

  describe('DELETE /api/comments/:comment_id', () => {
      it('status:204, responds with no content', () => {
          return request(app).delete('/api/comments/1').expect(204)

          });
      })
}).timeout(5000)

