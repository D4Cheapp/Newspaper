export const handleRoleNames = (role: string) => {
  switch (role) {
    case 'Manager':
      return 'Менеджер';
    case 'Editor':
      return 'Автор';
    case 'ChiefEditor':
      return 'Главный редактор';
    default:
      return 'Неизвестная роль';
  }
};
