import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/shared/store/useAppStore';
import StartLogo from './components/StartLogo';
import StartIcons from './components/StartIcons';
import LanguagePicker from './components/LanguagePicker';
import ScreenTouchIcon from './components/ScreenTouchIcon';
import BrandMark from '@/shared/ui/BrandMark/BrandMark';
import { useLanguages } from '@/entities/lang/api';
import { DEFAULT_LANGS } from '@/entities/lang/fixtures';
import s from './StartPage.module.scss';

export default function StartPage() {
  const navigate = useNavigate();
  const setLang = useAppStore((s) => s.setLang);
  const { data, isLoading, isError } = useLanguages();

  // Use API languages if available, otherwise fallback to defaults
  const languages = !isLoading && !isError && data?.length ? data : DEFAULT_LANGS;

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
        <LanguagePicker languages={languages} onPick={handlePick} />
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
