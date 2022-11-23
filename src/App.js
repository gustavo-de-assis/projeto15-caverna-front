import { useState } from "react";
import GlobalStyle from "./theme/globalStyles";
import {ProjectContext} from "./constants/Context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import PurchasePage from "./pages/PurchasePage/PurchasePage";

function App() {
    // State to hold user information after login
    const [user, setUser] = useState({name:'', token:'', cart:[]}) 
    
    return (
        <ProjectContext.Provider value={{user, setUser}}>
            <BrowserRouter>
                <GlobalStyle />
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route
                        path="/product/:productId"
                        element={<ProductPage />}
                    />
                    <Route
                        path="/purchase/:productId"
                        element={<PurchasePage />}
                    />
                </Routes>
            </BrowserRouter>
        </ProjectContext.Provider>
    );
}

export default App;
