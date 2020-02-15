import * as express from 'express';

import * as catalog from '../modules/catalog';

const router = express.Router();

router.get('/', (request, response, next) => {
  catalog.findAllItems(response);
});

router.get('/item/:itemId', (request, response, next) => {
  console.log(request.url + ' : querying for ' + request.params.itemId);
  catalog.findItemById(request.params.itemId, response);
});


router.get('/:categoryId', (request, response, next) => {
  console.log(request.url + ' : querying for ' + request.params.categoryId);
  catalog.findItemsByCategory(request.params.categoryId, response);
});


router.post('/', (request, response, next) => {
  catalog.saveItem(request, response);
});

router.put('/', (request, response, next) => {
  catalog.saveItem(request, response);
});

router.delete('/item/:itemId', (request, response, next) => {
  catalog.remove(request, response);
});


export default router;