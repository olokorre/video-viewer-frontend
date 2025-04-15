import Head from "next/head";
import { useRouter } from "next/router";
import PrimaryButton from "@/components/PrimayButton";

export default function Home() {
  const router = useRouter();

  return (
    <div
      className={` grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <Head>
        <title>Vídeo Viewer</title>
      </Head>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <PrimaryButton
          text="Enviar um vídeo"
          onClick={() => router.push("/upload")}
        />
      </main>
    </div>
  );
}
