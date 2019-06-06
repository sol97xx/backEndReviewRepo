process.env.NODE_ENV = 'test';

const { expect } = require('chai');
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
              console.log(body)
              expect(body.user.length).to.eql(1);
              expect(body.user[0]).to.have.all.keys('username','avatar_url','name')
              expect(body.user[0]).to.eql({ username: 'icellusedkars',
              avatar_url:'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4',name: 'sam' } )
    
            });
        });
      })

  describe('/api/articles/:article_id', () => {
    it('GET status:200, retrieves the article by article_id', () => {
        return request(app).get('/api/articles/6')
          .send({ "inc_votes" : 15 })
          .expect(200)
          .then(({ body }) => {
            expect(body.Article).to.be.an('array');
            console.log(body)
            expect(body.Article.length).to.eql(1);
            expect(body.Article[0]).to.have.all.keys('article_id','title','body','votes',
            'topic','author','created_at','comment_count')
            expect(body.Article[0]).to.eql({ article_id: 6,
              title: 'A',
              body: 'Delicious tin of cat food',
              votes: 15,
              topic: 'mitch',
              author: 'icellusedkars',
              created_at: '1998-11-20T12:21:54.171Z',
              comment_count: '1' } )
  
          });
      });
    })

  describe(' PATCH /api/articles/:article_id', () => {
  it('GET status:200, retrieves the article by article_id with votes incremented correctly', () => {
    return request(app).patch('/api/articles/6')
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
  })
  
}).timeout(4000)

