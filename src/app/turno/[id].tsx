import { useRef, useState } from 'react';
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'styled-components/native';

import { getEstadoTurno, turnos } from '@/data/turnos';
import { BodyText, ButtonText, colors, PrimaryButton, TurnoStatus } from '@/components/turno-ui';

export default function TurnoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');
  const [completado, setCompletado] = useState(false);
  const [enFoco, setEnFoco] = useState(false);
  const nombreRef = useRef<TextInput>(null);
  const turno = turnos.find((item) => String(item.id) === id);
  const estado = turno ? getEstadoTurno(turno) : 'No disponible';

  function volver() {
    if (router.canGoBack()) router.back();
    else router.replace('/');
  }

  function solicitar() {
    if (!turno || completado) return;
    if (getEstadoTurno(turno) === 'No disponible') {
      setError('Este horario ya no está disponible. Elegí otro turno.');
      return;
    }
    if (!nombre.trim()) {
      setError('Ingresá tu nombre para continuar.');
      nombreRef.current?.focus();
      return;
    }
    Keyboard.dismiss();
    setError('');
    setCompletado(true);
    Alert.alert('Solicitud simulada', `${nombre.trim()}, terminaste la prueba. No se creó una reserva real.`);
  }

  return (
    <Screen>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
          <Content>
            <Navigation>
              <BackButton onPress={volver} accessibilityRole="button" accessibilityLabel="Volver al listado">
                <Ionicons name="arrow-back" size={22} color={colors.ink} />
                <BackText>Turnos</BackText>
              </BackButton>
              <NavLabel>{completado ? 'Finalizado' : 'Detalle del turno'}</NavLabel>
            </Navigation>
            {!turno ? <Panel>
              <Ionicons name="calendar-outline" size={36} color={colors.muted} />
              <Title>No encontramos este turno</Title>
              <BodyText>Volvé al listado para elegir otro horario.</BodyText>
              <PrimaryButton onPress={volver} accessibilityRole="button"><ButtonText>Ver turnos</ButtonText></PrimaryButton>
            </Panel> : completado ? <Panel>
              <SuccessIcon><Ionicons name="checkmark" size={36} color={colors.primary} /></SuccessIcon>
              <Eyebrow>PRUEBA FINALIZADA</Eyebrow>
              <Title>Listo, {nombre.trim()}.</Title>
              <BodyText>Completaste la solicitud de prueba. No se creó una reserva real.</BodyText>
              <Summary>
                <SummaryTitle>{turno.servicio}</SummaryTitle>
                <BodyText>{turno.sector}</BodyText>
                <BodyText>{turno.fecha} · {turno.hora}</BodyText>
              </Summary>
              <PrimaryButton onPress={volver} accessibilityRole="button"><ButtonText>Volver a los turnos</ButtonText><Ionicons name="arrow-forward" size={20} color="#ffffff" /></PrimaryButton>
            </Panel> : <>
              <Steps><StepText>1. Elegí tu turno</StepText><Ionicons name="chevron-forward" size={14} color={colors.muted} /><CurrentStep>2. Completá tus datos</CurrentStep></Steps>
              <ServiceImage source={{ uri: turno.imagen }} resizeMode="cover" accessibilityLabel={turno.servicio} />
              <Heading>
                <TurnoStatus estado={estado} />
                <Title>{turno.servicio}</Title>
                <BodyText>{turno.sector}</BodyText>
              </Heading>
              <Schedule>
                <Info><IconBox><Ionicons name="calendar-outline" size={22} color={colors.primary} /></IconBox><InfoCopy><SmallLabel>FECHA</SmallLabel><InfoText>{turno.fecha}</InfoText></InfoCopy></Info>
                <Info><IconBox><Ionicons name="time-outline" size={22} color={colors.primary} /></IconBox><InfoCopy><SmallLabel>HORARIO</SmallLabel><TimeText>{turno.hora}</TimeText></InfoCopy></Info>
              </Schedule>
              {estado === 'No disponible' ? <Panel>
                <FormTitle>Busquemos otro horario</FormTitle>
                <BodyText>Este turno no está disponible. Podés consultar las otras opciones.</BodyText>
                <PrimaryButton onPress={volver} accessibilityRole="button"><ButtonText>Elegir otro turno</ButtonText><Ionicons name="arrow-forward" size={20} color="#ffffff" /></PrimaryButton>
              </Panel> : <Panel>
                <FormTitle>¿A nombre de quién?</FormTitle>
                <Label>Nombre y apellido</Label>
                <NameInput ref={nombreRef} value={nombre} $focused={enFoco} $error={!!error}
                  onFocus={() => setEnFoco(true)} onBlur={() => setEnFoco(false)}
                  onChangeText={(texto) => { setNombre(texto); setError(''); }}
                  placeholder="Escribí tu nombre" placeholderTextColor={colors.muted}
                  accessibilityLabel="Nombre y apellido" autoCapitalize="words" autoComplete="name"
                  maxLength={100} returnKeyType="done" onSubmitEditing={solicitar} />
                {error !== '' && <ErrorText accessibilityRole="alert" accessibilityLiveRegion="polite">{error}</ErrorText>}
                <Notice><Ionicons name="information-circle-outline" size={19} color={colors.muted} /><NoticeText>Solicitud de prueba. No genera una reserva real.</NoticeText></Notice>
                <PrimaryButton onPress={solicitar} accessibilityRole="button" activeOpacity={0.8}>
                  <ButtonText>Solicitar turno</ButtonText><Ionicons name="arrow-forward" size={20} color="#ffffff" />
                </PrimaryButton>
              </Panel>}
            </>}
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
const Screen = styled(SafeAreaView)`flex: 1; background-color: ${colors.background};`;
const Content = styled(View)`width: 100%; max-width: 728px; align-self: center; padding: 12px 24px 28px; gap: 20px;`;
const Navigation = styled(View)`flex-direction: row; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;`;
const BackButton = styled(TouchableOpacity)`flex-direction: row; align-items: center; gap: 8px; min-height: 44px;`;
const BackText = styled(Text)`color: ${colors.ink}; font-size: 15px; font-weight: 600;`;
const NavLabel = styled(Text)`color: ${colors.muted}; font-size: 13px;`;
const Steps = styled(View)`flex-direction: row; flex-wrap: wrap; align-items: center; gap: 8px;`;
const StepText = styled(Text)`color: ${colors.muted}; font-size: 12px;`;
const CurrentStep = styled(Text)`color: ${colors.primary}; font-size: 12px; font-weight: 700;`;
const ServiceImage = styled(Image)`width: 100%; height: 170px; border-radius: 20px; background-color: #E4EBEF;`;
const Heading = styled(View)`gap: 10px;`;
const Panel = styled(View)`background-color: #ffffff; border: 1px solid ${colors.border}; border-radius: 20px; padding: 22px; gap: 16px;`;
const Title = styled(Text)`color: ${colors.ink}; font-size: 28px; line-height: 35px; font-weight: 700; letter-spacing: -0.5px;`;
const FormTitle = styled(Text)`color: ${colors.ink}; font-size: 21px; font-weight: 700;`;
const Schedule = styled(View)`padding: 18px; background-color: #EAF2EF; border-radius: 18px; gap: 18px;`;
const Info = styled(View)`flex-direction: row; align-items: center; gap: 12px;`;
const IconBox = styled(View)`width: 42px; height: 42px; border-radius: 12px; background-color: #ffffff; align-items: center; justify-content: center;`;
const InfoCopy = styled(View)`flex: 1; gap: 4px;`;
const SmallLabel = styled(Text)`color: ${colors.muted}; font-size: 10px; letter-spacing: 1px; font-weight: 600;`;
const InfoText = styled(Text)`color: ${colors.ink}; font-size: 16px; line-height: 22px; font-weight: 600;`;
const TimeText = styled(Text)`color: ${colors.primary}; font-size: 22px; font-weight: 700;`;
const Label = styled(Text)`color: ${colors.ink}; font-size: 13px; font-weight: 600;`;
const NameInput = styled(TextInput)<{ $focused: boolean; $error: boolean }>`border: 1px solid ${({ $focused, $error }) => $error ? '#B33C37' : $focused ? colors.primary : colors.border}; border-radius: 12px; min-height: 52px; padding: 14px; color: ${colors.ink}; font-size: 16px; background-color: #FAFBFC;`;
const ErrorText = styled(Text)`color: #B33C37; font-size: 13px; line-height: 20px;`;
const Notice = styled(View)`flex-direction: row; gap: 8px; align-items: flex-start;`;
const NoticeText = styled(Text)`flex: 1; color: ${colors.muted}; font-size: 12px; line-height: 19px;`;
const SuccessIcon = styled(View)`width: 72px; height: 72px; border-radius: 36px; background-color: #E8F5EF; align-items: center; justify-content: center;`;
const Eyebrow = styled(Text)`font-size: 11px; letter-spacing: 1.5px; font-weight: 700; color: ${colors.primary};`;
const Summary = styled(View)`background-color: ${colors.background}; border-radius: 14px; padding: 16px; gap: 6px;`;
const SummaryTitle = styled(Text)`color: ${colors.ink}; font-size: 17px; font-weight: 700;`;
