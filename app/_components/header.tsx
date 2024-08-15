import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";
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

const Header = () => {
  return (
    <Card>
      <CardContent className="flex justify-between items-center p-5">
        <Image alt="Barberia" src="/logo.png" height={18} width={120}></Image>

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
  );
};

export default Header;
