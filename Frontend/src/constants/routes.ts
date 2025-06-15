export enum Routes {
  home = '/',
  authors = '/authors',
  printingHouses = '/printing-houses',
  subscriptions = '/subscriptions',
  requests = '/requests',
  clients = '/clients',
  deliveries = '/deliveries',
  publications = '/publications',
  createPublication = '/publications/create',
}

export const managerRoutes = [
  {
    label: 'Подписки',
    href: Routes.subscriptions,
  },
  {
    label: 'Заявки',
    href: Routes.requests,
  },
  {
    label: 'Клиенты',
    href: Routes.clients,
  },
  {
    label: 'Доставки',
    href: Routes.deliveries,
  },
];

export const chiefEditorRoutes = [
  {
    label: 'Публикации',
    href: Routes.publications,
  },
  {
    label: 'Авторы',
    href: Routes.authors,
  },
  {
    label: 'Типографии',
    href: Routes.printingHouses,
  },
  {
    label: 'Доставки',
    href: Routes.deliveries,
  },
];
