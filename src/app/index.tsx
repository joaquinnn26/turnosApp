import { View, Text, Image, ScrollView } from 'react-native';
import styled from 'styled-components/native';

import { TurnoCard } from '@/components/TurnoCard';
import { turnos } from '@/data/turnos';

const bannerImage =
  'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1200&q=80';
const tagline = 'Encontr\u00e1 el horario que mejor se adapte a vos';

export default function HomeScreen() {
  return (
    <Screen>
      <Header>
        <HeaderInner>
          <AppName>TurnoApp</AppName>
          <Subtitle>{tagline}</Subtitle>
        </HeaderInner>
      </Header>

      <Content showsVerticalScrollIndicator={false}>
        <Intro>
          <BannerImage source={{ uri: bannerImage }} resizeMode="cover" />
          <SectionTitle>Turnos disponibles</SectionTitle>
          <Description>
            Consulta los horarios de atenci\u00f3n para cada servicio de la cooperativa. Esta
            versi\u00f3n usa datos est\u00e1ticos para presentar la estructura inicial de la
            aplicaci\u00f3n.
          </Description>
        </Intro>

        <CardsList>
          {turnos.map((turno) => (
            <TurnoCard
              key={turno.id}
              servicio={turno.servicio}
              sector={turno.sector}
              fecha={turno.fecha}
              hora={turno.hora}
              estado={turno.estado}
              imagen={turno.imagen}
            />
          ))}
        </CardsList>
      </Content>
    </Screen>
  );
}

const Screen = styled(View)`
  flex: 1;
  background-color: #f3f6f9;
`;

const Header = styled(View)`
  background-color: #0f2f4a;
  padding: 52px 20px 28px;
`;

const HeaderInner = styled(View)`
  width: 100%;
  max-width: 720px;
  align-self: center;
`;

const AppName = styled(Text)`
  color: #ffffff;
  font-size: 32px;
  font-weight: 800;
`;

const Subtitle = styled(Text)`
  color: #c8ecff;
  font-size: 16px;
  line-height: 24px;
  margin-top: 8px;
`;

const Content = styled(ScrollView)`
  flex: 1;
`;

const Intro = styled(View)`
  width: 100%;
  max-width: 720px;
  align-self: center;
  padding: 20px 20px 8px;
`;

const BannerImage = styled(Image)`
  width: 100%;
  height: 170px;
  border-radius: 18px;
  background-color: #d7eaf5;
`;

const SectionTitle = styled(Text)`
  color: #17324a;
  font-size: 24px;
  font-weight: 800;
  margin-top: 24px;
`;

const Description = styled(Text)`
  color: #526576;
  font-size: 15px;
  line-height: 22px;
  margin-top: 8px;
`;

const CardsList = styled(View)`
  width: 100%;
  max-width: 720px;
  align-self: center;
  gap: 14px;
  padding: 14px 20px 32px;
`;
