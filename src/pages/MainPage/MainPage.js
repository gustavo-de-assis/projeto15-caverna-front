import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProjectContext } from "../../constants/Context";
import { StyledPage } from "../../theme/Styles";
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";


export default function MainPage() {
    const navigate = useNavigate();
    const { setTargetProduct } = useContext(ProjectContext);
    const [productList, setProductList] = useState([]);

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

    if (productList === [] || productList === null) {
        return <MainContent>
            Carregando...
        </MainContent>
    }

    return (
        <StyledPage>
            <PageHeader>
                <img src="https://imgur.com/knHSdSr.png" alt="" />
                <HeaderForm>
                    <input type="text" placeholder="Digite o jogo que deseja" />
                    <button>
                        <AiOutlineSearch/>
                    </button>
                </HeaderForm>

                <Link to="/cart">
                    <AiOutlineShoppingCart 
                        style={{fontSize: '30px',
                                textDecoration : "none", 
                                color : 'black'}
                    } />
                </Link>

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
    height: 100px;

    background-color: #ccc;

    display: flex;
    flex-direction: row;

    justify-content: space-evenly;
    align-items: center;
    img {
        width: 200px;
    }
    input {
        height: 30px;
        border: 2px solid #ccc;
        border-radius: 10px;
    }

    position: fixed;
    top: 0;
    left: 0;
`;

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
    margin-top: 110px;
`;
const PageHighLights = styled.div`
    width: 100%;
    height: 250px;

    background-color: #eef;
    display: flex;
    flex-flow: row nowrap;
    overflow-x: scroll;
`;
const HighLight = styled.div`
    img {
        aspect-ratio: 13/9;
        width: 350px;
        margin: 15px;
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
