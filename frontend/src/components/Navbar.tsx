import Image from "next/image";
import Link from "next/link";
import { ShoppingBagSheet } from "./ShoppingBagSheet";

interface NavbarProps {}

export const Navbar = ({}: NavbarProps) => {
  return (
    <nav className="flex items-center justify-between text-white px-3 pt-1 fixed top-0 w-full bg-white">
      <div className="flex items-center flex-grow justify-between text-black pt-1 pb-2 border-b-[2px] border-black px-2">
        <button className="focus:outline-none">
          {/* Hamburger Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        {/* Logo */}
        <Link href="/" className="ml-2 text-lg font-semibold">
          <Image
            src={"/logomuyguay.webp"}
            alt="Logo MuyGuay"
            width={150}
            height={40}
          ></Image>
        </Link>

        {/* Shopping Cart Icon */}
        <ShoppingBagSheet />
      </div>
    </nav>
  );
};
