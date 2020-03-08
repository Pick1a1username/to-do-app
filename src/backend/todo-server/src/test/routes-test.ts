import expressApp from "../app";
import * as chai from "chai";
import chaiHttp = require("chai-http");

import { ItemDocument } from "../model/item";

const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe("/get", function() {
  it("get all items", function(done) {
    chai
      .request(expressApp)
      .get("/todo")
      .end(function(error, response) {
        should.equal(200, response.status);
        done();
      });
  });

  /**
   * This test may fail sometimes because the target item selected can be
   * the item created temporarily.
   */
  it("get an specific item", function(done) {
    // Get a target item info.
    chai
      .request(expressApp)
      .get("/todo")
      .end(function(error, response) {
        if (response.body.length > 0) {
          const targetItem: ItemDocument = response.body[0];
          chai
            .request(expressApp)
            .get(`/todo/${targetItem.itemId}`)
            .end(function(error, response) {
              should.equal(200, response.status);

              expect(response.body).is.an("object");
              expect(response.body.itemId).to.equal(targetItem.itemId);
              done();
            });
        } else {
          throw new Error("No item exists for test");
        }
      });
  });
});

/**
 * There's no test for PUT since POST and PUT uses the same function.
 */
describe("/post", function() {
  it("post test(create only with text)", function(done) {
    const item = {
      text: "Buy Happiness For Test"
    };

    const expectedResponse = {
      text: "Buy Happiness For Test",
      completed: false
    };

    chai
      .request(expressApp)
      .post("/todo")
      .send(item)
      .end(function(err, response) {
        should.equal(response.status, 201);
        expect(response.body.itemId).to.match(
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
        );
        expect(response.body.text).to.equal(expectedResponse.text);
        expect(response.body.completed).to.equal(expectedResponse.completed);
        done();
      });
  });

  after("clean data", done => {
    const removeItemForCreateWithText = chai
      .request(expressApp)
      .get("/todo")
      .then(response => {
        const targetItem = response.body.filter(
          todo => todo.text === "Buy Happiness For Test"
        )[0];
        return chai.request(expressApp).delete(`/todo/${targetItem.itemId}`);
      });

    Promise.all([removeItemForCreateWithText])
      .then(() => {
        done();
      })
      .catch(error => {
        console.error(error.message);
      });
  });
});

/**
 * This part will be used for testing PUT method.
 */
// describe("/post", function() {
//   it("post test(create)", function(done) {
//     const item = {
//       itemId: 100,
//       text: "Buy Sports Watch 10",
//       completed: false
//     };

//     chai
//       .request(expressApp)
//       .post("/todo")
//       .send(item)
//       .end(function(err, response) {
//         should.equal(response.status, 201);
//         done();
//       });
//   });

//   it("post test(create only with text)", function(done) {
//     const item = {
//       text: "Buy Happiness"
//     };

//     const expectedResponse = {
//       text: "Buy Happiness",
//       completed: false
//     };

//     chai
//       .request(expressApp)
//       .post("/todo")
//       .send(item)
//       .end(function(err, response) {
//         should.equal(response.status, 201);
//         // expect(response.body.itemId).to.match();
//         expect(response.body.text).to.equal(expectedResponse.text);
//         expect(response.body.completed).to.equal(expectedResponse.completed);
//         done();
//       });
//   });

//   it("post test(update)", function(done) {
//     const itemBefore = {
//       itemId: 101,
//       text: "Buy Lamborghini",
//       completed: false
//     };

//     const itemAfter = {
//       itemId: 101,
//       text: "Buy Lamborghini",
//       completed: true
//     };

//     chai
//       .request(expressApp)
//       .post("/todo")
//       .send(itemBefore)
//       .end(function(err, response) {
//         should.equal(response.status, 201);
//         chai
//           .request(expressApp)
//           .post("/todo")
//           .send(itemAfter)
//           .end(function(err, response) {
//             should.equal(response.status, 200);
//             expect(response.body).is.an("object");
//             expect(response.body.itemId).to.equal(itemAfter.itemId);
//             done();
//           });
//       });
//   });

//   after("clean data", done => {
//     const removeItemForCreate = chai.request(expressApp).delete("/todo/100");
//     const removeItemForCreateWithText = chai
//       .request(expressApp)
//       .get("/todo")
//       .then(response => {
//         const targetItem = response.body.filter(
//           todo => todo.text === "Buy Happiness"
//         )[0];
//         return chai.request(expressApp).delete(`/todo/${targetItem.itemId}`);
//       });
//     const removeItemForUpdate = chai.request(expressApp).delete("/todo/101");

//     Promise.all([
//       removeItemForCreate,
//       removeItemForCreateWithText,
//       removeItemForUpdate
//     ])
//       .then(() => {
//         done();
//       })
//       .catch(error => {
//         console.error(error.message);
//       });
//   });
// });

describe("/delete", function() {
  it("delete test", function(done) {
    const item = {
      text: "Buy Lamborghini"
    };

    chai
      .request(expressApp)
      .post("/todo")
      .send(item)
      .end(function(err, response) {
        should.equal(201, response.status);
        const createdItem = response.body;

        chai
          .request(expressApp)
          .delete(`/todo/${createdItem.itemId}`)
          .end(function(err, response) {
            should.equal(200, response.status);
            done();
          });
      });
  });
});
