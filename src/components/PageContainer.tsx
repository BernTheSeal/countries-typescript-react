import { ReactNode } from "react";

interface iGamePageContainer {
    children?: ReactNode;
}

const PageContainer = ({ children }: iGamePageContainer) => {
    return (
        <div className="page-container">
            {children}
        </div>
    )
}

export default PageContainer
