import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebase";
import { useNavigate, Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Form,
  Error,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../component/auth-components";

function CreateAccount() {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || password === "") return;

    try {
      setLoading(true);
      // 계정 생성
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(credentials.user);
      // username 세팅
      await updateProfile(credentials.user, {
        displayName: name,
      });

      // 다시 home으로 돌아가기
      nav("/");
    } catch (e) {
      // setError

      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Wrapper>
        <Title>JOIN US</Title>
        <Form onSubmit={onSubmit}>
          <Input
            onChange={onChange}
            name="name"
            placeholder="이름"
            type="text"
            value={name}
            required
          />
          <Input
            onChange={onChange}
            name="email"
            placeholder="이메일"
            type="email"
            value={email}
            required
          />
          <Input
            onChange={onChange}
            name="password"
            placeholder="비밀번호"
            type="password"
            value={password}
            required
          />
          <Input type="submit" value={isLoading ? "로딩..." : "계정 생성"} />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
          이미 계정이 있으신가요? <Link to="/login">로그인 &rarr;</Link>
        </Switcher>
      </Wrapper>
    </>
  );
}

export default CreateAccount;
