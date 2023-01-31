import axios from "axios";

const API_KEY = "AIzaSyCSyEQwHEIvAP_8dcbyRa4yJawh-MPyBjc";

export async function authenticate(mode, email, password) {
  //mode는 signin인지 signup인지 결정
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  // console.log(response.data);
  // 이렇게 하면 로그인 성공 시 displayName,email,expiresIn,idToken 등 id 객체가 뜬다
}

export async function createUser(email, password) {
  await authenticate("signUp", email, password);
}

export async function login(email, password) {
  await authenticate("signInWithPassword", email, password);
}
