import { Button, Result } from 'antd';
import { useCallback } from 'react';
import { useNavigate } from "react-router-dom";

import { Container } from './styles';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleBackHome = useCallback(() => {
    return navigate("/");
  }, []);

  return (
    <Container>
      <Result
        style={{ padding: 0 }} 
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        icon
        extra={
          <Button type="primary" onClick={handleBackHome}>Back Home</Button>
        }
      />
    </Container>
  );
};

export default NotFound;
