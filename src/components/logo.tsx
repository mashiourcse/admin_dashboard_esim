import darkLogo from "@/assets/logos/dark.svg";
import logo from "@/assets/logos/main.svg";
import Image from "next/image";
import oneworld from "@/assets/logos/oneworld.webp";
export function Logo() {
  return (
    <div className="relative h-16 max-w-[10.847rem]">
      <Image
        src={oneworld}
        fill
        className="dark:hidden"
        alt="company logo"
        role="presentation"
        quality={100}
      />

      <Image
        src={oneworld}
        fill
        className="hidden dark:block"
        alt="logo"
        role="presentation"
        quality={100}
      />
    </div>
  );
}
