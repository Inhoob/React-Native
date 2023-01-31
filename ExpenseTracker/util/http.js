import axios from "axios";

const BACKEND_URL = "https://expense-tracker-e0209-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
  const response = axios.post(BACKEND_URL + "/expenses.json", expenseData); //firebase에 사용할 땐 .json을 붙여준다.
  const id = response.data.name; //name이라는 property는 자동으로 생성된 id이다.
  return id; //여기서 id를 반환하면 storeExpense라는 비동기함수가 promise를 반환하고 결국 id로 resolve된다.
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}
