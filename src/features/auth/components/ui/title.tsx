import { type FC, type ReactNode } from "react";

const Title: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <h2 className="font-extrabold sm:text-4xl text-2xl text-white text-center leading-loose mb-10">
      {children}
    </h2>
  );
};
export default Title;
