import Image from "next/image";
import { LoginForm, Typography } from "@/components";

const CRIA_LABEL = "Central de Resguardo à Infância Assistida";

export default function Login() {
  const classnames = {
    container:
      "py-15 px-10 w-full h-full min-h-screen flex flex-col items-center justify-start gap-10 md:gap-13 lg:20 bg-[url(/background-image.webp)] bg-cover bg-fixed bg-center bg-black/80 bg-blend-multiply",
    section: "flex flex-col items-center gap-7 px-4",
    logoContainer: "flex items-center gap-7 h-fit",
    criaLogo: "w-20 md:w-28 xl:w-36 h-auto cursor-pointer",
    rioPrefeituraLogo: "w-16 md:w-24 xl:w-32 h-auto cursor-pointer",
    divider: "border-l-1 w-2 self-stretch border-vm-primary",
  };
  return (
    <div className={classnames.container}>
      <div className={classnames.section}>
        <div className={classnames.logoContainer}>
          <Image
            className={classnames.criaLogo}
            src="/logotipo-cria.png"
            alt="logotipo do CRIA"
            width={150}
            height={50}
            priority
          />
          <div className={classnames.divider} />
          <Image
            className={classnames.rioPrefeituraLogo}
            src="/rio-prefeitura.png"
            alt="logotipo da Rio prefeitura"
            width={751}
            height={377}
            priority
          />
        </div>
        <Typography level="h2" color="text-vm-light" align="center">
          {CRIA_LABEL}
        </Typography>
      </div>
      <LoginForm />
    </div>
  );
}
