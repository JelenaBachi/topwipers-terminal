import s from './VehicleTile.module.scss';

type Props = { label: string; onClick?: () => void; className?: string; fullWidth?: boolean };

export default function VehicleTile({ label, onClick, className, fullWidth }: Props) {
  return (
    <button
      type="button"
      className={`${s.tile} ${fullWidth ? s.full : ''} ${className ?? ''}`}
      onClick={onClick}
      aria-label={label}
    >
      <span className={s.label}>{label}</span>
    </button>
  );
}
