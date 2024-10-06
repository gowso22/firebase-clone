import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

function Home() {
  //로그아웃
  const logOut = () => {
    auth.signOut();
  };
  return (
    <>
      <h2>홈</h2>
      <button onClick={logOut}>로그아웃</button>
    </>
  );
}

export default Home;
