import {
  GithubAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import styled from "styled-components";
import { auth } from "../routes/firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
  background-color: white;
  font-weight: 600;
  width: 100%;
  margin-top: 50px;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 25px;
`;

export default function GithubBtn() {
  const nav = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      // 팝업으로 깃허브 로그인 시도
      // await signInWithPopup(auth, provider);

      // 리디렉션으로 깃허브 로그인 시도
      await signInWithRedirect(auth, provider);

      nav("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button onClick={onClick}>
      <Logo src="/gitLogo.svg" />
      깃허브로 계속하기
    </Button>
  );
}
