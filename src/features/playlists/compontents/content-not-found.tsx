import { Button } from "@/components/ui/button";

export function ContentNotFound() {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center bg-primaryBg">
      <div className="my-6 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white">Произошла ошибка</h2>
        <p className="mb-10 text-xl text-[#a7a7a7]">
          Мы не нашли нужный контент
        </p>
        <Button
          onClick={() => window.location.assign(window.location.origin)}
          variant={"pillFilled"}
          size={"lg"}
          hover={"pulse"}
        >
          На главную
        </Button>
      </div>
    </section>
  );
}
