import { useNavigate, NavigateFunction } from "react-router-dom"
import { FunctionComponent, useState } from "react"

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

    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    const pageOptions: pageOptions[] = [
        { page: 'Home', onClick: () => navigate('/') },
        { page: 'Countries', onClick: () => navigate('/countries') },
        { page: 'Games', onClick: () => navigate('/games') },
        { page: 'About me', onClick: () => navigate('/') },
    ]

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-container-logo">
                    <i className="fa-solid fa-earth-europe"></i>
                    <h1>Earth  Explorer</h1>
                    <div onClick={() => setMenuOpen(!menuOpen)} className="header-container-bars">
                        <i className="fa-solid fa-bars"></i>
                    </div>
                </div>
                <nav className={`header-container-nav ${menuOpen ? 'menu-open' : 'menu-close'}`}>
                    <ul className="header-container-nav-ul">
                        {pageOptions.map((pages, index) => (
                            <li
                                key={index}
                                className={`header-container-nav-ul-link ${onPage.toLowerCase() === pages.page.toLocaleLowerCase() ? 'active-page' : 'inactive-page'}`}
                                onClick={pages.onClick}> {pages.page}</li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
