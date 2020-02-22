import * as express from "express";

import * as todo from "../modules/todo";

const router = express.Router();

router.get("/", (request, response) => {
  todo.findAllItems(response);
});

router.get("/:itemId", (request, response) => {
  console.log(request.url + " : querying for " + request.params.itemId);
  todo.findItemById(request.params.itemId, response);
});

router.post("/", (request, response) => {
  todo.saveItem(request, response);
});

router.put("/", (request, response) => {
  todo.saveItem(request, response);
});

router.delete("/:itemId", (request, response) => {
  todo.remove(request, response);
});

export default router;
