import { useContext, useEffect } from "react";
import styled from "styled-components";
import { ProjectContext } from "../../constants/Context";
import { StyledPage } from "../../theme/Styles";

export default function CartPage() {

	const { targetProduct } = useContext(ProjectContext);
	useEffect(()=>{

	},[]);
	const topMenuHeight = "110px";

	return <StyledPage>
		<PageHeader>
			<img src="https://imgur.com/knHSdSr.png" alt="" />
		</PageHeader>
		<MainContent>
			<CartTable>
				
			</CartTable>
		</MainContent>

		
	</StyledPage>;
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

`
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
	
	background-color: #efe;

	overflow: hidden;
`