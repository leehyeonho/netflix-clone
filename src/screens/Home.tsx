import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import Pagination from "../components/Pagination";
import { useQuery } from "@tanstack/react-query";
import { getPopular, makeImagePath } from "../api/api";
import Loading from "../components/Loading";

const Loader = styled.span`
    text-align: center;
`

const Container = styled.div`
    margin-top: 1.3rem;
`

const Title = styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1.2rem;
    line-height: 1.2rem;
    padding-bottom: 0.5rem;
`

const TitleChar = styled.span<{ index: number }>`
    position: relative;
    margin: 0.25rem 0;
    display: inline-block;
    animation: bounce 2.0s ease infinite alternate;
    font-size: 1rem;
    color: #FFF;
    text-shadow: 0 1px 0 #CCC,
                0 2px 0 #CCC,
                0 3px 0 #CCC,
                0 4px 0 #CCC,
                0 5px 0 #CCC,
                0 6px 0 transparent,
                0 7px 0 transparent,
                0 8px 0 transparent,
                0 9px 0 transparent,
                0 10px 10px rgba(0, 0, 0, .4);

    ${({ index }) => css`
        animation-delay: ${0.05 * index}s;
    `}

    @keyframes bounce {
    0% {

    }
    90% {
        top: 0px;
    }
    100% {
        top: -10px;
    }
    }
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.5rem 0.02rem;
    max-width: 1200px;
    margin: auto;
    position: relative;
    min-width: 200px;
    min-height: 4rem;
`;

const GridItem = styled.div<{index: number}>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.3rem;
    border-radius: 12.5%;
    animation: fadeIn 0.7s ease forwards normal;
    opacity: 0;

    ${({ index }) => css`
        animation-delay: ${0.15 * index}s;
    `}

    @keyframes fadeIn {
        100% {
            opacity: 1
        }
    }

    &:hover {
        transition: ease 1.4s;
        background-color: #fff;

        img {
            transform: scale(1.1);
        }
    }
`;

const ItemName = styled.div`
    font-size: 0.64rem;
    text-align: center;
    width: 150px;
    height: calc(0.44rem * 3);
    line-height: 0.44rem;
`;

const ItemImage = styled.img`
    box-sizing: border-box;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    transition: .3s;
    box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, 0.5);
    padding: 5px;
    background-color: white;
`;

type Movie = {
    adult: boolean,
    backdrop_path: string,
    genre_ids: Array<number>,
    id: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

type Popular = {
    page: number,
    results: Array<Movie>,
    total_pages: number,
    total_results: number
}

function Home(){
    const { isLoading, data } = useQuery<Popular>(["popular"], getPopular);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(25);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            
            if (width < 402) {
                setSize(5);
            } else if (width < 602) {
                setSize(10);
            } else if (width < 804) {
                setSize(15);
            } else if (width < 1005) {
                setSize(20);
            } else {
                setSize(25);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
          };
    }, [])

    useEffect(() => {
        const pageFromParams = searchParams.get("page");
        if (pageFromParams) {
            setPage(Number(pageFromParams));
        }
    }, [size, searchParams]);
    
    return <>
        <Container key={page}>
            <Title>
                {
                    "Disney Characters".split("").map((char, index) => (
                        <TitleChar index={index}>{char === " " ? '\u00A0' : char}</TitleChar>
                    ))
                }
            </Title>
            <GridContainer>
            {
                !isLoading ? data?.results.map((movie, index) => (
                    <GridItem index={index}>
                        <Link to={`/movie/${movie.id}`} state={{title: movie.title, imageUrl: movie.poster_path}}>
                            <ItemImage
                                src={makeImagePath(movie.poster_path)}
                                alt={movie.title}
                            />
                            <ItemName>
                                {movie.title}
                            </ItemName>
                        </Link>
                    </GridItem>
                )) : <Loading />
            }
            </GridContainer>
            <Pagination total={data === undefined ? 0 : data.total_pages} size={size} limit={10} page={page} setPage={setPage} />
        </Container>
    </>
}
export default Home;