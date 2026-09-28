import { Text, TouchableOpacity, View } from 'react-native';
import { styled } from 'styled-components/native';
import type { EstadoTurno } from '@/data/turnos';

export const colors = { background: '#F5F7FA', ink: '#142D42', muted: '#617184', primary: '#176B62', border: '#E2E8EF' };
const palette = {
  Disponible: { background: '#E8F5EF', text: '#21634A' },
  'Pocos lugares': { background: '#FFF3DE', text: '#875607' },
  'No disponible': { background: '#EDF0F4', text: '#596577' },
};
export function TurnoStatus({ estado }: { estado: EstadoTurno }) {
  return <Badge style={{ backgroundColor: palette[estado].background }}>
    <Dot style={{ backgroundColor: palette[estado].text }} />
    <BadgeText style={{ color: palette[estado].text }}>{estado}</BadgeText>
  </Badge>;
}
const Badge = styled(View)`flex-direction: row; align-items: center; align-self: flex-start; gap: 6px; padding: 6px 10px; border-radius: 8px;`;
const Dot = styled(View)`width: 6px; height: 6px; border-radius: 3px;`;
const BadgeText = styled(Text)`font-size: 12px; font-weight: 600;`;
export const PrimaryButton = styled(TouchableOpacity)`min-height: 52px; padding: 14px 20px; border-radius: 14px; background-color: ${colors.primary}; flex-direction: row; align-items: center; justify-content: center; gap: 10px;`;
export const ButtonText = styled(Text)`color: #ffffff; font-size: 16px; font-weight: 700;`;
export const BodyText = styled(Text)`color: ${colors.muted}; font-size: 15px; line-height: 23px;`;

