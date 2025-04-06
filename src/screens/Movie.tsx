import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { getMovie } from "../api/api";
import Loading from "../components/Loading";

const Container = styled.div`
    margin-top: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const MovieContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const MovieImage = styled.img`
    box-sizing: border-box;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    transition: .3s;
    box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, 0.5);
    padding: 5px;
    background-color: white;
    
`

const MovieName = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1.2rem;
    line-height: 1.2rem;
    padding-bottom: 0.5rem;

    & span {
        
    }
`

const MovieNameChar = styled.span<{ index: number }>`
    position: relative;
    margin: 0.25rem 0;
    display: inline-block;
    animation: bounce 2.5s ease infinite alternate;
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
`

const MovieFilms = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    min-width: 200px;
    min-height: 2rem;
`

const MovieFilm = styled.div<{ index: number }>`
    position: relative;
    top: -10px;
    padding: 0.1rem;
    margin: 0.15rem 0;
    width: 12rem;
    border-radius: .3rem;
    opacity: 0;
    background-color: #ddd;
    animation: fadeIn 1.8s ease forwards normal;

    ${({ index }) => css`
        animation-delay: ${0.7 * index}s;
    `}

    box-shadow: 2px 2px 7px 0px rgba(0, 0, 0, 0.5);

    p {
        padding: 0.1rem;
        font-size: 0.7rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: .3rem;
    }

    @keyframes fadeIn {
    100% {
        top: 0;
        opacity: 1;
    }
    }
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

    return <>
        <Container>
            {
                <MovieContainer>
                    <MovieImage src={imageUrl} />
                    <MovieName>
                        {title.split("").map((char, index) => (
                            <MovieNameChar index={index}><span>{char === " " ? '\u00A0' : char}</span></MovieNameChar>
                        ))}
                    </MovieName>
                </MovieContainer>
            }
        </Container>
    </>
}
export default Movie;