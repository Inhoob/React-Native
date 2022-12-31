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
