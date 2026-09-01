import { View, Text, Image } from 'react-native';
import styled from 'styled-components/native';

type EstadoTurno = 'Disponible' | 'Pocos lugares' | 'No disponible';

type TurnoCardProps = {
  servicio: string;
  sector: string;
  fecha: string;
  hora: string;
  estado: EstadoTurno;
  imagen: string;
};

export function TurnoCard({ servicio, sector, fecha, hora, estado, imagen }: TurnoCardProps) {
  return (
    <Card>
      <ServiceImage source={{ uri: imagen }} resizeMode="cover" />

      <CardContent>
        <TopRow>
          <ServiceName>{servicio}</ServiceName>
          <StatusBadge $status={estado}>
            <StatusText $status={estado}>{estado}</StatusText>
          </StatusBadge>
        </TopRow>

        <Sector>{sector}</Sector>

        <DetailsRow>
          <DetailBlock>
            <DetailLabel>Fecha</DetailLabel>
            <DetailValue>{fecha}</DetailValue>
          </DetailBlock>

          <Divider />

          <DetailBlock>
            <DetailLabel>Horario</DetailLabel>
            <DetailValue>{hora}</DetailValue>
          </DetailBlock>
        </DetailsRow>
      </CardContent>
    </Card>
  );
}

const getStatusColors = (status: EstadoTurno) => {
  if (status === 'Disponible') {
    return {
      background: '#dcfce7',
      text: '#166534',
    };
  }

  if (status === 'Pocos lugares') {
    return {
      background: '#ffedd5',
      text: '#9a3412',
    };
  }

  return {
    background: '#e5e7eb',
    text: '#4b5563',
  };
};

const Card = styled(View)`
  flex-direction: row;
  background-color: #ffffff;
  border-radius: 16px;
  border-width: 1px;
  border-color: #e4edf4;
  overflow: hidden;
  min-height: 128px;
`;

const ServiceImage = styled(Image)`
  width: 104px;
  min-height: 128px;
  background-color: #dcebf5;
`;

const CardContent = styled(View)`
  flex: 1;
  padding: 14px;
`;

const TopRow = styled(View)`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`;

const ServiceName = styled(Text)`
  flex: 1;
  color: #17324a;
  font-size: 17px;
  font-weight: 800;
  line-height: 22px;
`;

const StatusBadge = styled(View)<{ $status: EstadoTurno }>`
  background-color: ${({ $status }) => getStatusColors($status).background};
  border-radius: 999px;
  padding: 5px 9px;
`;

const StatusText = styled(Text)<{ $status: EstadoTurno }>`
  color: ${({ $status }) => getStatusColors($status).text};
  font-size: 11px;
  font-weight: 800;
`;

const Sector = styled(Text)`
  color: #4c6578;
  font-size: 14px;
  line-height: 20px;
  margin-top: 8px;
`;

const DetailsRow = styled(View)`
  flex-direction: row;
  align-items: center;
  background-color: #eef8fc;
  border-radius: 12px;
  margin-top: 14px;
  padding: 10px 12px;
`;

const DetailBlock = styled(View)`
  flex: 1;
`;

const DetailLabel = styled(Text)`
  color: #6b7f8f;
  font-size: 11px;
  font-weight: 700;
`;

const DetailValue = styled(Text)`
  color: #17324a;
  font-size: 14px;
  font-weight: 800;
  margin-top: 2px;
`;

const Divider = styled(View)`
  width: 1px;
  height: 32px;
  background-color: #c7dde9;
  margin: 0 12px;
`;
