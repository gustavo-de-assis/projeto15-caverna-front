import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProjectContext } from "../../constants/Context";
import { StyledPage } from "../../theme/Styles";

export default function MainPage() {
    const navigate = useNavigate();
    const { setTargetProduct } = useContext(ProjectContext);
    const [productList, setProductList] = useState([]);
    
    useEffect(()=>{
        const URL = "http://localhost:5000/products";
        axios.get(URL)
        .then((ans)=> {
            setProductList(ans.data)
        }
        ).catch((err)=>{
            console.log(err.response.data);
        })
    },[]);

    function enterProdPage(product) {
        setTargetProduct(product);
        navigate(`/product`);
    }

    if(productList === [] || productList === null){
        return <MainContent>
            Carregando...
        </MainContent>
    }

    return (
        <StyledPage>
            <PageHeader>
                <img src="https://imgur.com/knHSdSr.png" alt="" />

                <input type="text" placeholder="O que você busca?" />
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
                                <p>{p.name}</p>
                                <p>{p.description}</p>
                                <p>R$ {p.price}</p>
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
    border-radius: 8px;
    border: 2px solid #888;
    div {
        display: flex;
        flex-direction: column;
        padding: 10px;
    }
    p {
        margin-top: 10px;
    }
    img {
        aspect-ratio: 1/1;
        width: 110px;
    }
    :hover {
        opacity: 0.8;
        background-color: #ddd;
    }
    margin: 8px 0;
`;
