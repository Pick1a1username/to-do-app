import * as express from "express";

import * as todo from "../modules/todo";

const router = express.Router();

// Find all items.
router.get("/", (request, response) => {
  todo.findAllItems(response);
});

// Find an item by ID.
router.get("/:itemId", (request, response) => {
  console.log(request.url + " : querying for " + request.params.itemId);
  todo.findItemById(request.params.itemId, response);
});

// Save or update an item.
router.post("/", (request, response) => {
  todo.saveItem(request, response);
});

// Save or update an item.
router.put("/", (request, response) => {
  todo.saveItem(request, response);
});

// Remove an item.
router.delete("/:itemId", (request, response) => {
  todo.remove(request, response);
});

export default router;
