import { useState } from "react";
import FileInput from "@/components/FileInput";
import FormSubmit from "@/components/FormSubmit";
import TextInput from "@/components/TextInput";
import VideoForm from "@/domain/VideoForm";
import Head from "next/head";
import { videoService } from "../_app";
import { useRouter } from "next/router";

export default function Upload() {
  const router = useRouter();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setUploadProgress(0);
    setIsUploading(true);

    try {
      const form = event.currentTarget;
      const name = (form.elements.namedItem("name") as HTMLInputElement).value;
      const description = (
        form.elements.namedItem("description") as HTMLInputElement
      ).value;
      const fileInput = form.elements.namedItem("content") as HTMLInputElement;
      const file = fileInput.files?.[0];
      if (!file) {
        throw new Error("Nenhum arquivo selecionado.");
      }
      const video = new VideoForm(name, description, file);
      await videoService.upload(video, (progress: number) => {
        setUploadProgress(progress);
      });
      router.back();
    } catch (error) {
      console.error("Error uploading video:", error);
      setError(error?.toString() || "Erro ao enviar o vídeo. Tente novamente.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 px-8 md:px-16 pt-8 md:pt-16 w-full max-w-4xl mx-auto text-gray-900 dark:text-gray-100">
      <Head>
        <title>Enviar um vídeo</title>
        <meta name="description" content="Enviar um vídeo para o servidor" />
      </Head>

      <h1 className="text-3xl font-bold">Enviar um vídeo</h1>
      <p className="text-base text-gray-600 dark:text-gray-400">
        Selecione um vídeo para enviar. O vídeo será enviado para o servidor e
        será exibido na página de visualização.
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <fieldset className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
          <legend className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Geral
          </legend>
          <TextInput
            name="name"
            label="Nome"
            placeholder="Nome do vídeo"
            required={true}
          />
          <div className="h-4" />
          <TextInput
            name="description"
            label="Descrição"
            placeholder="Descrição do vídeo"
            required={true}
          />
          <div className="h-4" />
          <FileInput
            name="content"
            label="Vídeo"
            placeholder="Selecione um vídeo"
            required={true}
            accept="video/mov,video/mp4,video/m4a,video/3gp,video/3g2,video/mj2"
          />
          <div className="h-4" />
          {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
              <p className="text-sm mt-2">
                {uploadProgress < 100 && isUploading
                  ? `Progresso: ${uploadProgress}%`
                  : "Processando..."}
              </p>
            </div>
          )}
          <div className="h-4" />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <FormSubmit
            disabled={isUploading}
            text={
              isUploading
                ? uploadProgress < 100
                  ? "Enviando..."
                  : "Processando..."
                : "Enviar"
            }
          />
        </fieldset>
      </form>
    </div>
  );
}
