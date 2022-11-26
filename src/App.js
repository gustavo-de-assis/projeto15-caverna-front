import { useState } from "react";
import GlobalStyle from "./theme/globalStyles";
import { ProjectContext } from "./constants/Context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import PurchasePage from "./pages/PurchasePage/PurchasePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import MainPage from "./pages/MainPage/MainPage";
import CartPage from "./pages/CartPage/CartPage";

function App() {
	// State to hold user information after login
	const [user, setUser] = useState({});

	const [targetProduct, setTargetProduct] = useState({});

	const [search, setSearch] = useState("");

	return (
		<ProjectContext.Provider
			value={{
				user,
				setUser,
				targetProduct,
				setTargetProduct,
				search,
				setSearch,
			}}
		>
			<BrowserRouter>
				<GlobalStyle />
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/signUp" element={<SignUpPage />} />
					<Route path="/main" element={<MainPage />} />
					<Route path="/product" element={<ProductPage />} />
                    <Route path="/cart" element={<CartPage />} />
					<Route path="/purchase" element={<PurchasePage />} />
				</Routes>
			</BrowserRouter>
		</ProjectContext.Provider>
	);
}

export default App;
