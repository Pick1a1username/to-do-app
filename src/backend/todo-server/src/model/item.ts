import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

mongoose.connect("mongodb://catalog_admin:some_password@mongo/catalog");

// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
export interface IItem extends mongoose.Document {
    "itemId" : string;
    "itemName": string;
    "price": number;
    "currency" : string;
    "categories": string[];
}

const itemSchema = new Schema ({
    "itemId" : {type: String, index: {unique: true}},
    "itemName": String,
    "price": Number,
    "currency" : String,
    "categories": [String]
});

export const CatalogItem = mongoose.model<IItem>('Item', itemSchema);