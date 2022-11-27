import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProjectContext } from "../../constants/Context";
import { productsUrl, userCartUrl } from "../../constants/urls";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { MdOutlineLogout } from "react-icons/md";

export default function ProductPage() {
    const {
        targetProduct,
        setTargetProduct,
        search,
        setSearch,
        user,
        setUser,
    } = useContext(ProjectContext);
    const [game, setGame] = useState({});
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [tracker, setTracker] = useState(0);

    useEffect(() => {
        setGame(targetProduct);
        const fetchData = async () => {
            const response = await axios.get(productsUrl);
            setProducts(response.data);
        };

        fetchData().catch((err) => {
            console.log(err);
        });
    }, [tracker]);

    function searchGame(event) {
        // Identify Enter keyUp
        if (event.keyCode === 13) {
            console.log(products);
            // Get obj of searched game
            const result = products.find(
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
        // }
    }

    function addToCart() {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
       // const URL = "http://localhost:5000/cart";

        axios
            //.put(URL, game, config)
            .put(userCartUrl, game, config)
            .then((ans) => {})
            .catch((err) => {
                console.log(err.response.data);
            });

        navigate("/cart");
    }

    function enterCartPage() {
        console.log(user);

        if (!user.email) {
            navigate("/");
        } else {
            navigate("/cart");
        }
    }

    function logOut() {
        setUser({});
        navigate("/");
    }

    const topMenuHeight = "110px";

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
                <UserContent>
                    <div>
                        <AiOutlineShoppingCart
                            onClick={enterCartPage}
                            style={{ cursor: "pointer" }}
                        />
                        <MdOutlineLogout
                            onClick={logOut}
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                    {user.name ? (
                        <p>Bem vindo, {user.name}! </p>
                    ) : (
                        <Link to="/">
                            <p>Faça Login!</p>
                        </Link>
                    )}
                </UserContent>
            </PageHeader>
            <StyledBody topMenuHeight={topMenuHeight}>
                <StyledGameName>{game.name}</StyledGameName>
                <StyledImg src={game.image} />
                <StyledTitle>
                    <h1>Descrição do jogo</h1>
                    <p>{game.description}</p>
                </StyledTitle>
                <StyledPrice>R$ {game.price}</StyledPrice>
                <StyledBuyButton onClick={addToCart}>
                    <IconContext.Provider value={{ size: "25px" }}>
                        <AiOutlineShoppingCart />
                    </IconContext.Provider>
                    <p>Adicionar ao carrinho</p>
                </StyledBuyButton>
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
    margin-top: 15px;
`;

const StyledImg = styled.img`
    width: 70%;
    margin-top: 10px;
`;

const StyledTitle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    margin: 10px 10px;

    h1 {
        font-size: 20px;
        font-weight: 700;
    }

    p {
        margin-top: 10px;
        text-align: left;
    }
`;

const StyledPrice = styled.h1`
    color: goldenrod;
    font-size: 25px;
    font-weight: 700;
    text-align: center;
`;
const StyledBuyButton = styled.button`
    display: flex;
    width: 250px;
    height: 40px;
    margin: 10px 0 20px 0;
    background-color: goldenrod;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 10px;

    p {
        color: black;
        font-size: 20px;
        font-weight: 700;
        height: 100%;
        display: flex;
        align-items: center;
    }
`;

const UserContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    div {
        display: flex;
        font-size: 30px;
        gap: 10px;
        margin-bottom: 5px;
    }
    p {
        font-size: 10px;
    }
    a {
        text-decoration: none;
        color: black;
    }
`;
