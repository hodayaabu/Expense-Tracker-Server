import express from "express";
import {
  getExpenses,
  removeExpense,
  addExpense,
  updateExpense,
} from "./expense.controller.js";

const router = express.Router();

router.get("/", getExpenses);
router.delete("/:expenseId", removeExpense);
router.post("/", addExpense);
router.put("/:expenseId", updateExpense);

export const expenseRoutes = router;
