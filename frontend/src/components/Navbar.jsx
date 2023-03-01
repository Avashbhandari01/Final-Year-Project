import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <h3 style={{ fontFamily: "'Mynerve', cursive" }}>GuardianPortal</h3>
                </a>

                <div className="col-md-3 text-end">
                    <Link to='/admin-login'><button type="button" className="btn btn-outline-primary me-2">Admin Login</button></Link>
                </div>
            </header>
        </div>
    )
}

export default Navbar