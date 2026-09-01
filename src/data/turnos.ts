export type EstadoTurno = 'Disponible' | 'Pocos lugares' | 'No disponible';

export type Turno = {
  id: number;
  servicio: string;
  sector: string;
  fecha: string;
  hora: string;
  estado: EstadoTurno;
  imagen: string;
};

export const turnos: Turno[] = [
  {
    id: 1,
    servicio: 'Atenci\u00f3n al cliente',
    sector: 'Mesa de informes',
    fecha: 'Lunes 7 de septiembre',
    hora: '09:00',
    estado: 'Disponible',
    imagen:
      'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    servicio: 'Consultas administrativas',
    sector: 'Administraci\u00f3n',
    fecha: 'Lunes 7 de septiembre',
    hora: '10:30',
    estado: 'Pocos lugares',
    imagen:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    servicio: 'Reclamos',
    sector: 'Gesti\u00f3n de solicitudes',
    fecha: 'Martes 8 de septiembre',
    hora: '11:15',
    estado: 'Disponible',
    imagen:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    servicio: 'Servicio t\u00e9cnico',
    sector: 'Soporte operativo',
    fecha: 'Miercoles 9 de septiembre',
    hora: '13:00',
    estado: 'No disponible',
    imagen:
      'https://images.unsplash.com/photo-1581091215367-59ab6f01b239?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    servicio: 'Pagos y facturaci\u00f3n',
    sector: 'Caja y cobranzas',
    fecha: 'Jueves 10 de septiembre',
    hora: '08:45',
    estado: 'Pocos lugares',
    imagen:
      'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=80',
  },
];
