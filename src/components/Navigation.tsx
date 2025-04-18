import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from "react";

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 20px;
    font-size: 0.5rem;
    height: 50px;
`;

const NavRight = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

const NavLeft = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 20px;
`

const Logo = styled(motion.svg)`
    font-size: 1.8rem;
    font-weight: bold;
    text-transform: uppercase;

    & a {
        color: #E50914;
    }
`;

const Search = styled.div`
      cursor: pointer;
`;

const SearchForm = styled.form`

`;

const SearchIcon = styled.svg`
    
`;

const SearchInput = styled(motion.input)`
    background: transparent;
    border: none;
    box-sizing: border-box;
    color: #fff;
    display: inline-block;
    font-size: 14px;
    outline: none;
    padding: 7px 14px 7px 7px;
    width: 212px;
    border: 1px solid #fff;
`;

const NavLinks = styled.ul`
    display: flex;
`;

const NavLinkItem = styled.li`
    display: block;
    text-align: center;
    font-weight: bold;
    cursor: pointer;

    a {
        display: block;
        color: #fff;
        padding: 0.3rem;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: color 0.3s ease;

        &:hover {
            color: #535353;
        }
    }
`;

function Navigiation() {
    const [showInput, setShowInput] = useState(false);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            const target = e.target as HTMLElement;

            // input 또는 아이콘이 아닌 곳을 클릭했는지 확인
            if (
              !target.closest('[data-search-toggle]')
            ) {
              setShowInput(false);
            }
        }
    
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
      }, []);

    return (
        <Nav>
            <NavRight>
                <Link to="/">
                    <Logo whileHover={{
                            scale: 1.1,
                            transition: { duration: .3 },
                        }}
                        width="125" height="32" viewBox="0 0 125 32" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#e50914" d="M 115 14 L 121 30 c -1.75 -0.25 -3.499 -0.563 -5.28 -0.845 l -3.345 -8.686 l -3.437 7.969 c -1.687 -0.282 -3.344 -0.376 -5.031 -0.595 l 6.031 -13.75 L 104.468 0 h 5.063 l 3.062 7.874 L 115.875 0 h 5.125 l -5.937 14.28 z M 100.47 0 h -4.594 v 27.25 c 1.5 0.094 3.062 0.156 4.594 0.343 V 0 z m -8.563 26.937 c -4.187 -0.281 -8.375 -0.53 -12.656 -0.625 V 0 h 4.687 v 21.875 c 2.688 0.062 5.375 0.28 7.969 0.405 v 4.657 z M 74.25 10.657 v 4.687 h -6.406 V 26 H 63.22 V 0 h 13.125 v 4.687 h -8.5 v 5.97 h 6.406 z M 43 26 L 43 0 L 51 3 l 8 -3 L 59 26 L 54 26 l 0 -19 l -3 4 l -3 -4 l 0 19 Z M 29 0 C 35 0 38 5 38 14 C 38 23 34 27 29 27 C 24 27 20 23 20 14 C 20 5 23 0 29 0 Z M 29 5 C 26 5 25 10 25 14 C 25 18 26 22 29 22 C 32 22 33 18 33 14 C 33 10 32 5 29 5 Z M 4.78 12.968 v 16.375 C 3.094 29.531 1.593 29.75 0 30 V 0 h 4.469 l 6.093 17.032 V 0 h 4.688 v 28.062 c -1.656 0.282 -3.344 0.376 -5.125 0.625 L 4.78 12.968 z"></path>
                    </Logo>
                </Link>
                <NavLinkItem>
                    <Link to="?#popular">인기</Link>
                </NavLinkItem>
                <NavLinkItem>
                    <Link to="#coming">개봉 예정</Link>
                </NavLinkItem>
                <NavLinkItem>
                    <Link to="#now">현재 상영중</Link>
                </NavLinkItem>
            </NavRight>
            <NavLeft>
                <Search>
                    <SearchForm>
                        {showInput ? (
                            <SearchInput
                            data-search-toggle
                            autoFocus
                            placeholder=""
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 212, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            ></SearchInput>
                        ) : (
                            <SearchIcon onClick={() => setShowInput(true)}
                                data-slot="icon" fill="currentColor" width="40" height="40" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clipRule="evenodd" fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"></path>
                            </SearchIcon>
                        )}
                    </SearchForm>
                </Search>
            </NavLeft>
        </Nav>
    )
}

export default Navigiation;