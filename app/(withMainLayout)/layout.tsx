/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import Footer from "@/components/share/Footer/Footer";
import Navbar from "@/components/share/Navbar/Navabr";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div>
        <Navbar/>
        <div className="">{children}</div>
      </div>
      <div >
        <Footer/>
      </div>
    </>
  );
};

export default layout;