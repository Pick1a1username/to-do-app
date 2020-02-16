import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

mongoose.connect("mongodb://todo_admin:some_password@mongo/todo");

export interface IItem extends mongoose.Document {
    "itemId" : string;
    "text": string;
    "completed": boolean;
}

const itemSchema = new Schema ({
    "itemId" : {type: String, index: {unique: true}},
    "text": String,
    "completed" : Boolean
});

export const TodoItem = mongoose.model<IItem>('Item', itemSchema);