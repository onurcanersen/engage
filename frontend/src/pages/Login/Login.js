import { useState } from "react";
import { Link } from "react-router-dom";
import participant from "./participant.svg";
import presenter from "./presenter.svg";

const Login = () => {
	const [sessionCode, setSessionCode] = useState("");
	const [presenterEmail, setPresenterEmail] = useState("");
	return (
		<div
			className="container-fluid d-flex align-items-center justify-content-center"
			style={{ height: "100vh", backgroundColor: "#DDA0DD" }}
		>
			<div
				className="row pt-5 pb-5 bg-light rounded shadow m-2"
				style={{ maxWidth: "750px" }}
			>
				<div className="display-4 text-center mb-3">Welcome to Engage!</div>
				<p className="lead text-center">Start engaging.</p>
				<div className="col-md-6 text-center mb-3">
					<p className="lead">I'm a participant</p>
					<img
						src={participant}
						style={{ width: "200px", height: "200px" }}
						alt=""
					/>
					<div className="input-group m-auto" style={{ width: "300px" }}>
						<input
							type="text"
							className="form-control"
							placeholder="Enter code"
							onChange={(e) => setSessionCode(e.target.value)}
						/>
						<Link
							to="/participant"
							className="btn btn-primary"
							state={{ sessionCode: sessionCode }}
						>
							Ask!
						</Link>
					</div>
				</div>
				<div className="col-md-6 text-center mb-3">
					<p className="lead">I'm a presenter</p>
					<img
						src={presenter}
						style={{ width: "200px", height: "200px" }}
						alt=""
					/>
					<div className="input-group m-auto" style={{ width: "300px" }}>
						<input
							type="text"
							className="form-control"
							placeholder="Enter email"
							onChange={(e) => setPresenterEmail(e.target.value)}
						/>
						<Link
							to="/presenter"
							className="btn btn-primary"
							state={{ presenterEmail: presenterEmail }}
						>
							Answer!
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
