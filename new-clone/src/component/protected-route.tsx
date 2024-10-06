import { Navigate } from "react-router-dom";
import { auth } from "../routes/firebase";

export default function ProtectedRoute({
  children,
}: {
  //ProtectedRoute 다른 모든 컴포넌트 처럼 자식요소를 가짐
  children: React.ReactNode;
}) {
  // 로그인 여부 확인
  // currentUser >> User 혹은 null return
  const user = auth.currentUser;
  console.log(user);

  if (user === null) {
    return <Navigate to="/login" />;
  }
  return children;
}
