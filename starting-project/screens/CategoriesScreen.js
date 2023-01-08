import { CATEGORIES } from "../data/dummy-data";
import { FlatList } from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";

function renderCategoryItem(itemData) {
  return (
    <CategoryGridTile
      title={itemData.item.title}
      color={itemData.item.color}
    ></CategoryGridTile>
  );
}
//renderItem 은 item이라는 property를 가지고있다는 것을 잊지말자

function CategoriesScreen() {
  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns="2"
    ></FlatList>
  );
}

export default CategoriesScreen;
