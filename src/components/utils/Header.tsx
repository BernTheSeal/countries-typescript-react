import { useNavigate, NavigateFunction } from "react-router-dom"

const Header = () => {
    const navigate: NavigateFunction = useNavigate()

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-container-logo">
                    <h1>logo</h1>
                </div>
                <nav className="header-container-nav">
                    <ul className="header-container-nav-ul">
                        <li className="header-container-nav-ul-link" onClick={() => navigate('/countries')}>countries</li>
                        <li className="header-container-nav-ul-link" >games</li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
