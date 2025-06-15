export const handleRoleNames = (role: string) => {
  switch (role) {
    case 'Manager':
      return 'Менеджер';
    case 'Editor':
      return 'Редактор';
    case 'ChiefEditor':
      return 'Главный редактор';
    default:
      return 'Неизвестная роль';
  }
};
