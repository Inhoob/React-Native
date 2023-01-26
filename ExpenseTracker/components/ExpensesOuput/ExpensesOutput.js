import { FlatList, Text, View, StyleSheet } from "react-native";
import GlobalStyles from "../../constants/styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 89.29,
    date: new Date("2202-01-05"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 5.29,
    date: new Date("2203-01-05"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 14.99,
    date: new Date("2203-01-06"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 18.59,
    date: new Date("2202-01-07"),
  },
];

function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}
export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
