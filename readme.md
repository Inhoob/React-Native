# React Native

## 프로젝트 생성

npx create-expo-app my-app

## ios에서 여는 방법

1. npm run start
2. 아이폰으로 QR code 찍기

## 만약 android에서 열고 싶다면?

1. Android Studio 소프트웨어 다운
2. local machine에 Android Emulator 다운 가능

## Component

1. View => 콘텐츠를 담는 상자나 컨테이너 구축에 사용됨. <div>와 비슷하지만 텍스트를 직접 넣진 못한다.
2. 그 밖의 것들은 https://reactnative.dev/docs/components-and-apis 에서 확인할 수 있다.

## Layout

- flexbox 사용
- 만약 버튼이 늘어나서 이상하게 생겼다? 버튼에는 style 속성이 없으니 버튼의 크기를 늘어나지 않게 한다
- 가장 외부 컨테이너는 크기를 정해줘야 한다. flex=1을 줄 것.

## eventListener

- event를 등록할 때 property 명은 조금씩 다르지만 기본적으로 react와 동일한 방식
- useState와 같은 훅도 사용할 수 있다.

## React-Native에서의 스타일

- ios에서 borderRadius가 적용안되는 이유는 네이티브 UI 요소로 전환할 때 텍스트 출력 요소가 borderRadius를 지원x
- 그럴 땐 View 요소로 덮어주면 된다.
- 또한 이 과정에서 style이 상속되지 않는다는 점을 주의할 것

## ScrollView

- View로 설정한 내용은 스크롤바가 나타나지 않음.
- ScrollView를 사용해야 함
- ScrollView를 보면 ios에서만 사용 가능한 옵션도 있고 android에서만 사용 가능한 옵션도 있다.
- 하지만 ScrollView는 한번에 렌더링한다는 단점이 있음(성능저하) 분량이 정해진 것은 괜찮지만 리스트가 끝없이 늘어나는 주제에는 좋지 않다. => FlatList를 쓰면 보이는 부분만 렌더링 한다
- 갯수가 고정되어있다면 FlatList를 굳이 쓰지 않아도 좋음

```javascript
<ScrollView>
  {courseGoals.map((goal, idx) => {
    return (
      <View style={styles.goalItem}>
        <Text style={styles.goalText} key={idx}>
          {goal}
        </Text>
      </View>
    );
  })}
</ScrollView>
```

위의 코드를 아래처럼 수정해준다

```javascript
<FlatList
  data={courseGoals}
  alwaysBounceVertical={false}
  renderItem={(itemData) => {
    //itemData는 index,item property를 갖는다
    return (
      <View style={styles.goalItem}>
        <Text style={styles.goalText} key={itemData.index}>
          {itemData.item}
        </Text>
      </View>
    );
  }}
/>
```

이 때 렌더링 할 때 상태엔 key property를 쓰면 좋은데 key property가 있다면 iteration 함수에서 자동으로 key를 찾아준다

API에서 가져와서 key property가 없을 때에는(대신 id가 있을 때) FlatList에 keyExtractor를 추가할 수도 있다.

```javascript
keyExtractor={(item, index) => item.id}
```

_FlatList에서 중요한것은 때때로 기기의 맨 아래로 스크롤이 안되는 것 처럼 보일 때가 있다는 것이다. 이 스크롤 문제를 해결하려면 FlatList 주의에 컨테이너를 감싸주는 것이다. FlatList는 마치 무한한 공간을 차지하는 것 처럼 행동하는데 그렇기 때문에 이 공간에 style로 flex:1 의 값을 준다던가 하는 방식으로 제어해야 한다._

## Pressable Component

누르는 액션을 등록하려면 Pressable로 감싸줘야함. 이 때 style을 주면 좋다
안드로이드 물결효과 android_ripple={{color:'#dddddd'}}
눌렸을 때 스타일 지정하는 방법

Pressable Component의 style은 style객체를 담을 수도 있고 화살표함수를 통해 press이벤트마다
객체를 발생시킬 수 있다. pressed는 정해진 이름임

```javascript
style={({ pressed }) => pressed && styles.pressedItem}

const styles = StyleSheet.create({
  pressedItem: {
    opacity: 0.5,
  },
});

```

## event에 인자를 전달하는 방법

1. Helper 함수 이용

```javascript
function addGoalHandler() {
  props.onAddGoal(enteredGoalText);
  setEnteredGoalText("");
}
```

