'use client';

import { Navbar as HeroNavbar, NavbarBrand, NavbarContent } from '@heroui/react';
import { Roles } from 'constants/roles';
import { chiefEditorRoutes, editorRoutes, managerRoutes } from 'constants/routes';

import { useEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { NavbarDropdown } from './NavbarDropdown';

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [role, setRole] = useState<Roles>();

  const haveEditorAccess = role === Roles.editor || role === Roles.chiefEditor;
  const haveManagerAccess = role === Roles.manager || role === Roles.chiefEditor;
  const haveChiefEditorAccess = role === Roles.chiefEditor;

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role) {
      setRole(role as Roles);
    } else {
      router.push('/');
    }
  }, []);

  if (pathname === '/') {
    return null;
  }

  return (
    <HeroNavbar isBordered>
      <NavbarBrand className="cursor-pointer">
        <img src="/icons/newspaper.svg" alt="" />
      </NavbarBrand>
      <NavbarContent justify="center" className="flex gap-[5vw] max-sm:gap-0">
        <NavbarDropdown
          title="Меню редактора"
          haveAccess={haveEditorAccess}
          routes={editorRoutes}
        />
        <NavbarDropdown
          title="Меню менеджера"
          haveAccess={haveManagerAccess}
          routes={managerRoutes}
        />
        <NavbarDropdown
          title="Меню главного редактора"
          haveAccess={haveChiefEditorAccess}
          routes={chiefEditorRoutes}
        />
      </NavbarContent>
      <NavbarContent justify="end" />
    </HeroNavbar>
  );
};
