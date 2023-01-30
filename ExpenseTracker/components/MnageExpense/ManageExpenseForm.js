import { Text, TextInput, View } from "react-native";

function ManageExpenseForm({ label, textInputConfig }) {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput {...textInputConfig} />
    </View>
  );
}
export default ManageExpenseForm;
