import { FunctionComponent } from "react";

type pageTitleType = "countries" | "games";

interface iPageTitleProps {
  title: pageTitleType;
  icons: { radius: string; color: string }[];
}

const PageTitle: FunctionComponent<iPageTitleProps> = (props) => {
  const { title, icons } = props;
  return (
    <div className="pageTitle-container">
      <div
        className={`pageTitle-container-content ${
          title === "countries" ? "countries" : "games"
        }`}
      >
        <h2 className="pageTitle-container-content-title">
          {title.split("").map((letter, index) => (
            <span key={index}>{letter}</span>
          ))}
        </h2>
        <div className="pageTitle-container-content-icons">
          {icons.map((icon, index) => {
            const { radius, color } = icon;
            return (
              <div
                className="pageTitle-container-content-icons-icon"
                key={index}
                style={{
                  backgroundColor: color,
                  borderRadius: radius,
                  width: title === "countries" ? "30px" : "20px",
                  height: "20px",
                }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
