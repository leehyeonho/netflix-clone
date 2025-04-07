import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams, useMatch } from "react-router-dom";
import styled, { css } from "styled-components";
import Pagination from "../components/Pagination";
import { useQuery } from "@tanstack/react-query";
import { getComingSoon, getNowPlaying, getPopular, makeBgPath, makeImagePath } from "../api/api";
import Loading from "../components/Loading";
import { HTMLMotionProps, motion } from "framer-motion";

const Loader = styled.div`
    text-align: center;
`

const Container = styled.div`
    margin-top: 90px;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
`

const TodayMovieContainer = styled.div<{ bg?: string }>`
    position: relative;
    min-height: 1000px;
    -webkit-box-pack: center;
    background-size: cover;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgb(0,0,0)),
    ${({ bg }) => `url(${bg})`};
    
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const TodayMovieInfo = styled.div`
    display: flex;
    width: 450px;
    flex-direction: column;
    justify-content: flex-end;
    position: absolute;
    top: 0;
    left: 4%;
    bottom: 30%;
    z-index: 10;
`;

const TodayMovieTitle = styled.div`
    font-size: 0.7rem;
    margin: 10px 0;
`;

const TodayMovieOverview = styled.div`
    font-size: 0.4rem;
    margin: 10px 0;
`;

const Top10 = styled.p`
    display: flex;
    align-items: center;
    font-size: 0.43rem;
`

const Top10Icon = styled.svg`
    height: 0.65rem;
    width: 0.65rem;
`

const TodayMovieButton = styled.div`
    display: flex;
    justify-items: center;
    align-items: center;
    width: fit-content;
    padding: 10px 30px;
    margin: 10px 0;
    border-radius: 4px;
    font-size: 0.3rem;
    font-weight: 700;
    color: black;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    background-color: rgba(255, 255, 255, 0.9);
`;

const MoviesContainer = styled.div`

`;

const CategorizeContainer = styled.div`
    
`

const CategorizeList = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const CategorizeListControl = styled(motion.div)< { bg: string } >`
    width: 4%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto;
    cursor: pointer;
    background-image: url(${ props => props.bg });
`

const MovieCardList = styled.div`
    width: 92%;
    display: flex;
`

const MovieCard = styled.div<{ bg?: string }>`
    width: 300px;
    min-height: 200px;
    margin: 0 5px;
    background-size: cover;
    background-image: ${({ bg }) => `url(${bg})`};
    cursor: pointer;
    border-radius: 5px;
    transition: 1s ease;

    &:hover {
        scale: 1.3;
    }
`

const CategorizeInfo = styled.div`
    padding: 1% 4%;
    display: flex;
    justify-content: space-between;
`

const CategorizeTitle = styled.div`
    font-size: 18px;
`;

const MovieModalContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
`;

const MovieDialog = styled(motion.div)`
    position: absolute;
    top: 2rem;
    left: auto;
    width: 700px;
    min-height: 1000px;
    z-index: 999;
    background-color: #2e2e2e;
    border-radius: .5rem;
`;

const MoviePoster = styled.div`
`;

