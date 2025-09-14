import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./button";

const Navbar = () => {
  return (
    <div className="flex flex-row w-full justify-between p-5 border-b-2 shadow-teal-900">
      <Link href="/apartments">
        <Image src="/logo.png" alt="logo" width={50} height={50} />
      </Link>

      <div className="flex gap-5 justify-center items-center ">
        <Link href={"/apartments/create"} className="text-lg font-semibold">
          <Button>Create</Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
