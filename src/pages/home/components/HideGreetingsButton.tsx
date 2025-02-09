import PageContainer from "../../../components/PageContainer";
import useIsMobile from "../hooks/use-isMobile";
import { Dispatch, SetStateAction } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

interface hideGreetingsButtonProps {
  isGreetingActive: boolean;
  setIsGreetingsActive: Dispatch<SetStateAction<boolean>>;
}

const HideGreetingsButton = ({
  isGreetingActive,
  setIsGreetingsActive,
}: hideGreetingsButtonProps) => {
  const { isMobile } = useIsMobile();

  if (!isMobile) {
    return (
      <div className="hideGreetingsButton-container">
        <PageContainer>
          <div className="hideGreetingsButton-container-button">
            <button onClick={() => setIsGreetingsActive(!isGreetingActive)}>
              {isGreetingActive ? <IoEye /> : <IoEyeOff />}
            </button>
          </div>
        </PageContainer>
      </div>
    );
  }

  return null;
};

export default HideGreetingsButton;
