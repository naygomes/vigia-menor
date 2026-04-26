import Image from "next/image";

export function Footer() {
  const DEVELOP_BY = "Desenvolvido por ";
  const NAME = "Nayara Gomes";

  const classnames = {
    container:
      "w-screen bg-vm-background flex flex-col sm:flex-row items-center gap-5 justify-between px-16 box-border py-10",
    description: "text-xl text-vm-dark text-center sm:text-left",
    rioPrefeituraLogo: "w-16 md:w-24 xl:w-32 h-auto cursor-pointer",
  };

  return (
    <div className={classnames.container}>
      <p className={classnames.description}>
        {DEVELOP_BY}
        <b className="text-vm-primary">{NAME}</b>
      </p>
      <Image
        className={classnames.rioPrefeituraLogo}
        src="/rio-prefeitura.png"
        alt="logotipo da Rio prefeitura"
        width={751}
        height={377}
        priority
      />
    </div>
  );
}
