import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

const Title = styled.h1`
  font-size: 42px;
`;

const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

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
          {error !== "" ? <Error>{error}</Error> : null}
        </Form>
      </Wrapper>
    </>
  );
}

export default CreateAccount;
