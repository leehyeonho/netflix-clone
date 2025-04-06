import styled from "styled-components";

const BackGroundLoading = styled.div`
    position: absolute;
    z-index: 99999;
    width: 100%;
    height: 100%;
    min-height: 3rem;
    background: center url(../loading.gif) no-repeat;
`;

function Loading() {
    return <>
        <BackGroundLoading />
    </>
}

export default Loading;