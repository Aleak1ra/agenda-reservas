import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
    return ( 
        <Card>
            <CardContent className="flex justify-between items-center p-5">
                <Image alt="Barberia" src="/logo.png" height={18} width={120}></Image>
                <Button size="icon" variant="outline">
                    <MenuIcon/>
                </Button>
            </CardContent>
        </Card>
     );
}
 
export default Header;