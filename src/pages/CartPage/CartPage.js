import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProjectContext } from "../../constants/Context";
import { StyledPage } from "../../theme/Styles";
import { MdCancelPresentation } from "react-icons/md";
import { userCartUrl } from "../../constants/urls";
import axios from "axios";

export default function CartPage() {
    const [usrCart, setUsrCart] = useState([]); // cart content
    const { user } = useContext(ProjectContext);
    const [nChanges, setNChanges] = useState(0);

    const navigate = useNavigate();
    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    };

    useEffect(() => {
        axios
            .get(userCartUrl, config)
            .then((res) => {
                setUsrCart(res.data);
            })
            .catch((err) => console.log(err.response.data));
    }, [nChanges]);

    async function deleteItem(idx) {
        if (
            window.confirm(
                "Tem certeza que gostaria de retirar esse jogo do seu carrinho?"
            )
        ) {
            try {
                const url = `${userCartUrl}/${idx}`;
                await axios.delete(url, config);
                setNChanges(nChanges + 1);
            } catch (err) {
                alert("Houve um erro na remoção do seu item");
                console.log(err.response.data);
            }
        }
    }

    let purchase = 0;
    usrCart.map((p) => (purchase += p.price));
    const topMenuHeight = "110px";

    return (
        <StyledPage>
            <PageHeader>
                <Link to={"/main"}>
                    <img src="https://imgur.com/knHSdSr.png" alt="" />
                </Link>
            </PageHeader>
            <MainContent>
                <CartTable>
                    {usrCart.length === 0 ? (
                        <p>Ainda não há items no carrinho</p>
                    ) : (
                        usrCart.map((item, idx) => (
                            <CartItem key={idx}>
                                <img src={item.image} alt="" />
                                <p>{item.name}</p>
                                <p>R${item.price}</p>
                                <button onClick={() => deleteItem(idx)}>
                                    <MdCancelPresentation />
                                </button>
                            </CartItem>
                        ))
                    )}
                </CartTable>
                <p> Total: {purchase}</p>
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
const MainContent = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
    margin-top: 150px;
`;
const CartTable = styled.div`
    width: 80%;
    height: 500px;

    display: flex;
    flex-direction: column;
    align-items: center;

    overflow: hidden;
`;
const CartItem = styled.div`
    width: 95%;
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    border: 1px solid #ddd;
    border-radius: 3px;

    img {
        width: 50px;
        padding: 0 20px;
        margin-top: 10px;
    }
    button {
        color: red;
        font-size: 22px;
        background-color: inherit;
        padding-right: 5px;
        :hover {
            color: #aa2255;
            cursor: pointer;
        }
    }
`;
