import { useRouter } from "next/navigation";
import Image from "next/image";
import classNames from "classnames";
import { Button, Typography } from "@/components";
import { useAuth } from "@/hooks";

interface INavbarProps {
  logoPosition?: "left" | "center" | "right";
}

export function Navbar({ logoPosition = "left" }: INavbarProps) {
  const router = useRouter();
  const { logout, user } = useAuth();

  const LABEL = `Olá, ${user?.name}!`;
  const navbarClasses = classNames(
    "fixed w-screen z-1 bg-vm-background shadow-xl flex flex-row items-center px-4 md:px-12 lg:px-16 box-border py-2 gap-[1vw] md:gap-[4vw]",
    { "justify-center": logoPosition === "center" },
    { "justify-end": logoPosition === "right" },
    { "justify-between": logoPosition === "left" },
  );

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  const handleLogout = () => {
    logout();
    handleNavigation("/login");
  };

  return (
    <div className={navbarClasses}>
      <Image
        className="w-20 sm:w-15 md:w-28 lg:w-30 h-auto cursor-pointer"
        src="/logotipo-cria.png"
        alt="logotipo do CRIA"
        width={150}
        height={50}
        priority
        onClick={() => handleNavigation("/")}
      />
      <div className="flex flex-row items-center gap-3 sm:gap-6">
        <Typography
          level="p"
          weight="light"
          color="text-vm-tertiary"
          className="text-xs"
        >
          {LABEL}
        </Typography>
        <Button variant="link" size="lg" onClick={handleLogout}>
          Sair
        </Button>
      </div>
    </div>
  );
}
