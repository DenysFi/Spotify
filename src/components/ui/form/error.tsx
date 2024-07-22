import { CircleAlert } from "lucide-react";

function Error({ errorMessage }: { errorMessage: string | undefined }) {
  if (!errorMessage) return null;
  return (
    <>
      <div className="inline-flex gap-2" role="alert" aria-label={errorMessage}>
        <div>
          <CircleAlert className="text-red-500  " height={16} width={16} />
        </div>
        <span className="text-[13px] text-red-500 font-extralight">
          {errorMessage}
        </span>
      </div>
    </>
  );
}

export default Error;
