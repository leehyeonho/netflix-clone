import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { getMovie, makeBgPath, makeImagePath } from "../api/api";
import Loading from "../components/Loading";
import { motion } from "framer-motion";

const MovieModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    min-height: 100vh;
    background: rgba(0,0,0,0.7);
`;

const ModalClose = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    z-index: 9999;
`

const MovieDialog = styled(motion.div)<{ bg: string }>`
    position: relative;
    min-width: 70vw;
    min-height: 90vh;
    z-index: 999;

    -webkit-box-pack: center;
    background-position: center top;
    background-size: cover;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgb(0,0,0)),
    ${({ bg }) => `url(${bg})`};
    background-color: #2e2e2e;
    border-radius: .5rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const MovieTitle = styled.div`
`;

const MovieDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: flex-end;
    height: 100%;
    position: absolute;
    bottom: 5%;
    padding: 20px 20px;
`

const PlayButton = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    padding: 5px 20px;
    margin: 10px 0;
    border-radius: 4px;
    font-size: 0.2rem;
    font-weight: 700;
    color: black;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    background-color: rgba(255, 255, 255, 0.9);
`;

const MovieDescription = styled.div`
    display: flex;
    justify-content: space-between;
`;

const MovieOverview = styled.div`
    font-size: 16px;
    width: 50%;
`

const MovieDetail = styled.ul`
    font-size: 14px;
    width: 30%;
`

const MovieDetailItem = styled.li`
    padding: 10px 0;
`

const MovieDetailItemTitle = styled.h1`
    color: #fff;
`

const MovieDetailItemContent = styled.span`
    color: #fff;
`

type Genre = {
    id: number,
    name: string
}

type ProductionCompany = {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
}

type ProductionCountry = {
    iso_3166_1: string,
    name: string
}

type Language = {
    english_name: string,
    iso_639_1: string,
    name: string
}

type Movie = {
    adult: boolean,
    backdrop_path: string,
    // belongs_to_collection: ,
    budget: number,
    // genre_ids: Array<number>,
    genres: Array<Genre>,
    homepage: string,
    id: string,
    imdb_id: string,
    origin_country: Array<string>,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: Array<ProductionCompany>,
    production_countries: Array<ProductionCountry>,
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: Array<Language>,
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

function Movie(){
    const { id } = useParams();
    const { isLoading, data } = useQuery<Movie>(["movie", id], () => getMovie(`${id}`));

    const location = useLocation();
    const title: string = location.state?.title;
    const imageUrl: string = location.state?.imageUrl;

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            const target = e.target as HTMLElement;

            // input 또는 아이콘이 아닌 곳을 클릭했는지 확인
            if (
              !target.closest('[data-modal-toggle]')
            ) {
                
            }
        }
    
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
      }, []);

    return <>
        {
            data ? (
                <MovieModalContainer>
                    <MovieDialog bg={makeBgPath(data.backdrop_path)}>
                        <ModalClose>
                            <Link to="/">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </Link>
                        </ModalClose>
                        <MovieDetailContainer>
                            <MovieTitle>{data.title}</MovieTitle>
                            <PlayButton>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                                </svg>
                                재생
                            </PlayButton>
                            <MovieDescription>
                                <MovieOverview>
                                    {data.overview}
                                </MovieOverview>
                                <MovieDetail>
                                    <MovieDetailItem>
                                        <MovieDetailItemTitle>장르: </MovieDetailItemTitle>
                                        <MovieDetailItemContent>
                                            {data.genres.map((genre, index) => (
                                                genre.name
                                            )).join(', ')}
                                        </MovieDetailItemContent>
                                    </MovieDetailItem>
                                </MovieDetail>
                            </MovieDescription>
                        </MovieDetailContainer>
                    </MovieDialog>
                </MovieModalContainer>
            ) : ''
        }
    </>
}
export default Movie;