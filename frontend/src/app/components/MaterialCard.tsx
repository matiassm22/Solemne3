interface MaterialCardProps {
  nombre: string;
  codigo: string;
  estado: string;
  cantidad: number;
  imagen: string;
  id?: string;
}

export function MaterialCard({ nombre, codigo, estado, cantidad, imagen }: MaterialCardProps) {
  const isCritical = estado.toLowerCase() === 'crítico' || cantidad < 10;

  return (
    <article className="tarjeta-material">
      <div className="tarjeta-material__imagen-contenedor">
        <img src={imagen} alt={`Imagen representativa de ${nombre}`} />
      </div>
      <div className="tarjeta-material__contenido">
        <h3 className="tarjeta-material__titulo">{nombre}</h3>
        <p className="tarjeta-material__codigo">Cód. {codigo}</p>

        <span className={`tarjeta-material__estado tarjeta-material__estado--${isCritical ? 'critico' : 'bueno'}`}>
          {isCritical ? '⚠ Crítico' : '✓ Disponible'}
        </span>

        <div className="tarjeta-material__footer">
          <p className="tarjeta-material__cantidad">Stock: {cantidad} uds.</p>
          <span className="tarjeta-material__ver-detalle">
            Ver detalle →
          </span>
        </div>
      </div>
    </article>
  );
}