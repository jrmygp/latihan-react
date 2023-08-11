import { useSelector } from "react-redux";

const LoginPage = () => {
  const userSelector = useSelector((state) => state.auth);

  const loginHandler = async () => {
    try {
      // ngejalain api call
      // get user
      // dispatch(login(user data))
      // dispatch(logout())
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button></button>
    </div>
  );
};

export default LoginPage;
