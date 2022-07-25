import QuestionService from "../../services/QuestionService";
import like from "./like.svg";
import { useState } from "react";

const Question = (props) => {
	const [voted, setVoted] = useState(false);
	const updateQuestion = (question, answered, vote) => {
		question.answered = answered;
		question.vote = vote;
		QuestionService.update(question.id, question)
			.then((response) => {
				props.setQuestions([...props.questions]);
			})
			.catch((e) => {
				console.log(e);
			});
	};
	return (
		<div
			className={`row mt-3 mb-3 shadow rounded ms-0 me-0 ${
				props.question.answered ? "bg-success" : ""
			}`}
		>
			<div
				className={`col d-flex align-items-center ${
					props.question.answered ? "text-light" : ""
				}`}
			>
				{props.question.content}
			</div>
			<div
				className={`col-auto d-flex align-items-center ${
					props.question.answered ? "text-light" : ""
				}`}
			>
				{props.question.vote}{" "}
				<img src={like} width="20" height="20" className="ms-2" alt="" />
			</div>
			<div className="col-auto d-flex align-items-center mt-2 mb-2">
				{props.userType === "participant" ? (
					<button
						className={`btn ${
							voted || props.question.answered
								? "btn-outline-danger disabled"
								: "btn-danger"
						}`}
						onClick={() => {
							updateQuestion(
								props.question,
								props.question.answered,
								props.question.vote + 1
							);
							setVoted(true);
						}}
						style={{ width: "90px" }}
					>
						{voted ? "Upvoted" : "Vote"}
					</button>
				) : (
					<button
						className={`btn ${
							props.question.answered
								? "btn-outline-light disabled"
								: "btn-success"
						}`}
						onClick={() => {
							updateQuestion(props.question, true, props.question.vote);
						}}
						style={{ width: "100px" }}
					>
						{props.question.answered ? "Answered" : "Answer"}
					</button>
				)}
			</div>
		</div>
	);
};

export default Question;
