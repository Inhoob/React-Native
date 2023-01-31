import { useState } from "react";
import { Text, StyleSheet, View, Alert } from "react-native";
import Input from "./Input";
import Button from "../../UI/Button";
import { getFormattedDate } from "../../util/date";
import GlobalStyles from "../../constants/styles";
function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  const [inputValues, setInputValues] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount.value, //+를 사용하면 숫자가 된다.
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };

    const amountIsValid = expenseData.amount > 0 && !isNaN(expenseData.amount);
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputValues((curInputValues) => {
        return {
          amount: {
            value: curInputValues.amount.value,
            isValid: amountIsValid,
          },
          date: { value: curInputValues.date.value, isValid: dateIsValid },
          description: {
            value: curInputValues.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true }, //property의 동적 설정
      };
    });
  }

  const formIsInvalid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputValues.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"), //두 번째 인수(enteredValue)는 react-native에서 알아서 처리한다는데 잘 모르겠음..
            value: inputValues.amount.value, //이렇게 value:amountValue로 양방향 바인딩을 해야 reset 버튼 등으로 리셋 가능.
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputValues.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValues.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputValues.description.isValid}
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          autoCapitalize: "none",
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValues.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid Input Values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
