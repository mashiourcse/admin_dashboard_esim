import darkLogo from "@/assets/logos/dark.svg";
import logo from "@/assets/logos/main.svg";
import Image from "next/image";
import oneworld from "@/assets/logos/oneworld.webp";
import oneworlddark from "@/assets/oneworld/white.png";
import oneworldlight from "@/assets/oneworld/color.png";

export function Logo() {
  return (
    <div className="relative h-[6.00em] max-w-[12.5em]">
      <Image
        src={oneworldlight}
        fill
        className="dark:hidden"
        alt="company logo"
        role="presentation"
        quality={100}
      />

      <Image
        src={oneworlddark}
        fill
        className="hidden dark:block"
        alt="logo"
        role="presentation"
        quality={100}
      />
    </div>
  );
}
