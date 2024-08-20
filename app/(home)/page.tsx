import { Button } from "../_components/ui/button";
import Header from "../_components/header";
import { Search, SearchIcon } from "lucide-react";
import { Input } from "../_components/ui/input";
import Image from "next/image";
import { Card, CardContent } from "../_components/ui/card";
import { Badge } from "../_components/ui/badge";
import { Avatar, AvatarImage } from "../_components/ui/avatar";
import { db } from "../_lib/prisma";
import BarbershopItem from "../_components/barbershop-items";
import { quickSearchOptions } from "../_constants/search";
import { useSession } from "next-auth/react";

const Home = async () => {
  const barbershops = await db.barbershop.findMany({});
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return (
    <div>
      <Header barbershops={barbershops} />

      <div className="mt-6 px-5 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {quickSearchOptions.map((option) => (
          <Button className="gap-2" variant="secondary" key={option.title}>
            <Image
              src={option.imageUrl}
              width={16}
              height={16}
              alt={option.title}
            />
            {option.title}
          </Button>
        ))}
      </div>

      <div className="relative w-full h-[150px] mt-4">
        <Image
          alt="banner image"
          src="/Banner Pizza.png"
          fill
          className="object-contain rounded-xl"
        />
      </div>
      <h2 className="px-5 p-4 text-xs font-bold uppercase text-gray-400">
        Agendamentos
      </h2>

      <div className="px-5">
        <Card className=" rounded-xl">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col justify-between py-5 gap-2 px-5">
              <Badge className="w-fit">Confirmado</Badge>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">Corte de Cabelo</h3>
                <div className="flex items-center gap-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/barb1.jpeg" />
                  </Avatar>
                  <p className="text-md">Barbearia Bonzão</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-4 border-l-2 border-solid">
              <p className="text-sm">Fevereiro</p>
              <p className="text-2xl">06</p>
              <p className="text-sm">15:00</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="px-5 p-4 text-xs font-bold uppercase text-gray-400">
        Recomendados
      </h2>
      <div className="flex px-5 gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
        {barbershops.map((barbershop) => (
          <BarbershopItem key={barbershop.id} barbershop={barbershop} />
        ))}
      </div>

      <h2 className="mb-3 px-5 mt-6 text-xs font-bold uppercase text-gray-400">
        Populares
      </h2>
      <div className="flex px-5 gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
        {popularBarbershops.map((barbershop) => (
          <BarbershopItem key={barbershop.id} barbershop={barbershop} />
        ))}
      </div>
    </div>
  );
};

export default Home;
