import expressApp from "../app";
import * as chai from "chai";
import chaiHttp = require('chai-http');

import { IItem } from "../model/item";

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);


describe('/get', function() {
    it('get all items', function(done) {
        chai.request(expressApp)
            .get('/todo')
            .end(function(error, response) {
                should.equal(200  , response.status);
                done();
        });
    });

    /**
     * This test may fail sometimes because the target item selected can be
     * the item created temporarily.
     */
    it('get an specific item', function(done) {

        // Get a target item info.
        chai.request(expressApp)
            .get('/todo')
            .end(function(error, response) {
                if ( response.body.length > 0 ) {
                    let targetItem: IItem = response.body[0];
                    chai.request(expressApp)
                        .get(`/todo/${targetItem.itemId}`)
                        .end(function(error, response) {
                            should.equal(200  , response.status);

                            expect(response.body).is.an('object');
                            expect(response.body.itemId).to.equal(targetItem.itemId);
                            done();
                    });
                } else {
                    throw new Error('No item exists for test');
                }
        });
    });
});


describe('/post', function() {
    it('post test(create)', function(done) {
        let item = {
            "itemId": 100,
            "text": "Buy Sports Watch 10",
            "completed": false
        };
    
        chai.request(expressApp)
            .post('/todo')
            .send(item )
            .end(function(err, response){
                should.equal(response.status, 201);
                done();
        });
    });

    it('post test(update)', function(done) {
        let itemBefore = {
            "itemId": 101,
            "text": "Buy Lamborghini",
            "completed": false
        };

        let itemAfter = {
            "itemId": 101,
            "text": "Buy Lamborghini",
            "completed": true
        };
    
        chai.request(expressApp)
            .post('/todo')
            .send(itemBefore)
            .end(function(err, response){
                should.equal(response.status, 201);
                chai.request(expressApp)
                    .post('/todo')
                    .send(itemAfter)
                    .end(function(err, response){
                        should.equal(response.status, 200);
                        expect(response.body).is.an('object');
                        expect(response.body.itemId).to.equal(itemAfter.itemId);
                        done();
                });
        });
    });

    after('clean data', (done) => {
        const removeItemForCreate = chai.request(expressApp)
            .delete('/todo/100');
        const removeItemForUpdate = chai.request(expressApp)
            .delete('/todo/101');

        Promise.all([removeItemForCreate, removeItemForUpdate])
            .then( () => {
                done();
            })
            .catch(error => { 
                console.error(error.message)
            });
    });
});


describe('/delete', function() {
    it('delete test', function(done) {
        const item = {
            "itemId": 201,
            "text": "Buy Lamborghini",
            "completed": false
        };

        chai.request(expressApp)
            .post('/todo')
            .send(item)
            .end(function(err, response){
                should.equal(201, response.status);

                chai.request(expressApp)
                    .delete(`/todo/${item.itemId}`)
                    .end(function(err, response){
                        should.equal(200, response.status);
                        done();
                });
        });
    });
});