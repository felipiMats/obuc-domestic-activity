import { object, string } from "zod";

const passwordValidationSchema = object({
  password: string({
    required_error: "Informe sua senha.",
  })
    .min(6, "Senha inválida. Digite ao menos 6 dígitos")
    .refine((value) => value.length <= 256, {
      message: "A senha não pode ter mais de 256 caracteres.",
    }),
});

export default passwordValidationSchema;
