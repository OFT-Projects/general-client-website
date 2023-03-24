import { useCallback, useEffect, useState } from 'react';
import { notification, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { 
  Container, 
  Header, 
  SubHeader, 
  OptionContainer, 
  OptionCircle, 
  OptionLabel, 
  TimerLabel, 
  ButtonContainer, 
  ButtonsContainer, 
  InfoLabel, 
  MainContainer, 
  MainInfoContainer, 
  InnerInfoContainer, 
  ModuleContainer, 
  ModuleInfoContainer, 
  SubInfoContainer, 
  ValueLabel 
} from './styles';


// TS - Target Sensor
interface ITSPayload {
  sensor: string,
  value: number,
}

// CS - Component State
interface ICSPayload {
  component: string,
  value: number,
}

// TMS - Target Microcontroller Sensors
interface ITMSPayload { 
  target_sensors: ITSPayload[],
  current_state: {
    components: ICSPayload[],
  },
};

import circleLogo from '../../assets/circle_ico_green_background_transparent.svg';

const ControlPanel: React.FC = () => {
  const baseUrl = process.env.BASE_URL;

  const [isLoading, setLoading] = useState(false);
  
  const [online, setOnline] = useState(false);
  const [sync, setSync] = useState(false);

  const [autoMode, setAutoMode] = useState(false);

  const [led, setLed] = useState(false);
  const [fan, setFan] = useState(false);
  const [pump, setPump] = useState(false);

  const [envLight, setEnvLight] = useState(0);
  const [envTemp, setEnvTemp] = useState(0);
  const [waterTemp, setWaterTemp] = useState(0);

  const [time, setTime] = useState(0);

  const handleManualChange = useCallback(async (newLed: boolean, newFan: boolean, newPump: boolean) => {
    try {
      setLoading(true);

      const response = await fetch(`${baseUrl}/mcsu/modulo_125`, {
        method: 'POST',
        body: JSON.stringify({
          state_update: { 
            components: [ 
              {
                component: "led", 
                value: newLed ? 1 : 0, 
              },
              { 
                component: "pump", 
                value: newPump ? 1 : 0, 
              },
              { 
                component: "fan", 
                value: newFan ? 1 : 0, 
              }
            ] 
          } 
        })
      });

      if (response.status === 200) {
        notification.open({
          message: 'Sucesso!',
          description: 'Estado do componente alterado com sucesso.',
        });

        setLed(newLed);
        setPump(newPump);
        setFan(newFan);
      } else {
        notification.error({
          message: 'Erro!',
          description: 'Ocorreu um erro ao alterar estado do componente.',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Erro!',
        description: 'Ocorreu um erro interno.',
      });
    } finally {
      setLoading(false);
    }
  }, [led, pump, fan]);

  const handleStateRecovery = useCallback(async () => {
    try {
      setLoading(true);
      setSync(true);

      const response = await fetch(`${baseUrl}/msr/modulo_125`, {
        method: 'POST'
      });

      if (response.status === 200) {
        notification.open({
          message: 'Sucesso!',
          description: 'Estado do módulo recuperado com sucesso.',
        });

        const responseData = await response.json() as ITMSPayload;

        let component = responseData.current_state.components.find(ts => ts.component == "led");
        if (component) setLed(component.value == 1);

        component = responseData.current_state.components.find(ts => ts.component == "pump");
        if (component) setPump(component.value == 1);

        component = responseData.current_state.components.find(ts => ts.component == "fan");
        if (component) setFan(component.value == 1);

        let sensor = responseData.target_sensors.find(ts => ts.sensor == "ldr");
        if (sensor) setEnvLight(sensor.value);

        sensor = responseData.target_sensors.find(ts => ts.sensor == "temperature");
        if (sensor) setEnvTemp(sensor.value);

        sensor = responseData.target_sensors.find(ts => ts.sensor == "water_temperature");
        if (sensor) setWaterTemp(sensor.value);

        setOnline(true);
      } else {
        notification.error({
          message: 'Erro!',
          description: 'Ocorreu um erro ao recuperar o estado do módulo.',
        });

        setOnline(false);
      }
    } catch (error) {
      notification.error({
        message: 'Erro!',
        description: 'Ocorreu um erro interno.',
      });

      setOnline(false);
    } finally {
      setLoading(false);
      setSync(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        handleStateRecovery();
        setTime(6);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <>
      <Header />

      <Container>
        <SubHeader>
          <img src={circleLogo} alt="" />

          <section>
            <OptionContainer>
              <OptionCircle turnedOn={online} noBorder={true} colorOn="#12B347" colorOff="#FF3D00"/>

              <OptionLabel>{online ? "Online" : "Offline"}</OptionLabel>
            </OptionContainer>

            <OptionContainer>
              <OptionCircle turnedOn={sync} colorOn="#17A1FA" colorOff="#FFF"/>

              <OptionLabel>Sync</OptionLabel>
            </OptionContainer>

            <OptionContainer>
              <OptionCircle turnedOn={autoMode} colorOn="#17A1FA" colorOff="#FFF"/>

              <OptionLabel>Modo Autônomo</OptionLabel>
            </OptionContainer>

            <TimerLabel>00:00:{time > 9 ? time : `0${time}`}</TimerLabel>
            
            {isLoading && <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />}
          </section>
        </SubHeader>

        <MainContainer>
          <ButtonsContainer>
            <ModuleContainer>
              <OptionCircle turnedOn={online} noBorder={true} colorOn="#12B347" colorOff="#FF3D00"/>modulo_125
            </ModuleContainer>

            <ButtonContainer disabled={true} turnedOn={autoMode}>Modo Autônomo</ButtonContainer>
            <ButtonContainer disabled={autoMode} turnedOn={led} onClick={() => handleManualChange(!led, fan, pump)}>Iluminação Artificial</ButtonContainer>
            <ButtonContainer disabled={autoMode} turnedOn={fan} onClick={() => handleManualChange(led, !fan, pump)}>Ventilação</ButtonContainer>
            <ButtonContainer disabled={autoMode} turnedOn={pump} onClick={() => handleManualChange(led, fan, !pump)}>Bomba</ButtonContainer>
          </ButtonsContainer>

          <ModuleInfoContainer>
            <MainInfoContainer bgColor="#C89000">
              <ValueLabel>{envLight / 10}%</ValueLabel>
              <InfoLabel>Iluminação do Ambiente</InfoLabel>
            </MainInfoContainer>

            <InnerInfoContainer>
              <section>
                <SubInfoContainer bgColor="#00CF08">
                  <ValueLabel>{envTemp}°C</ValueLabel>
                  <InfoLabel>Temperatura do Ambiente</InfoLabel>
                </SubInfoContainer>

                <SubInfoContainer bgColor="#22272B">
                  <ValueLabel>?</ValueLabel>
                  <InfoLabel>pH da Água</InfoLabel>
                </SubInfoContainer>
              </section>

              <section>
                <SubInfoContainer bgColor="#638FFF">
                  <ValueLabel>{((waterTemp * 23) / 520).toFixed(2)}°C</ValueLabel>
                  <InfoLabel>Temperatura da Água</InfoLabel>
                </SubInfoContainer>

                <SubInfoContainer bgColor="#22272B">
                  <ValueLabel>?</ValueLabel>
                  <InfoLabel>Condutividade Elétrica</InfoLabel>
                </SubInfoContainer>
              </section>
            </InnerInfoContainer>
          </ModuleInfoContainer>
        </MainContainer>
      </Container>
    </>
  );
}

export default ControlPanel;
