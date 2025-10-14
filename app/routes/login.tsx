import type { Route } from "./+types/login";
import { Alert, Button } from "flowbite-react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "~/components/forms";
import { FormButton } from "~/components/forms";
import { useApi } from "~/context/ApiContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ingresar | SIBNE" },
    { name: "description", content: "Pantalla de inicio de sesión" },
  ];
}

export default function LoginPage() {
  const { error, login, user, hasRole, loading } = useApi();
  const navigate = useNavigate();

  const schema = z.object({
    userName: z
      .string()
      .min(1, "El usuario es obligatorio")
      .min(3, "Mínimo 3 caracteres"),
    password: z.string().min(3, "Mínimo 3 caracteres"),
  });

  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { userName: "", password: "" },
    mode: "onTouched",
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    await login(data);
    // La redirección sucede en el efecto cuando user esté disponible
  });

  // Redirección basada en rol cuando el usuario ya está en contexto
  useEffect(() => {
    if (loading) return;
    if (!user) return;
    if (hasRole("Administrador")) {
      navigate("/admin", { replace: true });
    } else if (hasRole(["Usuario Empresa", "Empresa"])) {
      navigate("/empresa", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [user, loading, hasRole, navigate]);

  return (
    <main className="container flex min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        <div className="max-w-sm bg-card border border-app rounded-lg shadow-sm">
          <div className="p-5">
            <h5 className="text-2xl font-bold tracking-tight text-app">
              Sistema de Información del Balance Nacional de Energía
            </h5>
            <p className="text-base text-muted">
              Inicie sesión para continuar
            </p>
            {error && (
              <Alert color="failure" className="mb-4 mt-3">
                {error}
              </Alert>
            )}
            <FormProvider {...methods}>
              <form
                className="flex flex-col gap-4 mt-4"
                onSubmit={onSubmit}
                noValidate
              >
                <FormInput
                  label="Usuario"
                  name="userName"
                  placeholder="Escriba su usuario"
                />
                <FormInput
                  label="Contraseña"
                  name="password"
                  type="password"
                  placeholder="Escriba su contraseña"
                />
                <div className="flex justify-end -mt-2">
                  <Button
                    type="button"
                    className="p-0 h-auto underline !bg-transparent hover:!bg-transparent focus:!ring-0 active:!bg-transparent border-0 shadow-none text-blue-600 dark:text-blue-400"
                    onClick={() => {}}
                  >
                    Recuperar contraseña
                  </Button>
                </div>
                <FormButton
                  type="submit"
                  fullWidth
                  isLoading={methods.formState.isSubmitting}
                  disabled={methods.formState.isSubmitting}
                >
                  Ingresar
                </FormButton>
                <p className="text-center text-sm text-primary dark:text-gray-300">
                  También Puedes Ingresar Con Tu Clave Unica
                </p>
                <Button color="blue" type="button" fullSized>
                  Iniciar sesión
                </Button>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </main>
  );
}
