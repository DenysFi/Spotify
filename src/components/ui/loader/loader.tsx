import { type FC, type ReactNode } from "react";
import Spinner from "../spinner/spinner";

const Loader: FC<{ isLoading: boolean; children: ReactNode }> = ({
  isLoading,
  children,
}) => {
  return isLoading ? (
    <div className="h-screen w-screen flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  ) : (
    children
  );
};
export default Loader;
