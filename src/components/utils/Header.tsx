import { useNavigate, NavigateFunction } from "react-router-dom"
import { FunctionComponent } from "react"

interface iHeaderProps {
    onPage: string
}

interface pageOptions {
    page: string,
    onClick: any
}

const Header: FunctionComponent<iHeaderProps> = (props) => {
    const { onPage } = props
    const navigate: NavigateFunction = useNavigate()

    const pageOptions: pageOptions[] = [
        { page: 'Home', onClick: () => navigate('/') },
        { page: 'Countries', onClick: () => navigate('/countries') },
        { page: 'Games', onClick: () => navigate('/') },
        { page: 'About me', onClick: () => navigate('/') },
    ]

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-container-logo">
                    <i className="fa-solid fa-map"></i>
                    <h1>World Master</h1>
                </div>
                <nav className="header-container-nav">
                    <ul className="header-container-nav-ul">
                        {pageOptions.map((pages) => (
                            <li
                                className={`header-container-nav-ul-link ${onPage.toLowerCase() === pages.page.toLocaleLowerCase() ? 'active-page' : 'inactive-page'}`}
                                onClick={pages.onClick}> {pages.page}</li>
                        ))}
                    </ul>
                </nav>
                <div className="header-container-login">
                    <button>LOG IN</button>
                </div>
            </div>
        </header>
    )
}

export default Header
