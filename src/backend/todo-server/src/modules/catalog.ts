import * as express from "express";

import { CatalogItem } from '../model/item';

type Item = {
    itemId: string;
    itemName: string;
    price: number;
    currency: string;
    categories: string[];
}

type Category = {
  categoryName: string;
  categoryId: string;
  itemsCount: number;
  items: Item[]
}

type Data = {
    catalog: Category[]
}

const contentTypeJson = {
  "Content-Type": "application/json"
};

const contentTypePlainText = {
  "Content-Type": "application/json"
};


// function readCatalogSync(): Data | undefined {
//    const file = "./data/catalog.json";

//    if (fs.existsSync(file)) {
//      const content = fs.readFileSync(file).toString();
//      const catalog = JSON.parse(content);
//      return catalog;
//    }

//    return undefined;
//  }


// This function seems to be inappropriate.
// It should return something, not mutating a passed variable.
export function findAllItems(response: express.Response): null | void {
  CatalogItem.find({}, (error, result) => {
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



export function findItemById(itemId: Item["itemId"], response: express.Response): void {
	CatalogItem.findOne({itemId: itemId}, (error, result) => {
		if (error) {
			console.error(error);
  		  response.writeHead(500,	contentTypePlainText);
			return;
		} else {
			if (!result) {
				if (response != null) {
					response.writeHead(404, contentTypePlainText);
					response.end('Not Found');
				}
				return;
			}

			if (response != null){
				response.setHeader('Content-Type', 'application/json');
				response.send(result);
			}
		}
	});
}


export function findItemsByCategory(category: Category["categoryId"], response: express.Response): void {
	CatalogItem.find({categories: category}, function(error, result) {
		if (error) {
			console.error(error);
  		  response.writeHead(500,	contentTypePlainText);
			return;
		} else {
			if (!result) {
				if (response != null) {
					response.writeHead(404, contentTypePlainText);
					response.end('Not Found');
				}
				return;
			}

			if (response != null){
				response.setHeader('Content-Type', 'application/json');
				response.send(result);
			}
		}
	});
}


// Need to be improved.
export function saveItem(request: express.Request, response: express.Response): void {
	const item = toItem(request.body);
	item.save((error) => {
				if (!error) {
					item.save();
					response.writeHead(201, contentTypeJson);
					response.end(JSON.stringify(request.body));
				} else {
					console.log(error);
					CatalogItem.findOne({itemId : item.itemId	},
						(error, result) => {
							console.log('Check if such an item exists');
							if (error) {
								console.log(error);
								response.writeHead(500, contentTypePlainText);
								response.end('Internal Server Error');
							} else {
								if (!result) {
									console.log('Item does not exist. Creating a new one');
									item.save();
									response.writeHead(201, contentTypeJson);
									response.end(JSON.stringify(request.body));
								} else {
									console.log('Updating existing item');
									result.itemId = item.itemId;
									result.itemName = item.itemName;
									result.price = item.price;
									result.currency = item.currency;
									result.categories = item.categories;
									result.save();
									response.writeHead(200, contentTypeJson);
									response.end(JSON.stringify(request.body));
								}
							}
					});
				}
		});
};


export function remove(request: express.Request, response: express.Response) {
  console.log('Deleting item with id: '	+ request.params.itemId);
  
	CatalogItem.findOne({itemId: request.params.itemId}, function(error, data) {
		if (error) {
			console.log(error);
			if (response != null) {
				response.writeHead(500, contentTypePlainText);
				response.end('Internal server error');
			}
			return;
		} else {
			if (!data) {
				console.log('Item not found');
				if (response != null) {
					response.writeHead(404, contentTypePlainText);
					response.end('Not Found');
				}
				return;
			} else {
				data.remove(function(error){
					if (!error) {
						data.remove();
						response.json({'Status': 'Successfully deleted'});
					}
					else {
						console.log(error);
						response.writeHead(500, contentTypePlainText);
						response.end('Internal Server Error');
					}
				});
			}
		}
	});
}

function toItem(body: Item) {
	return new CatalogItem({
		itemId: body.itemId,
		itemName: body.itemName,
		price: body.price,
		currency: body.currency,
		categories: body.categories
	});
}