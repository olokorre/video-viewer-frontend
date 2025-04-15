import Head from "next/head";
import { useRouter } from "next/router";
import PrimaryButton from "@/components/PrimayButton";
import { videoService } from "./_app";
import { useEffect, useState } from "react";
import VideoList from "@/domain/VideoList";

export default function Home() {
  const router = useRouter();

  const [videos, setVideos] = useState<VideoList[]>([]);
  useEffect(() => {
    async function fetchVideos() {
      const videosData = await videoService.list();
      setVideos(videosData);
    }
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen p-4 pb-20 font-[family-name:var(--font-geist-sans)]">
      <Head>
        <title>Vídeo Viewer</title>
      </Head>
      <header className="w-full flex flex-col sm:flex-row justify-between items-center p-4 border-b">
        <div className="flex items-center gap-4">
          {/* <img src="/logo.png" alt="Logo" className="w-10 h-10" /> */}
          <h1 className="text-2xl font-bold">Vídeo Viewer</h1>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Pesquisar"
            className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <PrimaryButton
            text="Enviar um vídeo"
            onClick={() => router.push("/upload")}
          />
        </div>
      </header>
      <main className="grid gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-7xl mx-auto">
        {videos.length === 0 && (
          <div className="flex flex-col gap-2 items-center sm:items-start rounded-lg border border-gray-300 w-64 h-72 p-4">
            <h2 className="text-xl font-bold">Nenhum vídeo encontrado</h2>
            <p className="text-gray-600">
              Não encontramos nenhum vídeo. Que tal enviar um?
            </p>
            <PrimaryButton
              text="Enviar um vídeo"
              onClick={() => router.push("/upload")}
            />
          </div>
        )}
        {videos.map((video) => {
          return (
            <div
              key={video.name}
              className="flex flex-col gap-2 items-center sm:items-start rounded-lg border border-gray-300 w-64 h-72 p-4"
            >
              <h2 className="text-xl font-bold">{video.name}</h2>
              <p className="text-gray-600">{video.description}</p>
              <PrimaryButton
                text="Assistir"
                onClick={() => router.push(`/watch/${video.id}`)}
              />
            </div>
          );
        })}
      </main>
    </div>
  );
}
