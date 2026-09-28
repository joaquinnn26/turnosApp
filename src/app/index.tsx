import { useState } from 'react';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styled } from 'styled-components/native';

import { TurnoCard } from '@/components/TurnoCard';
import { BodyText, colors } from '@/components/turno-ui';
import { turnos, getEstadoTurno } from '@/data/turnos';

const normalizar = (texto: string) =>
  texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

export default function HomeScreen() {
  const [busqueda, setBusqueda] = useState('');
  const [soloDisponibles, setSoloDisponibles] = useState(false);
  const [enFoco, setEnFoco] = useState(false);
  const insets = useSafeAreaInsets();
  const resultados = turnos.filter((turno) =>
    normalizar(`${turno.servicio} ${turno.sector}`).includes(normalizar(busqueda)) &&
    (!soloDisponibles || getEstadoTurno(turno) !== 'No disponible')
  );

  function limpiar() {
    setBusqueda('');
    setSoloDisponibles(false);
  }

  return (
    <Screen>
      <FlatList
        data={resultados}
        keyExtractor={(turno) => String(turno.id)}
        renderItem={({ item }) => (
          <CardWrapper>
            <TurnoCard {...item} estado={getEstadoTurno(item)} onPress={() =>
              router.push({ pathname: '/turno/[id]', params: { id: String(item.id) } })
            } />
          </CardWrapper>
        )}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 16) + 20 }}
        ListHeaderComponent={<>
          <Header style={{ paddingTop: insets.top + 20 }}>
            <HeaderInner>
              <BrandRow><Logo><Ionicons name="calendar-outline" size={22} color="#ffffff" /></Logo><AppName>TurnoApp</AppName><BrandCaption>COOPERATIVA</BrandCaption></BrandRow>
              <Headline>Tu próximo turno,{ '\n' }a un paso.</Headline>
              <Subtitle>Elegí el servicio y encontrá tu horario.</Subtitle>
            </HeaderInner>
          </Header>
          <Intro>
            <Banner>
              <BannerCopy><Eyebrow>ATENCIÓN AL SOCIO</Eyebrow><BannerTitle>Un espacio para{ '\n' }resolver lo tuyo.</BannerTitle></BannerCopy>
              <BannerImage source={{ uri: turnos[0].imagen }} resizeMode="cover" />
            </Banner>
            <SectionTitle>¿Qué necesitás hacer?</SectionTitle>
            <SearchRow $focused={enFoco}>
              <Ionicons name="search-outline" size={22} color={colors.muted} />
              <SearchInput value={busqueda} onChangeText={setBusqueda}
                onFocus={() => setEnFoco(true)} onBlur={() => setEnFoco(false)}
                placeholder="Buscar servicio o sector" placeholderTextColor={colors.muted}
                accessibilityLabel="Buscar turnos por servicio o sector" returnKeyType="search" />
              {busqueda.length > 0 && <ClearButton onPress={() => setBusqueda('')}
                accessibilityRole="button" accessibilityLabel="Limpiar búsqueda">
                <Ionicons name="close-circle" size={22} color={colors.muted} />
              </ClearButton>}
            </SearchRow>
            <Filters>
              <Chip $active={!soloDisponibles} onPress={() => setSoloDisponibles(false)} accessibilityRole="button" accessibilityState={{ selected: !soloDisponibles }}>
                <ChipText $active={!soloDisponibles}>Todos</ChipText>
              </Chip>
              <Chip $active={soloDisponibles} onPress={() => setSoloDisponibles(true)} accessibilityRole="button" accessibilityState={{ selected: soloDisponibles }}>
                <Ionicons name="checkmark-circle-outline" size={17} color={soloDisponibles ? '#ffffff' : colors.muted} />
                <ChipText $active={soloDisponibles}>Con disponibilidad</ChipText>
              </Chip>
            </Filters>
            <ResultsRow><ResultsTitle>Próximos turnos</ResultsTitle><Count accessibilityLiveRegion="polite">{resultados.length} {resultados.length === 1 ? 'opción' : 'opciones'}</Count></ResultsRow>
          </Intro>
        </>}
        ListEmptyComponent={<Empty>
          <EmptyIcon><Ionicons name="search-outline" size={30} color={colors.primary} /></EmptyIcon>
          <ResultsTitle>No encontramos ese servicio</ResultsTitle>
          <BodyText>Probá con otro nombre o quitá los filtros.</BodyText>
          <ResetButton onPress={limpiar} accessibilityRole="button"><ResetText>Ver todos los turnos</ResetText><Ionicons name="arrow-forward" size={18} color={colors.primary} /></ResetButton>
        </Empty>}
      />
    </Screen>
  );
}
const Screen = styled(View)`flex: 1; background-color: ${colors.background};`;
const Header = styled(View)`background-color: #142D42; padding: 20px 24px 30px;`;
const HeaderInner = styled(View)`width: 100%; max-width: 680px; align-self: center;`;
const BrandRow = styled(View)`flex-direction: row; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 28px;`;
const Logo = styled(View)`width: 38px; height: 38px; border-radius: 12px; background-color: #277C72; align-items: center; justify-content: center;`;
const AppName = styled(Text)`color: #ffffff; font-size: 21px; font-weight: 700; flex-grow: 1;`;
const BrandCaption = styled(Text)`color: #BBCBD6; font-size: 10px; letter-spacing: 1.5px;`;
const Headline = styled(Text)`color: #ffffff; font-size: 34px; line-height: 41px; font-weight: 700; letter-spacing: -1px;`;
const Subtitle = styled(Text)`color: #C1D1DC; font-size: 15px; line-height: 23px; margin-top: 12px;`;
const Intro = styled(View)`width: 100%; max-width: 728px; align-self: center; padding: 24px 24px 8px;`;
const Banner = styled(View)`flex-direction: row; background-color: #E5EFEC; border-radius: 18px; overflow: hidden; margin-bottom: 28px;`;
const BannerCopy = styled(View)`flex: 1; padding: 18px; gap: 8px;`;
const Eyebrow = styled(Text)`color: #376D60; font-size: 10px; letter-spacing: 1px; font-weight: 700;`;
const BannerTitle = styled(Text)`color: ${colors.ink}; font-size: 18px; line-height: 25px; font-weight: 600;`;
const BannerImage = styled(Image)`width: 88px; background-color: #D8E5DF;`;
const SectionTitle = styled(Text)`color: ${colors.ink}; font-size: 22px; font-weight: 700; margin-bottom: 16px;`;
const SearchRow = styled(View)<{ $focused: boolean }>`flex-direction: row; align-items: center; gap: 10px; background-color: #ffffff; border: 1px solid ${({ $focused }) => $focused ? colors.primary : colors.border}; border-radius: 14px; padding: 2px 14px;`;
const SearchInput = styled(TextInput)`flex: 1; min-height: 50px; font-size: 15px; color: ${colors.ink};`;
const ClearButton = styled(TouchableOpacity)`min-width: 44px; min-height: 44px; align-items: center; justify-content: center;`;
const Filters = styled(View)`flex-direction: row; flex-wrap: wrap; gap: 8px; margin-top: 14px; margin-bottom: 26px;`;
const Chip = styled(TouchableOpacity)<{ $active: boolean }>`min-height: 44px; padding: 10px 15px; border-radius: 24px; flex-direction: row; align-items: center; gap: 7px; background-color: ${({ $active }) => $active ? colors.ink : '#E9EEF2'};`;
const ChipText = styled(Text)<{ $active: boolean }>`font-size: 13px; font-weight: 600; color: ${({ $active }) => $active ? '#ffffff' : colors.muted};`;
const ResultsRow = styled(View)`flex-direction: row; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 6px;`;
const ResultsTitle = styled(Text)`color: ${colors.ink}; font-size: 18px; font-weight: 700;`;
const Count = styled(Text)`color: ${colors.muted}; font-size: 13px;`;
const CardWrapper = styled(View)`width: 100%; max-width: 728px; align-self: center; padding: 7px 24px;`;
const Empty = styled(View)`padding: 30px 24px; align-items: center; gap: 12px;`;
const EmptyIcon = styled(View)`width: 64px; height: 64px; border-radius: 32px; background-color: #E5EFEC; align-items: center; justify-content: center; margin-bottom: 4px;`;
const ResetButton = styled(TouchableOpacity)`min-height: 48px; flex-direction: row; align-items: center; gap: 8px;`;
const ResetText = styled(Text)`color: ${colors.primary}; font-size: 15px; font-weight: 700;`;
