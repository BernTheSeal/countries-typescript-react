import { useNavigate, NavigateFunction } from "react-router-dom";
import { FunctionComponent, useEffect, useState, useRef } from "react";
import { setBodyOverflow } from "../utils/setBodyOverflow";
import useClickOutside from "../hooks/use-clickOutside";

interface iHeaderProps {
  onPage: string;
}

interface pageOptions {
  page: string;
  onClick: any;
}

const Header: FunctionComponent<iHeaderProps> = (props) => {
  const { onPage } = props;
  const navigate: NavigateFunction = useNavigate();
  const [isMenuToggle, setIsMenutoggle] = useState<boolean>(false);
  const [isClose, setIsClose] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleMenuToggle = () => {
    if (!isClose) {
      setIsClose(true);
      setTimeout(() => {
        setIsMenutoggle(!isMenuToggle);
      }, 0);
    } else {
      setIsMenutoggle(!isMenuToggle);
      setTimeout(() => {
        setIsClose(false);
      }, 200);
    }
  };

  useClickOutside([menuRef], () => {
    handleMenuToggle();
  });
  useEffect(() => {
    setBodyOverflow(isClose);
  }, [isClose]);

  const pageOptions: pageOptions[] = [
    { page: "Home", onClick: () => navigate("/") },
    { page: "Countries", onClick: () => navigate("/countries") },
    { page: "Games", onClick: () => navigate("/games") },
    { page: "About me", onClick: () => navigate("/") },
  ];

  return (
    <header className="header">
      <div className="header-container">
        {/* logo */}
        <div className="header-container-logo">
          <div></div>
          <h1>Earth Explorer</h1>
        </div>

        {/*desktop navbar*/}
        <nav className="header-container-nav">
          <ul className="header-container-nav-ul">
            {pageOptions.map((pages, index) => (
              <li
                key={index}
                className={`header-container-nav-ul-link ${
                  onPage.toLowerCase() === pages.page.toLocaleLowerCase()
                    ? "active-page"
                    : "inactive-page"
                }`}
                onClick={pages.onClick}
              >
                {pages.page}
              </li>
            ))}
          </ul>
        </nav>

        {/* mobile navbar */}
        {isClose && (
          <div
            className={`header-container-mobileNav ${
              isMenuToggle
                ? "active-background-color"
                : "inactive-background-color"
            }`}
          >
            <nav
              ref={menuRef}
              className={`${
                isMenuToggle ? "active-mobil-bar" : "inactive-mobil-bar"
              }`}
            >
              <button onClick={handleMenuToggle}>
                <i className="fa-solid fa-xmark"></i>
              </button>
              <ul>
                {pageOptions.map((pages, index) => (
                  <li
                    key={index}
                    className={` ${
                      onPage.toLowerCase() === pages.page.toLocaleLowerCase()
                        ? "active-page"
                        : "inactive-page"
                    }`}
                    onClick={() => {
                      pages.onClick();
                      handleMenuToggle;
                    }}
                  >
                    {pages.page}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}

        {/*  mobile bars */}
        <div onClick={handleMenuToggle} className="header-container-bars">
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