2. bind 이용

```javascript
<Pressable onPress={props.onDeleteGoal.bind(this, props.id)}>
  <View style={styles.goalItem}>
    <Text style={styles.goalText}>{props.text}</Text>
  </View>
</Pressable>
```

## Modal

Modal이 제공하는 컴포넌트들을 잘 이용해서 애니메이션 만들기
properties = visible,animationType

## Image 파일

```javascript
<Image source={require("상대경로")} />
```

## 모든 배경화면 색상 적용

app.json 파일에서 "backgroundColor":"#cccccc" 적용하면 됨

## 상태바 조작(StatusBar)

상단바 조작 시 StatusBar import하고 style을 auto,light,dark 등등 조절

## 디버깅

1. 터미널 에러메시지
2. console.log
3. 터미널에서 m 눌러서 에뮬레이터의 메뉴 토글(여기서 remote JS 메뉴토글 가능) -> 근데 불안정한 듯 하다
4. react-devtools 설치 후 터미널에 react-devtools 치고 에뮬레이터에서 remote JS 메뉴토글(state를 볼 때 유용)

## shadow 추가하는 법

elevation property 사용(0,1,2,3) => android
shadow properties => ios

> 참고로 ios에서 shadow는 backgroundcolor를 적용해야 보인다.

만약 그림자가 잘 보이지 않을 때는 style을

```
overflow: Platform.OS === "android" ? "hidden" : "visible",
```

위와 같이 적용해주면 잘 보인다.

## 유저경험을 위한 몇가지 textInput property

autoCapitalize="none"
autoCorrect={false}

## Style 관련 잘 처리가 안될 때

외부 컨테이너와 내부 컨테이너를 나눠서 작업
Section4/components/PrimaryButton 예시를 확인할 것

## 그래디언트 설정(gradient)

expo lineargradient

## background-image

ImageBackground 컴포넌트 사용
이 때 resizeMode,source 설정
background-image를 react-native github 페이지에서 components를 뜯어보면 image와 view의 조합임
이 view의 style은 imageStyle이라는 property를 이용해서 투명도 등 설정 가능

## style의 중첩

react-native는 CSS와는 다르게 계단식 스타일도 없고 상속도 없다. 하지만 유사한 동작을 하게 만들 수 있는데 만약
내가 컴포넌트를 사용할 때 스타일을 추가해서 사용하려면 style property를 넣는다.

```
function InsructionText({children,style}){
  return <Text style={[styles.instructionText, style]}>
}
```

## 원을 만드는 법

width,height를 동일하게 설정해 정사각형을 만들고 borderRadius를 그 절반의 길이로 하면 됨

## 플랫폼 & 기기 크기에 맞추기(UI 개선,반응형)

1. max-width
2. Dimensions(screen=상태표시줄을 포함한 너비,높이 / window = 상태표시줄을 제외한 너비,높이)

```
const deviceWidth = Dimensions.get("window").width;
// ...
padding: deviceWidth < 380 ? 12 : 24
```

3. 가로,세로 변경 요소

> 우선 가로로 기울였을 때 변하지 않는다면 그것은 app.json 설정이 'oriemntation' : 'portrait'으로 설정되어있기 때문이다. landscape는 가로고정, default는 잠금해제

만약 어플을 사용중에 기기를 돌린다? 만약 Dimension 관련 변수설정을 컴포넌트 밖에 두고 기기를 돌렸을 때 중단점을 지나더라도 padding이 변하지 않는다. 왜냐하면 컴포넌트 밖의 변수는 다시 설정되는것이 아니다. 다시 만약 사용중에 어플을 돌리는 기능을 하려면 Dimensions API를 사용하지 않는 것이 좋다. 대신 component 내에서 문제를 해결해야 한다.

`useWindowDimensions` hook을 사용하자. 컴포넌트 내에서 선언해주면 된다.

```
const {width,height} = useWindowDimensions();
// ...

const marginTopDistance = height < 380 ? 30 : 100

<View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
//...
</View>
```

4. 키패드에 의해 가려지는부분 => KeyboardAvoidingView 으로 기존의 앱을 덮어준다.(ios만 적용)
   이 때 중요한 것은 KeyboardAvoidingView의 style에 flex:1 을 이용해서 최대크기로 만들어주는 것이고
   이 것의 동작으로 'position'을 적용하면 ScrollView로 또 다시 덮어줘야한다.

