import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/shared/store/useAppStore';
import StartLogo from './components/StartLogo';
import StartIcons from './components/StartIcons';
import LanguagePicker from './components/LanguagePicker';
import ScreenTouchIcon from './components/ScreenTouchIcon';
import BrandMark from '@/shared/ui/BrandMark/BrandMark';
import type { Lang } from '@/entities/lang/types';
import s from './StartPage.module.scss';

const MOCK_LANGS: Lang[] = [
  { code: 'ru', label: 'Подбор по автомобилю' },
  { code: 'en', label: 'Select by Car' },
  { code: 'de', label: 'Fahrzeug auswählen' },
]; 

export default function StartPage() {
  const navigate = useNavigate();
  const setLang = useAppStore((s) => s.setLang);

  const handlePick = (code: string) => {
    setLang(code);
    navigate('/vehicle');
  };

  return (
    <div className={s.screen}>
      <div className={s.logo}>
        <StartLogo />
      </div>

      <div className={s.lang}>
        <LanguagePicker languages={MOCK_LANGS} onPick={handlePick} />
      </div>

      <div className={s.icons}>
        <StartIcons />
      </div>

      <div className={s.hint}>
        <p>
          коснитесь экрана
          <br />
          для старта
        </p>

        <ScreenTouchIcon />
      </div>

      <BrandMark className={s.brandMark} />
    </div>
  );
}
