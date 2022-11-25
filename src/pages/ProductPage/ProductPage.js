import { eventWrapper } from "@testing-library/user-event/dist/utils";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProjectContext } from "../../constants/Context";
import { products } from "../../constants/products";

export default function ProductPage() {
    const { targetProduct, setTargetProduct, search, setSearch } =
        useContext(ProjectContext);
    const [game, setGame] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setGame(targetProduct);
    }, []);
    

    function searchGame(event) {
        // Identify Enter keyUp
        if (event.keyCode === 13) {
            // Get obj of searched game
            const result = products.find(
                (element) => element.name === search.toLowerCase()
            );

            // If game is in database, go to product page
            if (result) {
                setTargetProduct(result);
                navigate("/product");
            } else {
                alert("Infelizmente não temos esse jogo =/");
            }
        }
        // }
    }

    const topMenuHeight = "150px";

    return (
        <StyledPage>
            <PageHeader topMenuHeight={topMenuHeight}>
                <Link to={"/main"}>
                    <img src="https://imgur.com/knHSdSr.png" alt="" />
                </Link>
                <input
                    type="text"
                    placeholder="Digite o jogo que deseja"
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    onKeyUp={searchGame}
                />
            </PageHeader>
            <StyledBody topMenuHeight={topMenuHeight}>
                <StyledGameName>{game.name}</StyledGameName>
                <StyledImg src={game.image}/>
            </StyledBody>
        </StyledPage>
    );
}

const StyledPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

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

const StyledBody = styled.div`
    margin-top: ${(props) => props.topMenuHeight};
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledGameName = styled.h1`
    width: 100%;
    text-align: center;
    font-size: 30px;
    margin-top: 30px;
`;

const StyledImg = styled.img`
    width: 70%;
    margin-top: 30px;
`