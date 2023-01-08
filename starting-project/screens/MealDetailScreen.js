import { Text, View, Image } from "react-native";
import MealDetails from "../components/MealDetails";
import { MEALS } from "../data/dummy-data";
function MealDetailScreen({ route }) {
  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  return (
    <View>
      <Image source={{ uri: selectedMeal.imageUrl }} />
      <Text>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
      />
      <Text>ingredients</Text>
      {selectedMeal.ingredients.map((step) => {
        return <Text key={step}>{step}</Text>;
      })}
      <Text>Steps</Text>
    </View>
  );
}
export default MealDetailScreen;
