import { useRouter } from "next/router";
import PrimaryButton from "./PrimayButton";
import SecondaryButton from "./SecondaryButton";

export default function FormSubmit() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="flex justify-end space-x-2">
      <SecondaryButton text="Cancelar" type="button" onClick={goBack} />
      <PrimaryButton text="Enviar" type="submit" />
    </div>
  );
}
