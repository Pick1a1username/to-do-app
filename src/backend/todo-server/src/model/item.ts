import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

mongoose.connect("mongodb://todo_admin:some_password@mongo/todo");

// https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
export interface ItemDocument extends mongoose.Document {
  itemId: string;
  text: string;
  completed: boolean;
}

const itemSchema = new Schema({
  itemId: { type: String, index: { unique: true } },
  text: String,
  completed: Boolean
});

export const TodoItem = mongoose.model<ItemDocument>("Item", itemSchema);
