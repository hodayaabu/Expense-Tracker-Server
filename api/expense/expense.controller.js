
import { expenseService } from "./expense.service.js";

// lIST
export async function getExpenses(req, res) {
  try {
    const expenses = await expenseService.query();
    res.send(expenses);
  } catch (err) {
    res.status(400).send({ err: "Failed to get expenses" });
  }
}


// POST
export async function addExpense(req, res) {
  let { amount, note, category } = req.body;
  const expenseToSave = {
    amount,
    note,
    category,
    date: Date.now()
  };

  try {
    const savedExpense = await expenseService.add(expenseToSave);
    res.send(savedExpense);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: "Could't add expense" });
  }
}

// UPDATE
export async function updateExpense(req, res) {
  const { expenseId } = req.params;
  const { note, amount, category } = req.body;
  const expenseToUpdate = {
    _id: expenseId,
    note, amount, category
  };

  try {
    const updatedExpense = await expenseService.update(expenseToUpdate);
    res.send(updatedExpense);
  } catch (err) {
    res.status(400).send("Could't update expense" + err);
  }
}

// DELETE
export async function removeExpense(req, res) {
  const { expenseId } = req.params;
  try {
    const deletedCount = await expenseService.remove(expenseId);
    res.json({ message: `expense Deleted: ${expenseId}`, deletedCount });
  } catch (err) {
    console.log(err);
    res.status(400).send("Could't remove expense");
  }
}
