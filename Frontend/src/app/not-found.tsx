import { Routes } from 'constants/routes';

import { redirect } from 'next/navigation';

const NotFound = () => {
  return redirect(Routes.home);
};

export default NotFound;
