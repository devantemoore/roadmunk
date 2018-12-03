const supertest = require('supertest');

describe('Post (model)', function() {
    describe('#Create Post()', function() {
        it('Should return bad request for empty post body', function (done) {
            supertest(sails.hooks.http.app)
            .post('/post')
            .send({})
            .expect(400, done)
        });
        it('Valid Post body', function (done) {
            supertest(sails.hooks.http.app)
            .post('/post')
            .send({title: 'New Post 2', description: 'Post description 2', author: 'Kent Beck'})
            .expect(200, done)
        });
    });

    describe('#Get Post By Id()', function() {
        it('Should return valid response of a Post', function (done) {
            supertest(sails.hooks.http.app)
                .get('/post/5c04d3fe23c9fa12fb4c204a')
                .expect(200, done)
        });
    });
    describe('#Search Posts()', function() {
        it('Should return valid response of Posts', function (done) {
            this.timeout(10000);
            supertest(sails.hooks.http.app)
                .post('/posts')
                .send({size: 2, page: 1})
                .expect(200, done);
        });
    });
});
