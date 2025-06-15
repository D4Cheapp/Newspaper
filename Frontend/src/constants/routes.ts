export enum Routes {
  home = '/',
  publications = '/publications',
  createPublication = '/publications/create',
}

export const managerRoutes = [
  {
    label: 'Публикации',
    href: Routes.publications,
  },
];

export const chiefEditorRoutes = [
  {
    label: 'Публикации',
    href: Routes.publications,
  },
];
