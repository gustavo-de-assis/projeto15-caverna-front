import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProjectContext } from "../../constants/Context";
import { completePurchaseUrl, userCartUrl } from "../../constants/urls";

export default function PurchasePage() {
	const { user } = useContext(ProjectContext);
	const [singleGames, setSingleGames] = useState([]);
	const topMenuHeight = "110px";
	const navigate = useNavigate();
	let listHolder;
	let gameArr = [];

	useEffect(() => {
		const config = {
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		};

		axios
			.get(userCartUrl, config)
			.then((res) => {
				listHolder = res.data;
				listHolder.forEach((product) => {
					if (!gameArr.includes(product.name)) {
						gameArr.push(product.name);
					}
					setSingleGames(gameArr);
				});
			})
			.catch((err) => console.log(err.response.data));

		axios
			.post(completePurchaseUrl, {}, config)
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	}, []);

	return (
		<StyledPage>
			<PageHeader topMenuHeight={topMenuHeight}>
				<Link to={"/main"}>
					<img src="https://imgur.com/knHSdSr.png" alt="" />
				</Link>
				<UserContent>Parabéns, {user.name}!</UserContent>
			</PageHeader>
			<StyledBody topMenuHeight={topMenuHeight}>
				<StyledHead>
					Parabéns pela sua compra! Daqui a pouco a diversão chega a
					sua casa!
				</StyledHead>
				<StyledP>Você comprou:</StyledP>
				<StyledList>
					{singleGames.map((gameName, idx) => (
						<li key={idx}>{gameName}</li>
					))}
				</StyledList>
				<StyledButton
					onClick={() => {
						navigate("/main");
					}}
				>
					Voltar para a página principal
				</StyledButton>
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

const StyledList = styled.ul`
	display: flex;
	flex-direction: column;
	list-style-type: circle;

	li {
		text-align: left;
		font-size: 20px;
	}
`;

const StyledHead = styled.p`
	font-size: 25px;
	font-weight: 700;
	color: black;
	width: 300px;
	margin: 20px 0;
	text-align: center;
`;

const StyledP = styled.p`
	font-size: 22px;
	font-weight: 700;
	color: goldenrod;
	margin-bottom: 5px;
`;

const StyledButton = styled.button`
	width: 300px;
	height: 60px;
	background-color: goldenrod;
	color: black;
	font-size: 20px;
	text-align: center;
	margin: 30px 0;
	border-radius: 10px;
`;
