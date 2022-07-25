import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PresenterService from "../services/PresenterService";
import SessionService from "../services/SessionService";
import QuestionService from "../services/QuestionService";
import Questions from "../components/Questions";
import SockJS from "sockjs-client";
import { over } from "stompjs";

var stompClient = null;

const Presenter = () => {
	const location = useLocation();
	const { presenterEmail } = location.state;
	const [presenter, setPresenter] = useState("");
	const [sessions, setSessions] = useState([]);
	const [currentSession, setCurrentSession] = useState("");
	const [questions, setQuestions] = useState([]);
	const [refresh, setRefresh] = useState(false);
	useEffect(() => {
		PresenterService.findByEmail(presenterEmail)
			.then((response) => {
				if (response.data) {
					setPresenter(response.data);
				} else {
					const newPresenter = {
						email: presenterEmail,
					};
					PresenterService.create(newPresenter)
						.then((response) => {
							setPresenter(response.data);
						})
						.catch((e) => {
							console.log(e);
						});
				}
			})
			.catch((e) => {
				console.log(e);
			});
	}, [presenterEmail]);
	useEffect(() => {
		if (presenter) {
			SessionService.findByPresenterId(presenter.id)
				.then((response) => {
					if (response.data.length) {
						setSessions([...response.data]);
						setCurrentSession([...response.data][0]);
					} else {
						SessionService.create(presenter.id, {}).then((response) => {
							setSessions([response.data]);
							setCurrentSession(response.data);
						});
					}
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}, [presenter]);
	useEffect(() => {
		if (currentSession) {
			QuestionService.findBySessionCode(currentSession.code)
				.then((response) => {
					setQuestions([...response.data]);
				})
				.catch((e) => {
					console.log(e);
				});
			if (refresh) {
				setRefresh(false);
			}
		}
	}, [currentSession, refresh]);
	useEffect(() => {
		const socket = new SockJS("http://localhost:8080/sessions-websocket");
		stompClient = over(socket);
		stompClient.connect(
			{},
			() => {
				stompClient.subscribe("/sessions/" + currentSession.code, (payload) => {
					const newQuestion = JSON.parse(payload.body);
					questions.push(newQuestion);
					setQuestions([...questions]);
				});
			},
			(err) => {
				console.log(err);
			}
		);
	}, [currentSession.code, questions]);
	const createSession = () => {
		SessionService.create(presenter.id, {})
			.then((response) => {
				setSessions([...sessions, response.data]);
			})
			.catch((e) => {
				console.log(e);
			});
	};
	return (
		<div className="container" style={{ minHeight: "100vh" }}>
			<div className="row" style={{ marginTop: "120px" }}>
				<div className="col-lg-3"></div>
				<div className="col-lg-6">
					<div className="display-5">
						Welcome to session{" "}
						<span className="text-primary">{currentSession.code}</span>!
					</div>
					<hr></hr>
					<p className="lead">
						You have just joined session{" "}
						<span className="text-primary">{currentSession.code}</span>,
						presenter <span className="text-primary">{presenter.email}</span>.
					</p>
					<p className="lead">Select another session to join:</p>
					<ul className="list-group rounded shadow">
						{sessions.map((session, index) => (
							<li
								className={`list-group-item ${
									currentSession.code === session.code ? "active" : ""
								}`}
								onClick={() => {
									setCurrentSession(session);
								}}
								style={{ cursor: "pointer" }}
								key={index}
							>
								Session "{session.code}"
							</li>
						))}
					</ul>
					<button
						className="btn btn-primary mt-3 shadow"
						onClick={createSession}
					>
						Create Session
					</button>
					<button
						className="btn btn-primary mt-3 ms-2 shadow"
						onClick={() => {
							setRefresh(true);
						}}
					>
						Refresh
					</button>
					<Questions
						questions={questions}
						setQuestions={setQuestions}
						userType="presenter"
					/>
				</div>
				<div className="col-lg-3"></div>
			</div>
		</div>
	);
};

export default Presenter;
