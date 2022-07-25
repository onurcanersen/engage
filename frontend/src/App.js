import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Participant from "./pages/Participant";
import Presenter from "./pages/Presenter";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="participant" element={<Participant />} />
				<Route path="presenter" element={<Presenter />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
