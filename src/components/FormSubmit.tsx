import { useRouter } from "next/router";
import SecondaryButton from "./SecondaryButton";
import PrimaryButton from "./PrimaryButton";

interface FormSubmitProps {
  disabled?: boolean; // Propriedade para desativar o botão de envio
  text?: string; // Propriedade para personalizar o texto do botão (opcional, padrão: "Enviar")
}

export default function FormSubmit({
  disabled = false,
  text = "Enviar",
}: FormSubmitProps) {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="flex justify-end space-x-2">
      <SecondaryButton text="Cancelar" type="button" onClick={goBack} />
      <PrimaryButton text={text} type="submit" disabled={disabled} />
    </div>
  );
}
