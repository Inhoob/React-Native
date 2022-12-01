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

## Pressable Component

누르는 액션을 등록하려면 Pressable로 감싸줘야함. 이 때 style을 주면 좋다
안드로이드 물결효과 android_ripple={{color:'#dddddd'}}
눌렸을 때 스타일 지정하는 방법

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
