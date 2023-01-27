import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOuput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    // console.log(expense.date);
    // console.log(date7DaysAgo);
    return expense.date > date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput expensesPeriod="Last 7 Days" expenses={recentExpenses} />
  );
}

export default RecentExpenses;
