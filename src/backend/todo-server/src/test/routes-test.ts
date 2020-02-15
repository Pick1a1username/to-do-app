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
            .get('/catalog')
            .end(function(error, response) {
                should.equal(200  , response.status);
                done();
        });
    });

    it('get all items under a specific category', function(done) {
        chai.request(expressApp)
            .get('/catalog/Sports Watches')
            .end(function(error, response) {
                should.equal(200  , response.status);

                const categories = response.body.map( item => item.categories.includes('Sports Watches') );
                expect(categories).to.not.include(false);
            
                done();
        });
    });

    /**
     * This test may fail sometimes because the target item selected can be
     * the item created temporarily.
     */
    it('get an specific item', function(done) {

        // let targetItem: IItem = {};

        // Get a target item info.
        chai.request(expressApp)
            .get('/catalog')
            .end(function(error, response) {
                if ( response.body.length > 0 ) {
                    let targetItem: IItem = response.body[0];
                    chai.request(expressApp)
                        .get(`/catalog/item/${targetItem.itemId}`)
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
            "itemName": "Sports Watch 10",
            "price": 100,
            "currency": "USD",
            "categories": [
                "Watches",
                "Sports Watches"
            ]
        };
    
        chai.request(expressApp)
            .post('/catalog')
            .send(item )
            .end(function(err, response){
                should.equal(response.status, 201);
                done();
        });
    });

    it('post test(update)', function(done) {
        let itemBefore = {
            "itemId": 101,
            "itemName": "Sports Watch 10",
            "price": 100,
            "currency": "USD",
            "categories": [
                "Watches",
                "Sports Watches"
            ]
        };

        let itemAfter = {
            "itemId": 101,
            "itemName": "Sports Watch 10",
            "price": 10000,
            "currency": "USD",
            "categories": [
                "Watches",
                "Sports Watches"
            ]
        };
    
        chai.request(expressApp)
            .post('/catalog')
            .send(itemBefore)
            .end(function(err, response){
                should.equal(response.status, 201);
                chai.request(expressApp)
                    .post('/catalog')
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
            .delete('/catalog/item/100');
        const removeItemForUpdate = chai.request(expressApp)
            .delete('/catalog/item/101');

        Promise.all([removeItemForCreate, removeItemForUpdate])
            .then( () => {
                done();
            })
            .catch(error => { 
                console.error(error.message)
            });
    });
});


describe('/put', function() {
    it('put test(create)', function(done) {
        let item = {
            "itemId": 200,
            "itemName": "Sports Watch 10",
            "price": 100,
            "currency": "USD",
            "categories": [
                "Watches",
                "Sports Watches"
            ]
        };
    
        chai.request(expressApp)
            .put('/catalog')
            .send(item )
            .end(function(err, response){
                should.equal(response.status, 201);
                done();
        });
    });

    it('put test(update)', function(done) {
        let itemBefore = {
            "itemId": 201,
            "itemName": "Sports Watch 10",
            "price": 100,
            "currency": "USD",
            "categories": [
                "Watches",
                "Sports Watches"
            ]
        };

        let itemAfter = {
            "itemId": 201,
            "itemName": "Sports Watch 10",
            "price": 10000,
            "currency": "USD",
            "categories": [
                "Watches",
                "Sports Watches"
            ]
        };
    
        chai.request(expressApp)
            .put('/catalog')
            .send(itemBefore)
            .end(function(err, response){
                should.equal(response.status, 201);
                chai.request(expressApp)
                    .put('/catalog')
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
            .delete('/catalog/item/200');
        const removeItemForUpdate = chai.request(expressApp)
            .delete('/catalog/item/201');

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
        var item ={
            "itemId":211,
                "itemName": "Sports Watch 10",
                "price": 10000,
                "currency": "USD",
                "categories": [
                    "Watches",
                    "Sports Watches"
                ]
            };

        chai.request(expressApp)
            .post('/catalog')
            .send(item)
            .end(function(err, response){
                should.equal(201, response.status);

                chai.request(expressApp)
                    .delete(`/catalog/item/${item.itemId}`)
                    .end(function(err, response){
                        should.equal(200, response.status);
                        done();
                });
        });
    });
});