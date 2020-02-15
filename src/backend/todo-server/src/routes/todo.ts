import * as express from 'express';

import * as todo from '../modules/todo';

const router = express.Router();

router.get('/', (request, response, next) => {
  todo.findAllItems(response);
});

router.get('/:itemId', (request, response, next) => {
  console.log(request.url + ' : querying for ' + request.params.itemId);
  todo.findItemById(parseInt(request.params.itemId), response);
});

router.post('/', (request, response, next) => {
  todo.saveItem(request, response);
});

router.put('/', (request, response, next) => {
  todo.saveItem(request, response);
});

router.delete('/:itemId', (request, response, next) => {
  todo.remove(request, response);
});

export default router;