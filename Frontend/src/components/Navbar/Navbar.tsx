'use client';

import {
  Button,
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/react';


export const Navbar = () => {
  return (
    <HeroNavbar isBordered>
      <NavbarBrand className="cursor-pointer">
        <p className="font-semibold max-md:hidden">MedKids</p>
      </NavbarBrand>
      <NavbarContent justify="center" className="flex gap-[5vw] max-sm:gap-0">
        <NavbarItem>
          <Button color="primary">Меню</Button>
        </NavbarItem>
      </NavbarContent>
    </HeroNavbar>
  );
};
