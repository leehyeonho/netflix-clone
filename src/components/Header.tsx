import styled from "styled-components";
import Navigiation from "./Navigation";

const MainHeader = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 50px;
    background-color: rgba(20, 20, 20, 0.9);
    z-index: 100;
    transition: background-color 0.3s ease;
`;

function Header(){
    return <MainHeader>
        <Navigiation />
    </MainHeader>
}

export default Header;