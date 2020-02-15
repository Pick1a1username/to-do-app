import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

mongoose.connect("mongodb://catalog_admin:some_password@mongo/catalog");

export interface IItem extends mongoose.Document {
    "id" : string;
    "text": number;
    "completed": boolean;
}

const itemSchema = new Schema ({
    "id" : {type: String, index: {unique: true}},
    "text": String,
    "completed" : Boolean
});

export const TodoItem = mongoose.model<IItem>('Item', itemSchema);