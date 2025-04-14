import Head from "next/head";

export default function Docs() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Head>
        <title>Documentação</title>
        <meta name="description" content="Documentação do projeto" />
      </Head>
      <h1 className="text-4xl font-bold">Documentação</h1>
      <p className="text-lg">Em breve...</p>
    </div>
  );
}
