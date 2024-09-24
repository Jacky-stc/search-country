import Search from "@/components/Search";
import { Button } from "@nextui-org/react";

export default function Home() {
  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Search></Search>
    </div>
  );
}
