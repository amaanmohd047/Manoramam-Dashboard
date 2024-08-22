import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";

const Logout = () => {
  const { logout, isLoading: isLoggingOut } = useLogout();

  const handleLogout = () => {
    logout();
  };
  return (
    <ButtonIcon onClick={handleLogout} disabled={isLoggingOut}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
};

export default Logout;
