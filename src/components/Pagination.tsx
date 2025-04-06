import { SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Page = styled.span<{ active?: boolean }>`
    background-color: ${({ active }) => active ? '#aaa' : '#4d4d4d'};
    display: inline-block;
    height: 2px;
    margin-left: 1px;
    width: 12px;

    &:hover {
        font-size: ${({ active }) => (active ? "1rem" : "0.7rem")};
    }
`;

const PageInput = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    span {
        font-size: 0.45rem;
        margin: 0 0.2rem;
    }

    input {
        width: 50px;
        height: 30px;
        font-size: 15px;
        border: 0;
        border-radius: 5px;
        outline: none;
        background-color: rgb(233, 233, 233);
        font-size: 0.55rem;
        padding-left: 0.21rem;
        margin: 0.15rem;
        font-family: 'honk';
    }

    a {
        width: 60px;
        height: 30px;
        line-height: 30px;
        border-radius: 12.5%;
        box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.5);
        text-align: center;
        font-family: 'honk';
        font-size: 0.45rem;
        background-color: #00d2d3;
        cursor: pointer
    }
`

const Pagination = ({total, size, page} : { total: number, size: number, page: number }) => {
    if (!total) {
        return <></>;
    }

    const totalPages = Math.ceil(total / size);

    return <>
        <PaginationContainer>
            {
                Array.from({ length: totalPages}, (_, i) => i++).map((p) => (
                    <Page key={p} active={page - 1 === p}></Page>
                ))
            }

        </PaginationContainer>
    </>;
}

export default Pagination;