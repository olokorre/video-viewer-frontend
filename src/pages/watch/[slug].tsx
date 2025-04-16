import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import VideoView from "@/domain/VideoView";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { videoService } from "../_app";

export default function WatchPage() {
  const router = useRouter();
  const { slug: videoId } = router.query;
  const [video, setVideo] = useState<VideoView | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function fetchVideo() {
      try {
        const video = await videoService.getVideo(videoId as string);
        setVideo(video);
      } catch (err) {
        setError("Falha ao carregar o vídeo. Tente novamente: " + err);
      }
    }
    if (videoId) {
      fetchVideo();
    }
  }, [videoId]);

  useEffect(() => {
    if (!video || !videoRef.current) return;

    const videoElement = videoRef.current;
    const videoSrc =
      videoService.api + "/videos/watch/" + video.id + "/content.m3u8";

    // Verifica se o navegador suporta HLS nativamente
    if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
      videoElement.src = videoSrc;
    } else if (Hls.isSupported()) {
      // Usa HLS.js para navegadores que não suportam HLS nativamente
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          setError(
            "Erro ao reproduzir o vídeo. Verifique a conexão ou tente novamente."
          );
        }
      });
    } else {
      setError("Seu navegador não suporta reprodução de vídeos HLS.");
    }

    // Limpeza ao desmontar o componente
    return () => {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.destroy();
      }
    };
  }, [video]);

  return (
    <div className="min-h-screen p-4 pb-20 font-[family-name:var(--font-geist-sans)]">
      <Head>
        <title>{video?.title ?? "Video Viewer"}</title>
      </Head>
      <header className="w-full flex flex-col sm:flex-row justify-between items-center p-4 border-b">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">
            <Link href={"/"}>Vídeo Viewer</Link>
          </h1>
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
      <main className="max-w-6xl mx-auto px-4 mt-8">
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Left Content: Video Player and Details */}
          <div className="flex-1">
            {video ? (
              <>
                {/* Video Player */}
                <div className="w-full h-64 sm:h-96">
                  <video
                    ref={videoRef}
                    className="w-full h-full rounded-lg"
                    controls
                    autoPlay
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                </div>
                {/* Video Details */}
                <div className="mt-4">
                  <h2 className="text-2xl font-bold mb-2">{video.title}</h2>
                  <p className="text-gray-700 mb-4">{video.description}</p>
                  <div className="flex items-center gap-4">
                    <PrimaryButton text="Like" icon="👍" />
                    <SecondaryButton text="Dislike" icon="👎" />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-2 items-center justify-center rounded-lg border border-gray-300 p-8">
                <h2 className="text-xl font-bold">Carregando vídeo...</h2>
                <p className="text-gray-600">
                  Aguarde enquanto o vídeo é carregado.
                </p>
              </div>
            )}
          </div>
          <aside className="w-full sm:w-1/3">
            <h3 className="text-xl font-bold mb-4">Recomendações</h3>
            <div className="flex flex-col gap-4">
              <span>Ainda não disponíveis...</span>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
