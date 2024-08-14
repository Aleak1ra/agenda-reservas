import { Card, CardContent } from "./ui/card";
import { db } from "../_lib/prisma";
import Image from "next/image";
import { BarbershopService } from "@prisma/client";
import { Button } from "./ui/button";

interface ServiceItemProps {
  service: BarbershopService;
}

const ServiceItemsBarberShop = async ({ service }: ServiceItemProps) => {
  return (
    <div>
      <Card className="mb-4">
        <CardContent className="flex p-4 gap-3">
          <div className="relative h-[110px] w-[110px]">
            <Image
              alt={service?.name}
              fill
              className="rounded-2xl object-cover"
              src={service?.imageUrl}
            />
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">{service?.name}</h3>
            <div className="flex justify-between">
              
            <p className="text-sm text-gray-400 p-1">{service?.description}</p>
            <Button variant="secondary">Reservar</Button>
            </div>

            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service?.price))}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceItemsBarberShop;
