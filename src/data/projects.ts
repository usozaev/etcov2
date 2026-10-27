export type ProjectCategory = 'campus' | 'camp';

export type ProjectFact = { value: string; unit: string; label: string };

export type Project = {
  slug: string;
  title: string;
  short: string;
  region: string;
  category: ProjectCategory;
  cover: string;
  gallery: string[];
  facts: ProjectFact[];
  lead: string;
};

const img = (name: string) => `/images/${name}.webp`;

export const categories: { id: ProjectCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'campus', label: 'Кампусы' },
  { id: 'camp', label: 'Детские лагеря' },
];

export const projects: Project[] = [
  {
    slug: 'perm',
    title: 'Кампус Пермь',
    short: 'Пермь',
    region: 'Пермский край',
    category: 'campus',
    cover: img('campus'),
    gallery: ['perm4', 'perm1', 'perm2', 'perm3', 'perm5', 'perm6'].map(img),
    facts: [
      { value: '161,5', unit: 'тыс. м²', label: 'Площадь объекта' },
      { value: '5089', unit: 'человек', label: 'Вместимость' },
      { value: '41,3', unit: 'млрд ₽', label: 'Объём инвестиций' },
      { value: '22,5', unit: 'года', label: 'Срок реализации' },
    ],
    lead:
      'Социально ориентированный проект инфраструктуры международного уровня, созданный в рамках федеральной программы «Наука и университеты». В составе кампуса — учебные лаборатории, спортивный комплекс, бассейн, конгресс-холл и гостиница.',
  },
  {
    slug: 'samara',
    title: 'Кампус Самара',
    short: 'Самара',
    region: 'Самарская область',
    category: 'campus',
    cover: img('samara1'),
    gallery: ['samara3', 'samara0', 'samara2', 'samara4', 'samara5', 'samara6', 'samara7'].map(img),
    facts: [
      { value: '157', unit: 'тыс. м²', label: 'Площадь объекта' },
      { value: '3524', unit: 'человек', label: 'Вместимость' },
      { value: '41,3', unit: 'млрд ₽', label: 'Объём инвестиций' },
      { value: '20', unit: 'лет', label: 'Срок реализации' },
    ],
    lead:
      'Межвузовский кампус, который будет возведён к 2030 году по модели ГЧП. Финансирование объединяет три источника: внебюджетные средства, федеральный грант и региональный бюджет.',
  },
  {
    slug: 'tyumen',
    title: 'Кампус Тюмень',
    short: 'Тюмень',
    region: 'Тюменская область',
    category: 'campus',
    cover: img('tumen1'),
    gallery: ['tumen5', 'tumen2', 'tumen3', 'tumen4', 'tumen6'].map(img),
    facts: [
      { value: '157', unit: 'тыс. м²', label: 'Площадь объекта' },
      { value: '5100', unit: 'человек', label: 'Вместимость' },
      { value: '42,4', unit: 'млрд ₽', label: 'Объём инвестиций' },
      { value: '22', unit: 'года', label: 'Срок реализации' },
    ],
    lead:
      'Межуниверситетский кампус, который создаётся не только для студентов: научно-исследовательские лаборатории, собственный технопарк и открытые общественные пространства для города. Главный архитектор — Владимир Плоткин.',
  },
  {
    slug: 'arkhangelsk',
    title: 'Кампус «Арктическая звезда»',
    short: 'Архангельск',
    region: 'Архангельская область',
    category: 'campus',
    cover: img('arhangelsk'),
    gallery: ['arhangelsk3', 'arhangelsk2', 'arhangelsk'].map(img),
    facts: [
      { value: '125', unit: 'тыс. м²', label: 'Площадь объекта' },
      { value: '4300', unit: 'человек', label: 'Вместимость' },
      { value: '40,9', unit: 'млрд ₽', label: 'Объём инвестиций' },
      { value: '22', unit: 'года', label: 'Срок реализации' },
    ],
    lead:
      'Кампус мирового уровня на берегу Северной Двины. Проект одобрен Главгосэкспертизой, финансирование привлечено при участии ВЭБ.РФ. Кампус станет стимулом для развития в Поморье науки и медицины.',
  },
  {
    slug: 'shifa',
    title: 'Детский лагерь «Шифа»',
    short: 'Башкортостан',
    region: 'Республика Башкортостан',
    category: 'camp',
    cover: img('shibaititleimage'),
    gallery: ['shibai_3', 'shibai_1', 'shibai_2', 'shibai_4', 'shibai_5'].map(img),
    facts: [
      { value: '14', unit: 'тыс. м²', label: 'Площадь объекта' },
      { value: '350', unit: 'детей', label: 'В смену' },
      { value: '3,8', unit: 'млрд ₽', label: 'Объём инвестиций' },
      { value: '12', unit: 'лет', label: 'Срок реализации' },
    ],
    lead:
      'Круглогодичный детский лагерь с жилыми корпусами, спортивными площадками и пространствами для творчества — в окружении природы Башкортостана.',
  },
  {
    slug: 'khabarovsk',
    title: 'Детский лагерь в Хабаровском крае',
    short: 'Хабаровск',
    region: 'Хабаровский край',
    category: 'camp',
    cover: img('bychihatitleimage'),
    gallery: ['bychiha_4', 'bychiha_1', 'bychiha_2', 'bychiha_3'].map(img),
    facts: [
      { value: '22,8', unit: 'тыс. м²', label: 'Площадь объекта' },
      { value: '350', unit: 'детей', label: 'В смену' },
      { value: '7,2', unit: 'млрд ₽', label: 'Объём инвестиций' },
      { value: '17', unit: 'лет', label: 'Срок реализации' },
    ],
    lead:
      'Современный загородный лагерь на Дальнем Востоке: спортивные залы, стадион, учебные и жилые корпуса в едином архитектурном коде.',
  },
];

export const getProject = (slug?: string) => projects.find((p) => p.slug === slug);
