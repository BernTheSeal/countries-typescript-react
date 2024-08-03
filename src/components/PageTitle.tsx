import { FunctionComponent } from "react";

interface iPageTitleProps {
    title: string;
}

const PageTitle: FunctionComponent<iPageTitleProps> = props => {
    const { title } = props
    return (
        <h2 className="page-title">{title}</h2>
    )
}

export default PageTitle
