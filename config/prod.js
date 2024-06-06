export default {
  dbURL:
    process.env.MONGO_URL ||
    "mongodb+srv://hodayabu:hodaya770@expense.ggwzxbu.mongodb.net/?retryWrites=true&w=majority&appName=expense",

  dbName: process.env.DB_NAME || "expense_tracker",
};
