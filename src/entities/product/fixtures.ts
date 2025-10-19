import type { ProductGroupMap } from './types';

export const PRODUCT_TEMPLATES: ProductGroupMap = {
  wipers: {
    name: 'Дворники',
    items: [
      {
        id: 'wipers-1',
        name: 'Bosch Aerotwin AR701S',
        sku: 'AR701S',
        imgUrl: '/images/test-wiper-1.png',
        brand: 'BOSCH',
        features: [
          'Всесезонная',
          'Для высоких скоростей',
          '2 года гарантии',
          'Простая установка без адаптеров',
        ],
        price: 3570,
        labels: [
          {
            label: 'Бестселлер',
            color: '#5ea761',
            background: '#5ea76180',
          },
          {
            label: 'Выбор покупателей',
            color: '#e02626',
            background: '#e0262680',
          },
        ],
        availability: { inStock: true, label: 'В наличии' },
        media: {
          gallery: ['', '', ''],
          video: { url: '', qr: '' },
        },
        storeInfo: {
          shopId: 'bp03',
          title: 'Как найти Bosch Aerotwin AR701S на полке',
          productImages: ['', '', ''],
          shelfImage: '',
          planogram: { aisle: '', bay: '', shelf: '', position: '' },
        },
      },
      {
        id: 'wipers-2',
        name: 'Denso Hybrid DUR065L + DUR065R',
        sku: 'DUR065L + DUR065R',
        imgUrl: '/images/test-wiper-2.png',
        brand: 'DENSO',
        features: [
          'Всесезонная',
          'Для высоких скоростей',
          '2 года гарантии',
          'Простая установка без адаптеров',
        ],
        price: 5350,
        labels: [],
        availability: { inStock: false, label: 'Не в наличии' },
        media: {
          gallery: ['', '', ''],
          video: { url: '', qr: '' },
        },
        storeInfo: {
          shopId: 'bp03',
          title: 'Как найти Denso Hybrid DUR065L + DUR065R на полке',
          productImages: ['', '', ''],
          shelfImage: '',
          planogram: { aisle: '', bay: '', shelf: '', position: '' },
        },
      },
    ],
  },

  batteries: {
    name: 'Аккумуляторы',
    items: [
      {
        id: 'batteries-1',
        name: 'BARS 6CT-60 АПЗ 60Ah 520A',
        sku: '6CT-60 АПЗ',
        imgUrl: '/images/test-acc-1.png',
        brand: 'BARS',
        features: ['Обратная полярность', 'Пусковой ток 520A', 'Сделано в Казахстане'],
        price: 3570,
        labels: [],
        availability: { inStock: true, label: 'В наличии' },
        media: {
          gallery: ['', '', ''],
          video: { url: '', qr: '' },
        },
        storeInfo: {
          shopId: 'bp03',
          title: 'Как найти BARS 6CT-60 АПЗ 60Ah 520A на полке',
          productImages: ['', '', ''],
          shelfImage: '',
          planogram: { aisle: '', bay: '', shelf: '', position: '' },
        },
      },
      {
        id: 'batteries-2',
        name: 'СТАНДАРТ 60R сб. пол. 60Ah (6СТ-60VL)',
        sku: '6СТ-60VL',
        imgUrl: '/images/test-acc-2.png',
        brand: 'СТАНДАРТ',
        features: ['Обычное обслуживание', 'Пусковой ток 500A'],
        price: 5350,
        labels: [
          {
            label: 'Выбор покупателей',
            color: '#e02626',
            background: '#e0262680',
          },
        ],
        availability: { inStock: true, label: 'В наличии' },
        media: {
          gallery: ['', '', ''],
          video: { url: '', qr: '' },
        },
        storeInfo: {
          shopId: 'bp03',
          title: 'Как найти СТАНДАРТ 60R 60Ah (6СТ-60VL) на полке',
          productImages: ['', '', ''],
          shelfImage: '',
          planogram: { aisle: '', bay: '', shelf: '', position: '' },
        },
      },
    ],
  },

  bulbs: {
    name: 'Лампочки',
    items: [
      {
        id: 'bulbs-1',
        name: '003 MTF H7 12V (55W) PX26d',
        sku: '003 MTF',
        imgUrl: '/images/test-bulb-1.png',
        brand: 'MTF',
        features: ['+30% света'],
        price: 480,
        labels: [
          {
            label: 'Лучшая цена',
            color: '#e06426',
            background: '#e0642680',
          },
        ],
        availability: { inStock: true, label: 'В наличии' },
        media: {
          gallery: ['', '', ''],
          video: { url: '', qr: '' },
        },
        storeInfo: {
          shopId: 'bp03',
          title: 'Как найти 003 MTF H7 12V (55W) PX26d на полке',
          productImages: ['', '', ''],
          shelfImage: '',
          planogram: { aisle: '', bay: '', shelf: '', position: '' },
        },
      },
      {
        id: 'bulbs-2',
        name: 'OSRAM H7 (55W) COOL BLUE INTENSE 4200K',
        sku: '64210CBI-HCB',
        imgUrl: '/images/test-bulb-2.png',
        brand: 'OSRAM',
        features: ['+20% света', 'Температура 4200K'],
        price: 600,
        labels: [],
        availability: { inStock: true, label: 'В наличии' },
        media: {
          gallery: ['', '', ''],
          video: { url: '', qr: '' },
        },
        storeInfo: {
          shopId: 'bp03',
          title: 'Как найти OSRAM H7 COOL BLUE INTENSE 4200K на полке',
          productImages: ['', '', ''],
          shelfImage: '',
          planogram: { aisle: '', bay: '', shelf: '', position: '' },
        },
      },
    ],
  },

  mats: {
    name: 'Коврики',
    items: [
      {
        id: 'mats-1',
        name: 'Передний левый, 1 шт. (полиуретан)',
        sku: 'mats-sku-1',
        imgUrl: '/images/test-map-1.png',
        brand: 'TopWipers',
        features: ['Полиуретан', 'Противоскользящее покрытие'],
        price: 590,
        labels: [],
        availability: { inStock: true, label: 'В наличии' },
        media: {
          gallery: ['', '', ''],
          video: { url: '', qr: '' },
        },
        storeInfo: {
          shopId: 'bp03',
          title: 'Как найти коврик (передний левый) на полке',
          productImages: ['', '', ''],
          shelfImage: '',
          planogram: { aisle: '', bay: '', shelf: '', position: '' },
        },
      },
    ],
  },
};
