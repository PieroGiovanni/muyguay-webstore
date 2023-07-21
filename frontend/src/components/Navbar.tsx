import Image from "next/image";
import Link from "next/link";
import { ShoppingBagSheet } from "./ShoppingBagSheet";
import { HamburguerButton } from "./Buttons/HamburguerButton";

interface NavbarProps {}

export const Navbar = ({}: NavbarProps) => {
  return (
    <nav className="flex items-center justify-between text-white px-3 pt-1 fixed top-0 w-full bg-white">
      <div className="flex items-center flex-grow justify-between text-black pt-1 pb-2 border-b-[2px] border-black px-2">
        <HamburguerButton />

        {/* Logo */}
        <Link href="/" className="ml-2 text-lg font-semibold">
          <Image
            src={"/logomuyguay.webp"}
            alt="Logo MuyGuay"
            width={150}
            height={40}
            priority
          ></Image>
        </Link>

        {/* Shopping Cart Icon */}
        <ShoppingBagSheet />
      </div>
    </nav>
  );
};
