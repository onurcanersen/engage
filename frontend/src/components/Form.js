import { useState } from "react";

const Form = (props) => {
	const [question, setQuestion] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		if (question) {
			props.sendQuestion({ content: question, sessionCode: props.sessionCode });
			setQuestion("");
		}
	};
	return (
		<form onSubmit={handleSubmit} className="bg-light p-3 rounded shadow">
			<div className="form-group">
				<label htmlFor="question" className="mb-3">
					Ask a question to the presenter!
				</label>
				<textarea
					className="form-control mb-3"
					id="question"
					onChange={(e) => setQuestion(e.target.value)}
					rows="3"
					placeholder="Enter your question"
					value={question}
				></textarea>
				<button className="btn btn-success" type="submit">
					Add Question
				</button>
			</div>
		</form>
	);
};

export default Form;
