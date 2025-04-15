import FileInput from "@/components/FileInput";
import FormSubmit from "@/components/FormSubmit";
import TextInput from "@/components/TextInput";
import VideoForm from "@/domain/VideoForm";
import Head from "next/head";
import { videoService } from "../_app";
import { useRouter } from "next/router";

export default function Upload() {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const form = event.currentTarget;
      const name = (form.elements.namedItem("name") as HTMLInputElement).value;
      const description = (
        form.elements.namedItem("description") as HTMLInputElement
      ).value;
      const fileInput = form.elements.namedItem("content") as HTMLInputElement;
      const file = fileInput.files?.[0] as File;
      const video = new VideoForm(name, description, file);
      await videoService.upload(video);
      router.back();
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Erro ao enviar o vídeo. Tente novamente.");
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
            accept="video/mov,mp4,m4a,3gp,3g2,mj2"
          />
          <div className="h-4" />
          <FormSubmit />
        </fieldset>
      </form>
    </div>
  );
}
