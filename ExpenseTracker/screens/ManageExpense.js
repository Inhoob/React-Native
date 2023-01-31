import { useContext, useState } from "react";
import { useLayoutEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import IconButton from "../UI/IconButton";
import GlobalStyles from "../constants/styles";
import Button from "../UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/MnageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const expenseCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    expenseCtx.deleteExpense(editedExpenseId);
    await deleteExpense(editedExpenseId);
    // setIsSubmitting(false) //이건 어차피 뒤로가기하면 true가 되기때문에 불필요
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    //update 할 때에는 local을 업데이트 한 후 백엔드 업데이트 하면 되고 반대의 경우는 id를 먼저 얻어야하기 때문에 역순이 불가능
    if (isEditing) {
      expenseCtx.updateExpense(editedExpenseId, expenseData);
      await updateExpense(editedExpenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      expenseCtx.addExpense({ ...expenseData, id: id });
    }
    navigation.goBack();
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
