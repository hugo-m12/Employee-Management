import React from 'react';
import { Link } from "wouter";
function Header() {

  return (
    <>
      <header className="text-center">
        <div className="text-white bg-cover bg-center">

          <nav className="hidden md:flex justify-center gap-16 p-7 list-none">
            <li>
              <Link
                className="text-gray-400 no-underline transition-colors duration-300 hover:text-black hover:underline ml-2"
                href="/Home"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-400 no-underline transition-colors duration-300 hover:text-black hover:underline ml-2"
                href="/Admin"
              >
                Admin Panel
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-400 no-underline transition-colors duration-300 hover:text-black hover:underline ml-2"
                href="/"
              >
                Log Out
              </Link>
            </li>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
