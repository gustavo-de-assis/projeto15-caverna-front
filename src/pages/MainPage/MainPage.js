import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProjectContext } from "../../constants/Context";
import { StyledPage } from "../../theme/Styles";

import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md"

export default function MainPage() {
    const navigate = useNavigate();
    const { setTargetProduct, search, setSearch, user } = useContext(ProjectContext);
    const [productList, setProductList] = useState([]);
    const [tracker, setTracker] = useState(0);

    useEffect(() => {
        const URL = "http://localhost:5000/products";
        axios.get(URL)
            .then((ans) => {
                setProductList(ans.data)
            }
            ).catch((err) => {
                console.log(err.response.data);
            })
    }, []);

    function enterProdPage(product) {
        setTargetProduct(product);
        navigate(`/product`);
    }

    function enterCartPage(){
        console.log(user);

        if(!user.email){
            navigate("/");
        }
        else{
            navigate("/cart")
        }
    }

    function searchGame(event) {
        event.preventDefault();
        // Identify Enter keyUp
        if (event.keyCode === 13) {
            console.log(productList);
            // Get obj of searched game
            const result = productList.find(
                (element) => element.name.toLowerCase() === search.toLowerCase()
            );

            // If game is in database, go to product page
            if (result) {
                setTracker(tracker + 1);
                setTargetProduct(result);
                navigate("/product");
            } else {
                alert("Infelizmente não temos esse jogo =/");
            }
        }
    }

    if (productList === [] || productList === null) {
        return <MainContent>
            Carregando...
        </MainContent>
    }

    const topMenuHeight = "110px";

    return (
        <StyledPage>
            <PageHeader>
                <img src="https://imgur.com/knHSdSr.png" alt="" />
                <HeaderForm onSubmit={searchGame}>
                    <input
                        type="text"
                        placeholder="Digite o jogo que deseja"
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyUp={searchGame}
                    />
                    <button type="submit">
                        <AiOutlineSearch />
                    </button>
                </HeaderForm>

                <UserContent>
                    <div>
                        <AiOutlineShoppingCart onClick={enterCartPage}/>
                        <MdOutlineLogout />
                    </div>
                    <p>Bem vindo, Usuário</p>
                </UserContent>

            </PageHeader>

            <MainContent>
                <PageHighLights>
                    {productList.map((p, idx) => (
                        <HighLight key={idx}>
                            <img src={p.image} alt="" />
                        </HighLight>
                    ))}
                </PageHighLights>
                <ProductList>
                    {productList.map((p, idx) => (
                        <ProductContainer
                            key={idx}
                            onClick={() => enterProdPage(p)}
                        >
                            <img src={p.image} alt="" />
                            <div>
                                <h1>{p.name}</h1>
                                <p>{p.description}</p>
                                <h1 style={{ color: "orange" }}>R$ {p.price}</h1>
                            </div>
                        </ProductContainer>
                    ))}
                </ProductList>
            </MainContent>
        </StyledPage>
    );
}

const PageHeader = styled.div`
   	width: 100%;
	background-color: #ccc;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
	height: ${(props) => props.topMenuHeight};

	img {
		width: 150px;
	}
	input {
		height: 30px;
		border-radius: 10px;
		text-indent: 5px;
	}
`;

const UserContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    div{
        display: flex;
        font-size: 30px;
        gap: 10px;
        margin: auto;
    }
    p{
        font-size: 10px;
    }
`

const HeaderForm = styled.form`
    position: relative;

    input{
        padding-left: 5px;
    }

    button{
        border: 1px solid transparent;
        background-color: inherit;

        position: absolute;
        right: 12px;
        top: 7px;
        z-index: 2;
        :hover{
            cursor: pointer;
            opacity: 0.7;
        }
    }
`

const MainContent = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
    margin-top: 150px;
`;
const PageHighLights = styled.div`
    width: 100%;
    height: 250px;

    background-color: #fff;
    display: flex;
    flex-flow: row nowrap;
    overflow-x: hidden;
`;
const HighLight = styled.div`
    width: 600px;
    
    display: flex;
    flex-direction: row wrap;
    margin: 100px;
    
    justify-content: space-around;
    align-items: center;
    img {
        aspect-ratio: 13/9;
        width: 350px;
        margin: 0 auto;
    }
`;

const ProductList = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    margin: 30px;
`;
const ProductContainer = styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 7px;
    border: 1px solid #888;
    div {
        display: flex;
        flex-direction: column;
        padding: 10px;
    }
    p, h1 {
        margin-top: 10px;
    }
    img {
        aspect-ratio: 1/1;
        width: 110px;
        margin: 10px;
    }
    :hover {
        opacity: 0.8;
        background-color: #ddd;
    }
    margin: 8px 0;
`;
