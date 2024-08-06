import Image from "next/image";
import { Button } from "./_components/ui/button";
import Header from "./_components/header";
import { Search, SearchIcon } from "lucide-react";
import { Input } from "./_components/ui/input";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="p-5">
        <div className="">
          <h2 className="text-xl font-bold">Olá, Carlos</h2>
          <p className="text-md">Sexta-feira, 2 de fevereiro</p>

          <div className="flex flex-row pt-4">
            <Input placeholder="Faça sua busca..." />
            <Button size="icon">
              <SearchIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
