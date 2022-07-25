import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import Form from "../components/Form";
import Questions from "../components/Questions";
import QuestionService from "../services/QuestionService";

var stompClient = null;

const Participant = () => {
	const location = useLocation();
	const { sessionCode } = location.state;
	const [questions, setQuestions] = useState([]);
	const [refresh, setRefresh] = useState(false);
	useEffect(() => {
		QuestionService.findBySessionCode(sessionCode)
			.then((response) => {
				setQuestions([...response.data]);
			})
			.catch((e) => {
				console.log(e);
			});
		if (refresh) {
			setRefresh(false);
		}
	}, [sessionCode, refresh]);
	useEffect(() => {
		const socket = new SockJS("http://localhost:8080/sessions-websocket");
		stompClient = over(socket);
		stompClient.connect(
			{},
			() => {
				stompClient.subscribe("/sessions/" + sessionCode, (payload) => {
					const newQuestion = JSON.parse(payload.body);
					questions.push(newQuestion);
					setQuestions([...questions]);
				});
			},
			(err) => {
				console.log(err);
			}
		);
	}, [sessionCode, questions]);
	const sendQuestion = (question) => {
		stompClient.send("/questions", {}, JSON.stringify(question));
	};
	return (
		<div
			className="container"
			style={{
				minHeight: "100vh",
			}}
		>
			<div className="row" style={{ marginTop: "120px" }}>
				<div className="col-lg-3"></div>
				<div className="col-lg-6">
					<div className="display-5">
						Welcome to session{" "}
						<span className="text-primary">{sessionCode}</span>!
					</div>
					<hr></hr>
					<p className="lead">
						You have just joined session{" "}
						<span className="text-primary">{sessionCode}</span>.
					</p>
					<Form sendQuestion={sendQuestion} sessionCode={sessionCode} />
					<button
						className="btn btn-primary mt-3 shadow"
						onClick={() => {
							setRefresh(true);
						}}
					>
						Refresh
					</button>
					<Questions
						questions={questions}
						setQuestions={setQuestions}
						userType="participant"
					/>
				</div>
				<div className="col-lg-3"></div>
			</div>
		</div>
	);
};

export default Participant;
