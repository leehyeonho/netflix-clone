import styled from "styled-components";
import Navigiation from "./Navigation";

const MainHeader = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(20, 20, 20, 1);
    z-index: 100;
    transition: background-color 0.3s ease;
`;

function Header(){
    return <MainHeader>
        <Navigiation />
    </MainHeader>
}

export default Header;