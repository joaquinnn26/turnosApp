export type EstadoTurno = 'Disponible' | 'Pocos lugares' | 'No disponible';

export type Turno = {
  id: number;
  servicio: string;
  sector: string;
  fecha: string;
  inicio: number;
  hora: string;
  estado: EstadoTurno;
  imagen: string;
};

function fechaDeEjemplo(dias: number, hora: string) {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + dias);
  const [horas, minutos] = hora.split(':').map(Number);
  fecha.setHours(horas, minutos, 0, 0);
  return {
    inicio: fecha.getTime(),
    fecha: fecha.toLocaleDateString('es-AR', {
      day: 'numeric', month: 'long', year: 'numeric',
    }),
  };
}

export function getEstadoTurno(turno: Turno, ahora = Date.now()): EstadoTurno {
  return turno.inicio <= ahora ? 'No disponible' : turno.estado;
}

export const turnos: Turno[] = [
  {
    id: 1,
    servicio: 'Atención al cliente',
    sector: 'Mesa de informes',
    ...fechaDeEjemplo(1, '09:00'),
    hora: '09:00',
    estado: 'Disponible',
    imagen:
      'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    servicio: 'Consultas administrativas',
    sector: 'Administración',
    ...fechaDeEjemplo(2, '10:30'),
    hora: '10:30',
    estado: 'Pocos lugares',
    imagen:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    servicio: 'Reclamos',
    sector: 'Gestión de solicitudes',
    ...fechaDeEjemplo(3, '11:15'),
    hora: '11:15',
    estado: 'Disponible',
    imagen:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    servicio: 'Servicio técnico',
    sector: 'Soporte operativo',
    ...fechaDeEjemplo(4, '13:00'),
    hora: '13:00',
    estado: 'No disponible',
    imagen:
      'https://images.unsplash.com/photo-1581091215367-59ab6f01b239?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    servicio: 'Pagos y facturación',
    sector: 'Caja y cobranzas',
    ...fechaDeEjemplo(5, '08:45'),
    hora: '08:45',
    estado: 'Pocos lugares',
    imagen:
      'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=600&q=80',
  },
];
