import { Link } from "react-router-dom";
import presenter from "./presenter.jpg";
import participants from "./participants.jpg";
import "./Home.css";
import Footer from "../../components/Footer";

const Home = () => {
	return (
		<div>
			<div className="container">
				<div className="row pt-5 pb-5 banner-background">
					<div className="col-lg-2"></div>
					<div className="col-lg-8 ps-5 pe-5">
						<div className="display-1 text-light mt-5">Engage</div>
						<p className="mt-3 lead text-light">
							Ask and answer questions during your presentation with Engage!
							Upvote an existing question or add yours. Answer your audiences'
							questions and engage.
						</p>
						<hr></hr>
						<p className="text-light">
							Create a new session or use an existing code to join one.
						</p>
						<Link to="/login" className="btn btn-outline-light">
							Join
						</Link>
					</div>
					<div className="col-lg-2"></div>
				</div>
				<div className="row pt-5 pb-5">
					<div className="col-lg-6 d-flex justify-content-center ps-5 pe-5">
						<img
							src={presenter}
							style={{ objectFit: "cover", width: "100%" }}
							alt=""
						/>
					</div>
					<div className="col-lg-6 ps-5 pe-5">
						<div className="display-4 mt-3">I'm a presenter.</div>
						<p className="lead mt-4">
							Enter your email and generate a code for your session.
							Participants can enter this code and reach your session.
						</p>
						<p className="lead mt-4">
							You can see your audiences' questions real-time. Newly added
							questions apear in session as they are sent.
						</p>
						<p className="lead mt-4">
							Questions are ordered by their vote count. Refresh the page to get
							the latest votes. Mark questions as answered as they are answered
							by you.
						</p>
					</div>
				</div>
				<div className="row pt-5 pb-5">
					<div className="col-lg-6 d-flex justify-content-center ps-5 pe-5">
						<img
							src={participants}
							style={{ objectFit: "cover", width: "100%" }}
							alt=""
						/>
					</div>
					<div className="col-lg-6 ps-5 pe-5">
						<div className="display-4 mt-3">I'm a participant.</div>
						<p className="lead mt-4">
							Enter the code generated for the session by your presenter.
						</p>
						<p className="lead mt-4">
							You can add new questions to the session and they will be seen by
							other participants and the presenter in real-time. If your
							question is asked before, just upvote the existing question
							instead of adding a new one.
						</p>
						<p className="lead mt-4">
							Questions are ordered by their vote count. Refresh the page to get
							the latest votes and see if a question is answered or not.
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Home;
