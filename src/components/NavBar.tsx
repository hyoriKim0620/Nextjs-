"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavItem from "./NavItem";
import { User } from "@prisma/client";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";

interface NavbarProps {
  currentUser?: User | null;
}

const NavBar = ({ currentUser }: NavbarProps) => {
  const [menu, setMenu] = useState(false);
  // console.log("@currentUser : ", currentUser);

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <nav className="relative z-10 w-full bg-orange-500 text-white">
      <div className="flex items-center justify-between mx-5 sm:mx-10 lg:mx-20">
        {/* logo */}
        <div className="flex items-center text-2xl h-14">
          {/* <Link href="/">플리마켓</Link>*/}
          <Link href="/" className="relative">
            또사마켓
            <FontAwesomeIcon
              icon={faCartShopping as IconProp}
              className="ml-2 absolute top-[4px]"
            />
          </Link>
        </div>

        {/* menu */}
        <div className="text-2xl sm:hidden">
          {menu === false ? (
            <button onClick={handleMenu}>+</button>
          ) : (
            <button onClick={handleMenu}>-</button>
          )}
        </div>

        {/* nav-items large screen*/}
        <div className="hidden sm:block">
          <NavItem currentUser={currentUser} />
        </div>
      </div>
      {/* nav-items mobile*/}
      <div className="block sm:hidden">
        {menu === false ? null : <NavItem mobile currentUser={currentUser} />}
      </div>
    </nav>
  );
};

export default NavBar;
