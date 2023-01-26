import { View, Text, FlatList } from "react-native";
function ExpensesSummary({ expenses, periodName }) {
  const expensesSum = expesnses.reduce((sum, expense) => {
    return sum + expense.amount;
  });
  return (
    <View>
      <Text>{periodName}</Text>
      <Text>$177.95</Text>
      <FlatList></FlatList>
    </View>
  );
}
export default ExpensesSummary;
