import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOuput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { useContext } from "react";
function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput expensesPeriod="TOTAL" expenses={expensesCtx.expenses} />
  );
}

export default AllExpenses;
