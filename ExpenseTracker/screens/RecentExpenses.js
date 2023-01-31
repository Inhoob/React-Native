import { useState, useContext, useEffect } from "react";
import ExpensesOutput from "../components/ExpensesOuput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import LoadingOverlay from "../UI/LoadingOverlay";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      const expenses = await fetchExpenses();
      setIsFetching(false);
      expensesCtx.setExpenses(expenses);
    }
    getExpenses();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    // console.log(expense.date);
    // console.log(date7DaysAgo);
    return expense.date > date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 Days"
      expenses={recentExpenses}
      fallbackText="No expenses registered for the last7 days"
    />
  );
}

export default RecentExpenses;
