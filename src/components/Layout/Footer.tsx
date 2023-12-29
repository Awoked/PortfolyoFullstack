import site from "@/config/site";
import Link from "next/link";
import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { CiCoffeeCup } from "react-icons/ci";
import { FaLinkedinIn } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className={`py-8 border-t`}>
      <div className="container mx-auto">
        <div className="inner flex gap-y-6 flex-wrap items-center justify-between">
          <p className="lg:text-lg font-medium">
            {site.name} {new Date().getFullYear()} &copy; Tüm Hakları Saklıdır.
          </p>

          <div className="social flex gap-4">
            <Link
              href={site.links.linkedin}
              target="_blank"
              className="w-max flex items-end gap-2 hover:opacity-90"
            >
              <FaLinkedinIn size={28} />
              Linkedin
            </Link>
            <Link
              href={site.links.github}
              target="_blank"
              className="w-max flex items-end gap-2 hover:opacity-90"
            >
              <AiFillGithub size={28} />
              Github
            </Link>
            <Link
              href={site.links.buyMeACoffee}
              target="_blank"
              className="w-max flex items-end gap-2 hover:opacity-90"
            >
              <CiCoffeeCup size={28} />
              Bağış yap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

