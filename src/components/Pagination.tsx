import { SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Page = styled.span<{ active?: boolean }>`
    font-size: ${({ active }) => (active ? "1rem" : "0.5rem")};
    padding: .05rem;
    cursor: pointer;

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

const Pagination = ({total, size, limit, page, setPage} : { total: number, size: number, limit: number, page: number, setPage: (page: number) => void }) => {
    

    const [pageInput, setPageInput] = useState('');
    
    if (!total) {
        return <></>;
    }

    const totalPages = Math.ceil(total / size);
    const currentGroup = Math.ceil(page / limit);
    const startPage = (currentGroup - 1) * limit + 1;
    const endPage = Math.min(startPage + limit - 1, totalPages);

    const hasPrevGroup = currentGroup > 1;
    const hasNextGroup = currentGroup * limit < totalPages;

    const handleInputChange = (e: { target: { value: string; }; }) => {
        const input = e.target.value;
        setPageInput(input);
    };

    return <>
        <PageInput>
            <span>GO TO </span>
            <input onChange={handleInputChange}></input>
            <Link to={`/?page=${pageInput}`}>Page</Link>
            <span>(total: {totalPages})</span>
        </PageInput>
        <PaginationContainer>
            {
                hasPrevGroup ? <Page onClick={() => setPage(currentGroup * limit - limit)}>
                prev
            </Page> : ''
            }
            {
                Array.from({ length: endPage - startPage + 1}, (_, i) => startPage + i).map((p) => (
                    <Page key={p} active={page === p} onClick={() => setPage(p)}>{p}</Page>
                ))
            }
            {
                hasNextGroup ? <Page onClick={() => setPage(currentGroup * limit + 1)}>
                Next
            </Page> : ''
            }

        </PaginationContainer>
    </>;
}

export default Pagination;