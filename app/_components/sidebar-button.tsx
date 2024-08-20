"use client";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Sheet,
  MenuIcon,
  HomeIcon,
  CalendarIcon,
  LogOutIcon,
  LogIn,
} from "lucide-react";
import { quickSearchOptions } from "../_constants/search";
import { Button } from "./ui/button";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "./ui/sheet";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react";

const SidebarButton = () => {
  const { data } = useSession();
  const handleLoginWithGoogleClick = () => signIn("google");
  const handleLogoutClick = () => signOut();

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center gap-3 border-b border-solid py-5 justify-between">
        {data?.user ? (
          <div className="">
            <Avatar>
              <AvatarImage
                className="max-h-[100px] rounded-full"
                src={data.user?.image || ""}
              />
            </Avatar>

            <p className="font-bold">{data.user?.name}</p>
            <p className="text-xs">{data.user?.email}</p>
          </div>
        ) : (
          <h2 className="px-5">Faça seu login</h2>
        )}

        <Dialog>
          <DialogTrigger>
            {data?.user ? (
              <Button variant={"outline"}>
                Sair
              </Button>
            ) : (
              <Button variant={"outline"}>
                <LogIn />
                Entrar
              </Button>
            )}
          </DialogTrigger>
          {data?.user ? (
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Deseja realmente sair?</DialogTitle>
                <DialogDescription>
                  Clique no botão abaixo para confirmar.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex gap-2 items-center justify-center"
                    onClick={handleLogoutClick}
                  >
                    Confirmar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          ) : (
            <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Faça o login na plataforma:</DialogTitle>
              <DialogDescription>
                Faça o login com sua conta Google!
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="flex gap-2 items-center justify-center" onClick={handleLoginWithGoogleClick}>
                  <Image alt="google icon" src="/google.svg" width={18} height={18}></Image>
                  <p className="font-bold">Google</p>
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
          )}
        </Dialog>
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>
        <Button className="justify-start gap-2" variant="ghost">
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        {quickSearchOptions.map((option) => (
          <Button
            key={option.title}
            className="justify-start gap-2"
            variant="ghost"
          >
            <Image
              alt={option.title}
              src={option.imageUrl}
              height={18}
              width={18}
            />
            {option.title}
          </Button>
        ))}
      </div>
    </SheetContent>
  );
};

export default SidebarButton;
