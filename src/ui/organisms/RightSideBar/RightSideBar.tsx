import styled from "styled-components"

const RightSideBarContainer = styled.div`
    width: var(--rightbar-width);
    height: 100vh;
    background-color: black;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1000;
    transition: all 0.3s ease-in-out;
    &:hover {
        width: 500px;
    }
`

const RightSideBar = () => {
	return <RightSideBarContainer>X</RightSideBarContainer>
}

export default RightSideBar
