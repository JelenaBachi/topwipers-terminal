import type { ProductGroupMap } from './types';

export const PRODUCT_TEMPLATES: ProductGroupMap = {
  wipers: {
    name: 'Дворники',
    items: [
      {
        id: 'wipers-1',
        name: 'Bosch Aerotwin AR701S',
        sku: 'AR701S',
        imgUrl: '',
        brand: 'BOSCH',
        features: [
          'Всесезонная',
          'Для высоких скоростей',
          '2 года гарантии',
          'Простая установка без адаптеров',
        ],
        price: 3570,
        labels: ['Бестселлер', 'Выбор покупателей'],
        availability: { inStock: false, label: 'В наличии' },
      },
      {
        id: 'wipers-2',
        name: 'Denso Hybrid DUR065L + DUR065R',
        sku: 'DUR065L + DUR065R',
        imgUrl: '',
        brand: 'DENSO',
        features: [
          'Всесезонная',
          'Для высоких скоростей',
          '2 года гарантии',
          'Простая установка без адаптеров',
        ],
        price: 5350,
        labels: [],
        availability: { inStock: true, label: 'В наличии' },
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
        imgUrl: '',
        brand: 'BARS',
        features: ['Обратная полярность', 'Пусковой ток 520A', 'Сделано в Казахстане'],
        price: 3570,
        labels: [],
        availability: { inStock: true, label: 'В наличии' },
      },
      {
        id: 'batteries-2',
        name: 'СТАНДАРТ 60R сб. пол. 60Ah (6СТ-60VL)',
        sku: '6СТ-60VL',
        imgUrl: '',
        brand: 'СТАНДАРТ',
        features: ['Обычное обслуживание', 'Пусковой ток 500A'],
        price: 5350,
        labels: ['Выбор покупателей'],
        availability: { inStock: true, label: 'В наличии' },
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
        imgUrl: '',
        brand: 'MTF',
        features: ['+30% света'],
        price: 480,
        labels: ['Лучшая цена'],
        availability: { inStock: true, label: 'В наличии' },
      },
      {
        id: 'bulbs-2',
        name: 'OSRAM H7 (55W) COOL BLUE INTENSE 4200K',
        sku: '64210CBI-HCB',
        imgUrl: '',
        brand: 'OSRAM',
        features: ['+20% света', 'Температура 4200K'],
        price: 600,
        labels: [],
        availability: { inStock: true, label: 'В наличии' },
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
        imgUrl: '',
        brand: 'TopWipers',
        features: ['Полиуретан', 'Противоскользящее покрытие'],
        price: 590,
        labels: [],
        availability: { inStock: true, label: 'В наличии' },
      },
    ],
  },
};
