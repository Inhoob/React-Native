import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import CategoriesScreen from "./screens/CategoriesScreen";

export default function App() {
  return (
    <>
      <SafeAreaView>
        <StatusBar style="light" />
        <CategoriesScreen />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
