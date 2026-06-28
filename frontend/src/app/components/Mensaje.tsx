interface MensajeProps {
  tipo: 'exito' | 'error';
  texto: string;
}

export function Mensaje({ tipo, texto }: MensajeProps) {
  return (
    <div className={`mensaje-alerta mensaje-alerta--${tipo}`} role="alert">
      <span className="mensaje-alerta__icono" aria-hidden="true">
        {tipo === 'exito' ? '✓' : '✕'}
      </span>
      <span>{texto}</span>
    </div>
  );
}