const NavBar = ({ isLoggedIn, handleLogout, user }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top primarybbcolor" style={{'textAlign':'center'}}>
            <a className="navbar-brand" href="/">Food App</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <div className="navbar-nav">
                {isLoggedIn ? (
                    <>
                    <a className="nav-item nav-link" href="/">Favorites</a>
                    <a className="nav-item nav-link" href="/subpage">{user.firstname} ({user.username})</a>
                    </>
                ) : null}
                {isLoggedIn ? (
                    <button className="nav-item btn btn-danger" onClick={handleLogout}>Log Out</button>
                ) : (
                    <>
                    <a className="nav-item nav-link" href="/login">Login</a>
                    <a className="nav-item nav-link" href="/register">Register</a>
                    </>
                )}
            </div>
            </div>
        </nav>
    );
};

export default NavBar;
