import { FunctionComponent, ReactNode } from "react"

interface iLoadingProps {
    loading: boolean,
    children: ReactNode
}

const Loading: FunctionComponent<iLoadingProps> = (props) => {
    const { loading } = props;
    if (loading) {
        return <> loading ... </>
    }
    return <>{props.children}</>
}

export default Loading
