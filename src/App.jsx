import { Routes, Route } from "react-router-dom";

import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import RegisterCustomer from "./components/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Services from "./pages/Services.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import CurrencyConverter from "./pages/CurrencyConverter.jsx";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<RegisterCustomer />} />
				<Route path="/about" element={<About />} />
				<Route path="/services" element={<Services />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/currency-converter" element={<CurrencyConverter />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
