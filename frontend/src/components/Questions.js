import Question from "./Question/Question";

const Questions = (props) => {
	return (
		<div>
			{props.questions
				.sort((a, b) => b.vote - a.vote)
				.sort((a, b) => a.answered - b.answered)
				.map((question) => (
					<Question
						question={question}
						questions={props.questions}
						setQuestions={props.setQuestions}
						userType={props.userType}
						key={question.id}
					/>
				))}
		</div>
	);
};

export default Questions;
