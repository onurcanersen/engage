import { Link } from "react-router-dom";
import logo from "./logo.svg";

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-light fixed-top">
			<div className="container">
				<Link className="navbar-brand" to="/">
					<img src={logo} width="30" height="30" className="me-2" alt="" />
					Engage
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarContent"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className="nav-link" to="/">
								Home
							</Link>
						</li>
					</ul>
					<Link className="btn btn-primary" to="/login">
						Login
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
