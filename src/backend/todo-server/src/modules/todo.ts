import * as express from "express";
import * as uuidv1 from "uuid/v1";

import { TodoItem, ItemDocument } from "../model/item";

/**
 * Variable for setting JSON content type easily.
 */
const contentTypeJson = {
  "Content-Type": "application/json"
};

/**
 * Variable for setting plain text content type easily.
 */
const contentTypePlainText = {
  "Content-Type": "application/json"
};

/**
 * Type for item.
 */
type Item = {
  itemId: string;
  text: string;
  completed: boolean;
};

/**
 * Convert raw data of item to something for Mongo DB.
 * @param body raw data of item.
 */
function toItem(body: Item): ItemDocument {
  return new TodoItem({
    itemId: body.itemId,
    text: body.text,
    completed: body.completed
  });
}


/**
 * Find all items saved in DB.
 * 
 * This function seems to be inappropriate.
 * 
 * It should return something, not mutating a passed variable.
 * 
 * @param response Variable will be back to the client.
 */
export function findAllItems(response: express.Response): null | void {
  TodoItem.find({}, (error, result) => {
    if (error) {
      console.error(error);
      return null;
    }
    if (result != null) {
      response.json(result);
    } else {
      response.json({});
    }
  });
}

/**
 * Find an item by ID. 
 * 
 * @param itemId The ID 
 * @param response Variable will be back to the client.
 */
export function findItemById(
  itemId: ItemDocument["itemId"],
  response: express.Response
): void {
  // console.log(id);
  TodoItem.findOne({ itemId: itemId }, (error, result) => {
    if (error) {
      console.error(error);
      response.writeHead(500, contentTypePlainText);
      return;
    } else {
      if (!result) {
        if (response != null) {
          // console.log(result)
          response.writeHead(404, contentTypePlainText);
          response.end("Not Found");
        }
        return;
      }

      if (response != null) {
        response.setHeader("Content-Type", "application/json");
        response.send(result);
      }
    }
  });
}


/**
 * Save an item.
 * 
 * Need to be improved.
 * 
 * @param request 
 * @param response 
 */
export function saveItem(
  request: express.Request,
  response: express.Response
): void {
  const item = toItem(request.body);

  if (!request.body.itemId) {
    console.log("Item should not exist. Creating a new one");

    // Todo
    // Consider concurrency. uuid() may not work expectedly when it is requested concurrently.
    const newItemData: ItemDocument = {
      itemId: uuidv1(),
      text: request.body.text as string,
      completed: false
    } as ItemDocument;
    console.log(newItemData);
    const newItem = toItem(newItemData);
    newItem.save();
    response.writeHead(201, contentTypeJson);
    response.end(JSON.stringify(newItemData));
    return;
  }
  item.save(error => {
    if (!error) {
      item.save();
      response.writeHead(201, contentTypeJson);
      response.end(JSON.stringify(request.body));
    } else {
      // console.log(error);
      TodoItem.findOne({ itemId: item.itemId }, (error, result) => {
        console.log("Check if such an item exists");
        if (error) {
          console.log(error);
          response.writeHead(500, contentTypePlainText);
          response.end("Internal Server Error");
        } else {
          if (!result) {
            console.log("Item does not exist. Creating a new one");
            // Todo
            // Consider concurrency. getNewId() may work unexpectedly when it is requested concurrently.
            const newItemData: ItemDocument = {
              itemId: uuidv1(),
              text: request.body.text as string,
              completed: false
            } as ItemDocument;
            console.log(newItemData);
            const newItem = toItem(newItemData);
            newItem.save();
            response.writeHead(201, contentTypeJson);
            response.end(JSON.stringify(newItemData));
          } else {
            console.log("Updating existing item");
            result.itemId = item.itemId;
            result.text = item.text;
            result.completed = item.completed;
            result.save();
            response.writeHead(200, contentTypeJson);
            response.end(JSON.stringify(request.body));
          }
        }
      });
    }
  });
}

/**
 * Remove an item.
 * 
 * @param request 
 * @param response 
 */
export function remove(
  request: express.Request,
  response: express.Response
): void {
  console.log("Deleting item with id: " + request.params.itemId);

  TodoItem.findOne({ itemId: request.params.itemId }, function(error, data) {
    if (error) {
      console.log(error);
      if (response != null) {
        response.writeHead(500, contentTypePlainText);
        response.end("Internal server error");
      }
      return;
    } else {
      if (!data) {
        console.log("Item not found");
        if (response != null) {
          response.writeHead(404, contentTypePlainText);
          response.end("Not Found");
        }
        return;
      } else {
        data.remove(function(error) {
          if (!error) {
            data.remove();
            response.json({ Status: "Successfully deleted" });
          } else {
            console.log(error);
            response.writeHead(500, contentTypePlainText);
            response.end("Internal Server Error");
          }
        });
      }
    }
  });
}
