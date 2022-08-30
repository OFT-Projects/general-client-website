import { Container, BottomIcon } from './styles';

import underConstruction from '../../assets/under_construction.gif';
import circleLogo from '../../assets/circle_ico_green_background_transparent.svg';

const Home: React.FC = () => {
  return (
    <>
      <Container>
        <img src={underConstruction} alt="" />
        <h1>Uh-oh, the website is under construction</h1>
      </Container>

      <BottomIcon src={circleLogo} alt="" />
    </>
  );
}

export default Home;
