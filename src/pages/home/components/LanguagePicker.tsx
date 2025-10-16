import Button from '@/shared/ui/Button/Button';
import type { Lang } from '@/entities/lang/types';

type Props = {
  languages: Lang[];
  onPick: (code: string) => void;
};

export default function LanguagePicker({ languages, onPick }: Props) {
  return (
    <>
      {languages.map((l) => (
        <div key={l.code}>
          <Button size="xxl" variant="solid" onClick={() => onPick(l.code)}>
            {l.label}
          </Button>
        </div>
      ))}
    </>
  );
}
