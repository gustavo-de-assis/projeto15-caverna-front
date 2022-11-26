import { useContext } from "react";
import styled from "styled-components";
import { ProjectContext } from "../../constants/Context";
import { StyledPage } from "../../theme/Styles";

export default function CartPage() {
	const { targetProduct } = useContext(ProjectContext);
	return <StyledPage>CartPage Test</StyledPage>;
}
