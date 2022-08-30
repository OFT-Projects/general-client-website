import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  
	display: grid;
	grid-template-rows: 1fr 1fr;
	grid-template-columns: 1fr;

  justify-items: center;

  > img {
    align-self: flex-end;
    margin: -60px 0;
  }

  > h1 {
    text-align: center;
  }
`;

export const BottomIcon = styled.img`
  position: fixed;
  right: 0;
  bottom: 0;
  height: 120px;
`;
