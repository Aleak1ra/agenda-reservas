"use client";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  CalendarIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  SearchIcon,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { quickSearchOptions } from "../_constants/search";
import SidebarButton from "./sidebar-button";
import { Input } from "./ui/input";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

const Header = ({ barbershops }: { barbershops: any[] }) => {
  const { data } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBarbershops, setFilteredBarbershops] = useState(barbershops);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    const results = barbershops.filter((barbershop) =>
      barbershop.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBarbershops(results.slice(0, 5));

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [suggestionsRef, searchTerm, barbershops]);

  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  const formattedDate = today.toLocaleDateString("pt-BR", options);

  return (
    <div>
      <Card>
        <CardContent className="flex justify-between items-center p-5">
          <Link href="/">
            <Image alt="Barberia" src="/logo.png" height={18} width={120} />
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SidebarButton />
          </Sheet>
        </CardContent>
      </Card>

      <div className="p-4 flex flex-col items-center">
        <h2>Olá, {data?.user?.name}</h2>
        <div className="flex gap-2">
          <p>
            {formattedDate ? `Hoje é ${formattedDate}` : "Carregando data..."}
          </p>
          <CalendarIcon size={24} />
        </div>
      </div>

      <div className="flex items-center gap-2 p-5">
        <Input
          placeholder="Faça sua busca..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button size="icon">
          <SearchIcon />
        </Button>
      </div>

      {/* Renderiza as sugestões */}
      {searchTerm && (
        <div
          ref={suggestionsRef}
          className=" bg-black bg-opacity-90 shadow-md w-full  rounded-lg"
        >
          {filteredBarbershops.length > 0 ? (
            filteredBarbershops.map((barbershop) => (
              <Link
                key={barbershop.id}
                href={`/barbershop/${barbershop.id}`}
                className="block px-4 py-2 hover:bg-primary"
              >
                {barbershop.name}
              </Link>
            ))
          ) : (
            <p className="p-4 text-sm text-gray-500">
              Nenhuma barbearia encontrada.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
