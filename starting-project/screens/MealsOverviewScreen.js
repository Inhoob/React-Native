import { StyleSheet, Text, View } from "react-native";
import { MEALS } from "../data/dummy-data";
import { useRoute } from "@react-navigation/native";
function MealsOverviewScreen() {
  const route = useRoute();
  const catId = route.params.categoryId;

  return (
    <View style={styles.container}>
      <Text>{catId}</Text>
    </View>
  );
}
export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
