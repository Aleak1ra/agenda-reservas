import PhonesItem from "@/app/_components/phones-item";
import ServiceItemsBarberShop from "@/app/_components/services-item";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { db } from "@/app/_lib/prisma";
import {
  ChevronLeftIcon,
  MapPin,
  MenuIcon,
  SmartphoneIcon,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BarbarshopPageProps {
  params: {
    id: string;
  };
}

const BarberShopPage = async ({ params }: BarbarshopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    return notFound();
  }

  return (
    <div>
      <div className="relative w-full h-[250px]">
        <Image
          alt={barbershop.name}
          src={barbershop.imageUrl}
          fill
          className="object-cover"
        />

        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-5"
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-5"
        >
          <MenuIcon />
        </Button>
      </div>
      <div>
        <h3 className="p-5 text-3xl">{barbershop.name}</h3>

        <div className="flex px-5 py-1 gap-2">
          <MapPin className="text-primary" />
          <p>{barbershop.address}</p>
        </div>
        <div className="flex gap-2 px-5 py-1">
          <Star className="text-primary" />
          <p>5,0 (889 avaliações)</p>
        </div>
      </div>

      <Separator className="my-5" />

      <div>
        <h2 className="px-5 pb-4 text-xs uppercase text-gray-400">Sobre nós</h2>
        <p className="px-5">{barbershop.description}</p>
      </div>

      <Separator className="my-5" />

      <div>
        <h2 className="px-5 pb-4 text-xs uppercase text-gray-400">Serviços</h2>

        <div className="px-5">
          {barbershop.services.map((service) => (
            <ServiceItemsBarberShop key={service.id} service={service} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="px-5 pb-4 text-xs uppercase text-gray-400">Contatos</h3>
        {barbershop.phones.map((phone) => (
          <PhonesItem key={phone} phone={phone} />
        ))}
      </div>
    </div>
  );
};

export default BarberShopPage;
