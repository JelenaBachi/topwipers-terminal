import MatsIcon    from '@/assets/icons/mats.svg?react';
import WipersIcon  from '@/assets/icons/wipers.svg?react';
import BatteryIcon from '@/assets/icons/battery.svg?react';
import BulbIcon    from '@/assets/icons/bulb.svg?react';

import s from '../StartPage.module.scss';

export default function StartIcons() {
  return (
    <>
      <MatsIcon className={s.icon} />
      <WipersIcon className={s.icon} />
      <BatteryIcon className={s.icon} />
      <BulbIcon className={s.icon} />
    </>
  );
}
