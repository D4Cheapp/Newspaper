import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from '@heroui/react';

import Link from 'next/link';

import ChevronIcon from 'icons/chevron.svg';

type Props = {
  haveAccess: boolean;
  title: string;
  routes: { label: string; href: string }[];
};

export const NavbarDropdown = ({ title, haveAccess, routes }: Props) => {
  return (
    haveAccess && (
      <Dropdown>
        <NavbarItem>
          <DropdownTrigger>
            <Button
              disableRipple
              className="p-0 bg-transparent data-[hover=true]:bg-transparent"
              endContent={
                <span className="mt-1">
                  <ChevronIcon className="w-6 h-6" />
                </span>
              }
              radius="sm"
              variant="light">
              <p>{title}</p>
            </Button>
          </DropdownTrigger>
        </NavbarItem>
        <DropdownMenu>
          {routes.map(({ label, href }) => (
            <DropdownItem key={href}>
              <Link href={href}>{label}</Link>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    )
  );
};
