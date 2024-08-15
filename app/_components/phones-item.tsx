"use client";
import { CopyCheckIcon, SmartphoneIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface PhonesItemProps {
  phone: string;
}

const PhonesItem = ({ phone }: PhonesItemProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPhoneClick = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="mb-2 px-5 flex items-center justify-between" key={phone}>
      <div className="flex gap-2">
        <SmartphoneIcon size="20px" />
        <p className="text-sm">{phone}</p>
      </div>
      <Button
        className="min-w-[80px] flex justify-center"
        variant="outline"
        onClick={() => handleCopyPhoneClick(phone)}
      >
        {copied ? <CopyCheckIcon size="20px" /> : "Copiar"}
      </Button>
    </div>
  );
};

export default PhonesItem;
