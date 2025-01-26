/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div>
        <div className="">{children}</div>
      </div>
    </>
  );
};

export default layout;
