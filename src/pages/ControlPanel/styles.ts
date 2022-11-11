import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface IButtonContainerProps {
  turnedOn: boolean;
  disabled: boolean;
}

interface IOptionCircleProps {
  turnedOn: boolean;
  noBorder?: boolean;
  colorOn: string;
  colorOff: string;
}

interface IInfoContainerProps {
  bgColor: string;
}

export const Header = styled.div`
  width: 100vw;
  height: 30px;
  background-color: #12B347;
  position: absolute;
`;

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

	display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SubHeader = styled.div`
  display: flex;

  width: 80%;
  height: 130px;
  margin-top: 60px;
  margin-bottom: 30px;

  img {
    height: 130px;
  }

  section {
    margin-left: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & + div {
    margin-left: 16px;
  }
`;

export const OptionLabel = styled.strong`
  color: #22272B;
  font-weight: 500;
  white-space: nowrap;
`;

export const TimerLabel = styled.strong`
  margin-left: 16px;
  color: #898989;
  font-weight: 500;
  margin-right: 16px;
`;

export const OptionCircle = styled.div<IOptionCircleProps>`
  width: 14px;
  height: 14px;
  background-color: ${props => props.turnedOn ? props.colorOn : props.colorOff};
  border: ${props => props.noBorder ? '0px' : '1px'} solid #17A1FA;
  border-radius: 100%;
  margin-right: 8px;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const ButtonsContainer = styled.div`
  margin-right: 8px;
  width: 20%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ModuleInfoContainer = styled.div`
  background-color: rgba(200, 200, 200, 0.2);
  padding: 12px;
  margin-left: 8px;
  width: 60%;
  height: 60%;
  
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const ModuleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  height: 18%;
  background-color: #22272B;

  color: #FFFFFF;
  font-weight: 700;
  padding-left: 24px;
  white-space: nowrap;
`;

export const ButtonContainer = styled.div<IButtonContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 18%;
  
  background-color: ${props => props.turnedOn ? '#12B347' : '#C8C8C8'};

  ${props => !props.disabled && css`
    cursor: pointer;

    &:hover {
      background-color: ${shade(0.2, props.turnedOn ? '#12B347' : '#C8C8C8')};
    }
  `}

  color: #FFFFFF;
  font-weight: 700;
  white-space: nowrap;
`;


export const MainInfoContainer = styled.div<IInfoContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 33%;
  background-color: ${props => props.bgColor};

  color: #FFFFFF;
  font-weight: 700;

  & + div {
    margin-top: 16px;
  }
`;


export const ValueLabel = styled.div`
  color: #FFFFFF;
  font-weight: 700;
  font-size: xx-large;
`;


export const InfoLabel = styled.div`
  color: #FFFFFF;
  font-weight: 400;
  white-space: nowrap;
`;


export const InnerInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 66%;

  section {
    width: 49%;
    height: 100%;
    display: flex;  
    flex-direction: column;
  }
`;


export const SubInfoContainer = styled.div<IInfoContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${props => props.bgColor};
  height: 50%;
  width: 100%;

  & + div {
    margin-top: 16px;
  }
`;
