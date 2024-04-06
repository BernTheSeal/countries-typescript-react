import { useNavigate, NavigateFunction } from "react-router-dom"

const Header = () => {
    const navigate: NavigateFunction = useNavigate()

    return (
        <div className="header">
            <div className="header-logo">
                <h1>logo</h1>
            </div>
            <nav className="header-nav">
                <ul className="header-nav-ul">
                    <li className="header-nav-ul-link" onClick={() => navigate('/countries')}>countries</li>
                </ul>
            </nav>
        </div>
    )
}

export default Header
