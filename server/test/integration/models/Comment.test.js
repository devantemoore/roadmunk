const supertest = require('supertest');

describe('Comment (model)', function() {
    describe('#Create Comment()', function() {
        it('Should return bad request for empty post body', function (done) {
            supertest(sails.hooks.http.app)
            .post('/comment')
            .send({})
            .expect(400, done)
        });
        it('Minimum character for comments', function (done) {
           supertest(sails.hooks.http.app)
           .post('/comment')
           .send({postId: '5c04d3fe23c9fa12fb4c204a', message: 'P', user: 'Kent Beck'})
           .expect(400, done)
       });
        it('Valid creation of Comments', function (done) {
            this.timeout(10000);
            supertest(sails.hooks.http.app)
            .post('/comment')
            .send({postId: '5c04d3fe23c9fa12fb4c204a', message: 'Post description', user: 'Kent Beck'})
            .expect(200, done)
        });
    });
    describe('#Search Comments()', function() {
        it('Should return valid response of Comments', function (done) {
            supertest(sails.hooks.http.app)
                .post('/comments')
                .send({postId: "5c04d3fe23c9fa12fb4c204a", size: 2, page: 1})
                .expect(200, done);
        });
    });
});