```
  <ScrollView>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
```

## 플랫폼에 따른 코드작성

1. Platform API 활용

```
//Title.js
const styles = StyleSheet.create({
  title: {

    borderWidth: Platform.OS==='android' ? 2 : 0,
    // 또는
    borderWidth:Platform.select({ios:0,android:2}),
  },
});
```

2. 파일을 따로 작성

파일명을 Title.android.js 로 바꿔준다. 단, 이 때 import를 제대로 수정해줘야한다.
import Title from '../components/ui/Title.android 로 되어있을 수 있는데 .android를 지워줄 것.

## Navigation 이란?

모바일에선 url이 아닌 버튼을 눌러서 다른 화면으로 이동하거나 이전화면으로 돌아가는 것을 Navigation이라고 한다.

Navigation은 ReactNative에서 제공하는 도구를 통해 화면 컴포넌트에서 설정한다. 화면에 바인딩 된 컴포넌트(Stack.Screen으로 설정된)는 navigtion이라는 property를 갖는다.
보통 useNavigation을 쓰긴한다.

```
function CategoriesScreen({navigation}) {
  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns="2"
    ></FlatList>
  );
}
```

만약 name과 다른 header 명을 쓰고싶으면 options 프로퍼티를 이용하자. navigation API를 잘 찾아볼 것

```
<NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MealsCategories"
            component={CategoriesScreen}
            options={{
              title: "All Categories",
              headerStyle: { backgroundColor: "#351401" },
              headerTintColor: "#cccccc",
              contentStyle: { backgroundColor: "#3f2f25" },
            }}
          />
          <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
        </Stack.Navigator>
```

만약 동적으로 title을 바꾸고싶다? MealsOverviewScreen 컴포넌트 참조.

```
useEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title;
    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation]);
```

하지만 이렇게하면 useEffect의 효과에 의해 컴포넌트가 렌더링 된 후에 title이 바뀌는 것을 확인할 수 있는데 useLayoutEffect를 이용하면 애니메이션이 실행되는 동안 side effect를 사용할 수 있다.

## Context

```
function FavoritesContextProvider({ children }) {
  const [favoriteMealIds, setFavoriteMealIds] = useState([]);
  function addFavorite(id) {
    setFavoriteMealIds((currentFavIds) => [...currentFavIds, id]);
  }
  function removeFavorite(id) {
    setFavoriteMealIds((currentFavIds) =>
      currentFavIds.filter((mealId) => mealId !== id)
    );
  }
  const value = {
    ids: favoriteMealIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
```

간단하게 만드는 ContextProvider. 이것을 실제 컴포넌트에 적용하면

```
import { useContext, useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

import IconButton from "../components/IconButton";
import List from "../components/MealDetail/List";
import Subtitle from "../components/MealDetail/Subtitle";
import MealDetails from "../components/MealDetails";
import { MEALS } from "../data/dummy-data";
import { FavoritesContext } from "../store/context/favorites-context";

function MealDetailScreen({ route, navigation }) {
  const favoriteMealsCtx = useContext(FavoritesContext);
  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);

  function changeFavoriteStatusHandler() {
    if (mealIsFavorite) {
      favoriteMealsCtx.removeFavorite(mealId);
    } else {
      favoriteMealsCtx.addFavorite(mealId);
    }
  }
}
```

## Navigator 중첩 예시

```
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpenseOverview() {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} />
      <BottomTabs.Screen name="AllExpenses" component={AllExpenses} />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto"></StatusBar>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ExpenseOverview" component={ExpenseOverview} />
          <Stack.Screen name="ManageExpense" component={ManageExpense} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
```

## Navigation에서의 Presentation

```
<Stack.Screen
  name="ManageExpense"
  component={ManageExpense}
  options={{ presentation: "modal" }}
/>
```

이런 식으로 설정하면 화면 전환 시 modal 처럼 나타난다. modal 외에도 여러가지 옵션이 있음.

## Navigation에서 내가 온 화면을 동적으로 아는 방법 : 라우트 매개변수 설정

```
function expensePressHandler() {
    navigation.navigate("ManageExpense", {
      expenseId: id,
    });
  }
```

이런 식으로 navigate의 두 번째 인자로 expenseId를 설정해두고, route를 전달인자로 받으면 됨

```
function ManageExpense({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return <Text>ManageExpense Screen</Text>;
}
```
