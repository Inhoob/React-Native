import { Text } from "react-native";
function MealDetailScreen({ route }) {
  const mealId = route.params.mealId;
  return <Text>This is detail{mealId}</Text>;
}
export default MealDetailScreen;
