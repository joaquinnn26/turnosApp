import { View, Text, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styled } from 'styled-components/native';
import type { Turno } from '@/data/turnos';
import { colors, TurnoStatus } from './turno-ui';

type TurnoCardProps = Omit<Turno, 'id' | 'inicio'> & { onPress: () => void };

export function TurnoCard({ servicio, sector, fecha, hora, estado, imagen, onPress }: TurnoCardProps) {
  return (
    <Card onPress={onPress} activeOpacity={0.8} accessibilityRole="button"
      accessibilityLabel={`${servicio}, ${sector}, ${fecha}, ${hora}, ${estado}. Ver detalle`}>
      <TopRow>
        <ServiceImage source={{ uri: imagen }} resizeMode="cover" />
        <ServiceInfo><ServiceName>{servicio}</ServiceName><Sector>{sector}</Sector></ServiceInfo>
        <Ionicons name="chevron-forward" size={20} color={colors.muted} />
      </TopRow>
      <Schedule>
        <DateRow><Ionicons name="calendar-outline" size={17} color={colors.muted} /><DateText>{fecha}</DateText></DateRow>
        <DateRow><Ionicons name="time-outline" size={17} color={colors.primary} /><TimeText>{hora}</TimeText></DateRow>
      </Schedule>
      <BottomRow><TurnoStatus estado={estado} /><ActionText>{estado === 'No disponible' ? 'Ver detalle' : 'Elegir turno'}</ActionText></BottomRow>
    </Card>
  );
}
const Card = styled(TouchableOpacity)`background-color: #ffffff; border: 1px solid ${colors.border}; border-radius: 20px; padding: 18px; gap: 16px;`;
const TopRow = styled(View)`flex-direction: row; align-items: center; gap: 12px;`;
const ServiceImage = styled(Image)`width: 56px; height: 56px; border-radius: 14px; background-color: #E4EBEF;`;
const ServiceInfo = styled(View)`flex: 1; gap: 4px;`;
const ServiceName = styled(Text)`color: ${colors.ink}; font-size: 17px; font-weight: 700; line-height: 23px;`;
const Sector = styled(Text)`color: ${colors.muted}; font-size: 13px; line-height: 19px;`;
const Schedule = styled(View)`background-color: #F5F7FA; border-radius: 12px; padding: 12px; gap: 10px;`;
const DateRow = styled(View)`flex-direction: row; align-items: center; gap: 8px;`;
const DateText = styled(Text)`flex: 1; color: ${colors.ink}; font-size: 14px; line-height: 20px;`;
const TimeText = styled(Text)`color: ${colors.primary}; font-size: 16px; font-weight: 700;`;
const BottomRow = styled(View)`flex-direction: row; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px;`;
const ActionText = styled(Text)`color: ${colors.primary}; font-size: 13px; font-weight: 700;`;
