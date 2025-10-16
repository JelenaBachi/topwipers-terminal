import twMarkUrl from '@/assets/icons/top-wipers.svg?url';

type Props = { className?: string };

export default function BrandMark({ className }: Props) {
  return (
    <div className={className}>
      <img src={twMarkUrl} alt="TopWipers" width={83} height={22} decoding="async" />
    </div>
  );
}