const MovieDetail = styled.div`
    
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

type Movies = {
    page: number,
    results: Array<Movie>,
    total_pages: number,
    total_results: number
}

function Home(){
    const { isLoading: isPopularLoading, data: popular } = useQuery<Movies>(["popular"], getPopular);
    const { isLoading: isComingLoading, data: coming } = useQuery<Movies>(["coming"], getComingSoon);
    const { isLoading: isNowLoading, data: now } = useQuery<Movies>(["now"], getNowPlaying);
    const [showCardCnt, setShowCardCnt] = useState(1);
    const moviePathMatch = useMatch("/movies/:id");

    const { hash, pathname } = useLocation();
    const navigate = useNavigate();

    const [popularPage, setPopularPage] = useState(1);
    const [comingPage, setComingPage] = useState(1);
    const [nowPage, setNowPage] = useState(1);
    const [searchParams] = useSearchParams();

    const [popularPart, setPopularPart] = useState<Movie[]>([]);
    const [comingPart, setComingPart] = useState<Movie[]>([]);
    const [nowPart, setNowPart] = useState<Movie[]>([]);
  
    useEffect(() => {
        if (!popular || !coming || !now) {
            return;
        }

        const handleResize = () => {
            const windowWidth = window.innerWidth;
            const newShowCardCnt = Math.floor(windowWidth / 300);

            setShowCardCnt(newShowCardCnt);
        };
        handleResize();
        
        window.addEventListener('resize', handleResize);
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, [popular, coming, now]);

    useEffect(() => {
        if (popular) {
            console.log("popular");
            if (popularPart.length === 0) {
                setPopularPart(popular.results.slice(0, showCardCnt));
    
                return;
            }
    
            const first = popularPart[0];
            const popularIndex = popular.results.indexOf(first);
            setPopularPart(popular.results.slice(popularIndex, Math.min(popular.results.length, popularIndex + showCardCnt)))
        }

        if (coming) {
            console.log("coming");
            if (comingPart.length === 0) {
                setComingPart(coming.results.slice(0, showCardCnt));
    
                return;
            }
    
            const first = comingPart[0];
            const comingIndex = coming.results.indexOf(first);
            setComingPart(coming.results.slice(comingIndex, Math.min(coming.results.length, comingIndex + showCardCnt)))
        }

        if (now) {
            if (nowPart.length === 0) {
                setNowPart(now.results.slice(0, showCardCnt));
    
                return;
            }
    
            const first = nowPart[0];
            const nowIndex = now.results.indexOf(first);
            setNowPart(now.results.slice(nowIndex, Math.min(now.results.length, nowIndex + showCardCnt)))
        }

        
    }, [showCardCnt, popular, coming, now, setPopularPart, setComingPart, setNowPart]);

    useEffect(() => {
        if (hash) {
        const el = document.querySelector(hash);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });

            setTimeout(() => {
                navigate(pathname, { replace: true });
              }, 500);
        }
        }
    }, [hash]);

    useEffect(() => {
        if (!popular) {
            return;
        }

        const total = popular.results.length;
        const first = popularPart[0];
        const popularIndex = popular.results.indexOf(first);

        console.log("total:", total, " first:", first, " popularIndex:", popularIndex, " showCardCnt:", showCardCnt);

        setPopularPart(popular.results.slice((popularPage - 1) * showCardCnt, popularPage * showCardCnt))
    }, [popularPage])

    useEffect(() => {
        if (!coming) {
            return;
        }

        const total = coming.results.length;
        const first = comingPart[0];
        const comingIndex = coming.results.indexOf(first);

        console.log("total:", total, " first:", first, " comingIndex:", comingIndex, " showCardCnt:", showCardCnt);

        setComingPart(coming.results.slice((comingPage - 1) * showCardCnt, comingPage * showCardCnt))
    }, [comingPage])

    useEffect(() => {
        if (!now) {
            return;
        }

        const total = now.results.length;
        const first = nowPart[0];
        const nowIndex = now.results.indexOf(first);

        console.log("total:", total, " first:", first, " comingIndex:", nowIndex, " showCardCnt:", showCardCnt);

        setNowPart(now.results.slice((nowPage - 1) * showCardCnt, nowPage * showCardCnt))
    }, [nowPage])

    useEffect(() => {
        console.log(moviePathMatch);
    }, [moviePathMatch]);
    
    return <>
        {
            popular ? (
                <Container>
                    <TodayMovieContainer bg={makeBgPath(popular.results[0].poster_path)}>
                        <TodayMovieInfo>
                            <TodayMovieTitle>
                                {popular.results[0].title}
                            </TodayMovieTitle>
                            <Top10>
                                <Top10Icon
                                    viewBox="0 0 28 30" className="svg-icon svg-icon-top-10-badge"><rect x="0" width="28" height="30" rx="3" fill="#e50914"></rect><path d="M16.8211527,22.1690594 C17.4133103,22.1690594 17.8777709,21.8857503 18.2145345,21.3197261 C18.5512982,20.7531079 18.719977,19.9572291 18.719977,18.9309018 C18.719977,17.9045745 18.5512982,17.1081018 18.2145345,16.5414836 C17.8777709,15.9754594 17.4133103,15.6921503 16.8211527,15.6921503 C16.2289952,15.6921503 15.7645345,15.9754594 15.427177,16.5414836 C15.0904133,17.1081018 14.9223285,17.9045745 14.9223285,18.9309018 C14.9223285,19.9572291 15.0904133,20.7531079 15.427177,21.3197261 C15.7645345,21.8857503 16.2289952,22.1690594 16.8211527,22.1690594 M16.8211527,24.0708533 C15.9872618,24.0708533 15.2579042,23.8605988 14.6324861,23.4406836 C14.0076618,23.0207685 13.5247891,22.4262352 13.1856497,21.6564897 C12.8465103,20.8867442 12.6766436,19.9786109 12.6766436,18.9309018 C12.6766436,17.8921018 12.8465103,16.9857503 13.1856497,16.2118473 C13.5247891,15.4379442 14.0076618,14.8410352 14.6324861,14.4205261 C15.2579042,14.0006109 15.9872618,13.7903564 16.8211527,13.7903564 C17.6544497,13.7903564 18.3844012,14.0006109 19.0098194,14.4205261 C19.6352376,14.8410352 20.1169224,15.4379442 20.4566558,16.2118473 C20.7952012,16.9857503 20.9656618,17.8921018 20.9656618,18.9309018 C20.9656618,19.9786109 20.7952012,20.8867442 20.4566558,21.6564897 C20.1169224,22.4262352 19.6352376,23.0207685 19.0098194,23.4406836 C18.3844012,23.8605988 17.6544497,24.0708533 16.8211527,24.0708533" fill="#FFFFFF"></path><polygon fill="#FFFFFF" points="8.86676 23.9094206 8.86676 16.6651418 6.88122061 17.1783055 6.88122061 14.9266812 11.0750267 13.8558085 11.0750267 23.9094206"></polygon><path d="M20.0388194,9.42258545 L20.8085648,9.42258545 C21.1886861,9.42258545 21.4642739,9.34834303 21.6353285,9.19926424 C21.806383,9.05077939 21.8919103,8.83993091 21.8919103,8.56731273 C21.8919103,8.30122788 21.806383,8.09572485 21.6353285,7.94961576 C21.4642739,7.80410061 21.1886861,7.73104606 20.8085648,7.73104606 L20.0388194,7.73104606 L20.0388194,9.42258545 Z M18.2332436,12.8341733 L18.2332436,6.22006424 L21.0936558,6.22006424 C21.6323588,6.22006424 22.0974133,6.31806424 22.4906012,6.51465818 C22.8831952,6.71125212 23.1872921,6.98684 23.4028921,7.34142182 C23.6178982,7.69659758 23.7259952,8.10522788 23.7259952,8.56731273 C23.7259952,9.04246424 23.6178982,9.45762788 23.4028921,9.8122097 C23.1872921,10.1667915 22.8831952,10.4429733 22.4906012,10.6389733 C22.0974133,10.8355673 21.6323588,10.9335673 21.0936558,10.9335673 L20.0388194,10.9335673 L20.0388194,12.8341733 L18.2332436,12.8341733 Z" fill="#FFFFFF"></path><path d="M14.0706788,11.3992752 C14.3937818,11.3992752 14.6770909,11.322063 14.9212,11.1664509 C15.1653091,11.0114327 15.3553697,10.792863 15.4913818,10.5107418 C15.6279879,10.2286206 15.695697,9.90136 15.695697,9.52717818 C15.695697,9.1535903 15.6279879,8.82573576 15.4913818,8.54361455 C15.3553697,8.26149333 15.1653091,8.04351758 14.9212,7.88790545 C14.6770909,7.73288727 14.3937818,7.65508121 14.0706788,7.65508121 C13.7475758,7.65508121 13.4642667,7.73288727 13.2201576,7.88790545 C12.9760485,8.04351758 12.7859879,8.26149333 12.6499758,8.54361455 C12.5139636,8.82573576 12.4456606,9.1535903 12.4456606,9.52717818 C12.4456606,9.90136 12.5139636,10.2286206 12.6499758,10.5107418 C12.7859879,10.792863 12.9760485,11.0114327 13.2201576,11.1664509 C13.4642667,11.322063 13.7475758,11.3992752 14.0706788,11.3992752 M14.0706788,12.9957842 C13.5634545,12.9957842 13.0995879,12.9090691 12.6784848,12.7344509 C12.2573818,12.5604267 11.8915152,12.3163176 11.5808848,12.0027176 C11.2708485,11.6891176 11.0314909,11.322063 10.8634061,10.9003661 C10.6953212,10.479263 10.6115758,10.0213358 10.6115758,9.52717818 C10.6115758,9.03302061 10.6953212,8.57568727 10.8634061,8.1539903 C11.0314909,7.73288727 11.2708485,7.36523879 11.5808848,7.05163879 C11.8915152,6.73803879 12.2573818,6.49452364 12.6784848,6.31990545 C13.0995879,6.14588121 13.5634545,6.05857212 14.0706788,6.05857212 C14.577903,6.05857212 15.0417697,6.14588121 15.4628727,6.31990545 C15.8839758,6.49452364 16.2498424,6.73803879 16.5604727,7.05163879 C16.871103,7.36523879 17.1098667,7.73288727 17.2779515,8.1539903 C17.4460364,8.57568727 17.5297818,9.03302061 17.5297818,9.52717818 C17.5297818,10.0213358 17.4460364,10.479263 17.2779515,10.9003661 C17.1098667,11.322063 16.871103,11.6891176 16.5604727,12.0027176 C16.2498424,12.3163176 15.8839758,12.5604267 15.4628727,12.7344509 C15.0417697,12.9090691 14.577903,12.9957842 14.0706788,12.9957842" fill="#FFFFFF"></path><polygon fill="#FFFFFF" points="8.4639503 12.8342327 6.65837455 13.2666206 6.65837455 7.77862061 4.65323515 7.77862061 4.65323515 6.22012364 10.4690897 6.22012364 10.4690897 7.77862061 8.4639503 7.77862061"></polygon>
                                </Top10Icon>
                                오늘 영화 순위 1위
                            </Top10>
                            <TodayMovieOverview>
                                {popular.results[0].overview}
                            </TodayMovieOverview>
                            <TodayMovieButton>
                                <svg data-slot="icon" fill="currentColor" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"></path>
                                </svg>
                                <span>상세 정보</span>
                            </TodayMovieButton>
                        </TodayMovieInfo>
                    </TodayMovieContainer>
                    <MoviesContainer>
                        <CategorizeContainer id="popular">
                            <CategorizeInfo>
                                <CategorizeTitle>인기</CategorizeTitle>
                                <Pagination total={popular.results.length} size={showCardCnt} page={popularPage} />
                            </CategorizeInfo>
                            <CategorizeList
                                initial="rest"
                                animate="rest"
                                whileHover="showSliderControl">
                                {
                                    popularPage > 1 ? (
                                        <CategorizeListControl
                                            variants={{ 
                                                rest: { opacity: 0},
                                                showSliderControl: {opacity: 1}
                                            }}
                                            bg="ChevronLeft.svg"
                                            onClick={() => setPopularPage((page) => page - 1)}
                                        />
                                    ) : (
                                        <CategorizeListControl
                                            variants={{ 
                                                rest: { opacity: 0},
                                                showSliderControl: {opacity: 0}
                                            }}
                                            bg="ChevronLeft.svg"
                                        />
                                    )
                                }
                                <MovieCardList>
                                    {
                                        popularPart.map((movie, index) => (
                                            <MovieCard key={index} bg={makeImagePath(movie.backdrop_path)} />
                                        ))
                                    }
                                </MovieCardList>
                                {
                                    popularPage < Math.ceil(popular.results.length / showCardCnt) ? (
                                        <CategorizeListControl
                                            variants={{ 
                                                rest: { opacity: 0},
                                                showSliderControl: {opacity: 1}
                                            }}
                                            bg="ChevronRight.svg"
                                            onClick={() => setPopularPage((page) => page + 1)}
                                        />
                                    ) : (
                                        <CategorizeListControl
                                            variants={{ 
                                                rest: { opacity: 0},
                                                showSliderControl: {opacity: 0}
                                            }}
                                            bg="ChevronRight.svg"
                                        />
                                    )
                                }
                                
                            </CategorizeList>
                        </CategorizeContainer>
                        {
                            coming ? (
                                <CategorizeContainer id="coming">
                                    <CategorizeInfo>
                                        <CategorizeTitle>개봉 예정</CategorizeTitle>
                                        <Pagination total={coming.results.length} size={showCardCnt} page={comingPage} />
                                    </CategorizeInfo>
                                    <CategorizeList
                                        initial="rest"
                                        animate="rest"
                                        whileHover="showSliderControl">
                                        {
                                            comingPage > 1 ? (
                                                <CategorizeListControl
                                                    variants={{ 
                                                        rest: { opacity: 0},
                                                        showSliderControl: {opacity: 1}
                                                    }}
                                                    bg="ChevronLeft.svg"
                                                    onClick={() => setComingPage((page) => page - 1)}
                                                />
                                            ) : (
                                                <CategorizeListControl
                                                    variants={{ 
                                                        rest: { opacity: 0},
                                                        showSliderControl: {opacity: 0}
                                                    }}
                                                    bg="ChevronLeft.svg"
                                                />
                                            )
                                        }
                                        <MovieCardList>
                                            {
                                                comingPart.map((movie, index) => (
                                                    <MovieCard key={index} bg={makeImagePath(movie.backdrop_path)} />
                                                ))
                                            }
                                        </MovieCardList>
                                        {
                                            comingPage < Math.ceil(coming.results.length / showCardCnt) ? (
                                                <CategorizeListControl
                                                    variants={{ 
                                                        rest: { opacity: 0},
                                                        showSliderControl: {opacity: 1}
                                                    }}
                                                    bg="ChevronRight.svg"
                                                    onClick={() => setComingPage((page) => page + 1)}
                                                />
                                            ) : (
                                                <CategorizeListControl
                                                    variants={{ 
                                                        rest: { opacity: 0},
                                                        showSliderControl: {opacity: 0}
                                                    }}
                                                    bg="ChevronRight.svg"
                                                />
                                            )
                                        }
                                        
                                    </CategorizeList>
                                </CategorizeContainer>
                            ) : ''
                        }
                        {
                            now ? (
                                <CategorizeContainer id="now">
                                    <CategorizeInfo>
                                        <CategorizeTitle>현재 상영중</CategorizeTitle>
                                        <Pagination total={now.results.length} size={showCardCnt} page={nowPage} />
                                    </CategorizeInfo>
                                    <CategorizeList
                                        initial="rest"
                                        animate="rest"
                                        whileHover="showSliderControl">
                                        {
                                            nowPage > 1 ? (
                                                <CategorizeListControl
                                                    variants={{ 
                                                        rest: { opacity: 0},
                                                        showSliderControl: {opacity: 1}
                                                    }}
                                                    bg="ChevronLeft.svg"
                                                    onClick={() => setNowPage((page) => page - 1)}
                                                />
                                            ) : (
                                                <CategorizeListControl
                                                    variants={{ 
                                                        rest: { opacity: 0},
                                                        showSliderControl: {opacity: 0}
                                                    }}
                                                    bg="ChevronLeft.svg"
                                                />
                                            )
                                        }
                                        <MovieCardList>
                                            {
                                                nowPart.map((movie, index) => (
                                                    <Link to={`movies/${movie.id}`} key={index}>
                                                        <MovieCard bg={makeImagePath(movie.backdrop_path)} />
                                                    </Link>
                                                ))
                                            }
                                        </MovieCardList>
                                        {
                                            nowPage < Math.ceil(now.results.length / showCardCnt) ? (
                                                <CategorizeListControl
                                                    variants={{ 
                                                        rest: { opacity: 0},
                                                        showSliderControl: {opacity: 1}
                                                    }}
                                                    bg="ChevronRight.svg"
                                                    onClick={() => setNowPage((page) => page + 1)}
                                                />
                                            ) : (
                                                <CategorizeListControl
                                                    variants={{ 
                                                        rest: { opacity: 0},
                                                        showSliderControl: {opacity: 0}
                                                    }}
                                                    bg="ChevronRight.svg"
                                                />
                                            )
                                        }
                                        
                                    </CategorizeList>
                                </CategorizeContainer>
                            ) : ''
                        }
                    </MoviesContainer>
                    {
                        moviePathMatch ? (
                            <MovieModalContainer>
                                <MovieDialog>
                                    <MoviePoster></MoviePoster>
                                    <MovieDetail>
                                        123
                                    </MovieDetail>
                                </MovieDialog>
                            </MovieModalContainer>
                        ) : ''
                    }
                </Container>
            ) : <Loading />
        }
    </>
}
export default Home;