import { dbService } from "../../services/db.service.js";
import { ObjectId } from "mongodb";

export const expenseService = {
  query, // LIST
  add, // POST
  update, // UPDATE
  remove, // DELETE
};

const collectionName = "expenseDB";
const allowedFields = ["amount", "category", "note"];

// lIST
async function query() {
  try {
    //   const criteria = _buildCriteria(filterBy);
    //   const bugCursor = await collection.find(criteria);
    const collection = await dbService.getCollection(collectionName);
    const expenses = await collection.find().toArray();

    return expenses;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// POST
async function add(expenseToSave) {
  try {
    const collection = await dbService.getCollection(collectionName);
    await collection.insertOne(expenseToSave);
    return expenseToSave;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// UPDATE
async function update(expense) {
  try {
    const collection = await dbService.getCollection(collectionName);
    const expenseToSave = {
      amount: expense.amount,
      category: expense.category,
      note: expense.note,
    }

    const oldExpense = await collection.findOne({ _id: new ObjectId(expense._id) })
    if (!oldExpense) throw `Couldn't find expense with _id ${expense._id}`

    await collection.updateOne({ _id: new ObjectId(oldExpense._id) }, { $set: expenseToSave })

    const newExpense = await collection.findOne({ _id: new ObjectId(expense._id) })
    return newExpense


  } catch (err) {
    throw err;
  }
}

// DELETE
async function remove(expenseId) {
  try {
    const collection = await dbService.getCollection(collectionName);
    const { deletedCount } = await collection.deleteOne({
      _id: new ObjectId(expenseId),
    });
    return deletedCount;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
