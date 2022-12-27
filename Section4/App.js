import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
export default function App() {
  return (
    <LinearGradient
      colors={["#ddb52f", "#4e0429", "#20D173"]}
      style={styles.rootScreen}
    >
      <StartGameScreen />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
});
