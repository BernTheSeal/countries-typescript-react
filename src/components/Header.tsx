import { useNavigate, NavigateFunction } from "react-router-dom";
import { FunctionComponent, useState } from "react";
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
          <i className="fa-solid fa-earth-europe"></i>
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
        {isMenuToggle && (
          <div className="header-container-mobileNav">
            <nav>
              <button onClick={() => setIsMenutoggle(false)}>
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
                      setIsMenutoggle(false);
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
        <div
          onClick={() => setIsMenutoggle(!isMenuToggle)}
          className="header-container-bars"
        >
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
