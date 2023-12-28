"use client";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";

import { Chivo_Mono } from "next/font/google";
import Header from "./Header/Header";
import { Navigation } from "@/services/api/navigations/types";
const chivo_mono = Chivo_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const Layout = ({
  children,
  navData,
}: {
  children: React.ReactNode;
  navData: Navigation[];
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <React.Fragment>
      <div className={chivo_mono.className}>
        <div
          className={`fixed inset-0 z-[9999] bg-black grid place-items-center transition-all ${
            isLoaded ? "invisible opacity-0" : "visible opacity-100"
          }`}
        >
          Loading...
        </div>
        <Header navData={navData} />
        {children}
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Layout;
