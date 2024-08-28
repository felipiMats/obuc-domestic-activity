import { object, string } from "zod";

const nameValidationSchema = object({
  name: string({
    required_error: "Informe seu nome.",
  })
    .min(3, "Nome inválido. Digite o seu nome e sobrenome.")
    .refine((value) => value.trim().split(/\s+/).length >= 2, {
      message: "Nome inválido. Digite o seu nome e sobrenome.",
    })
    .refine(
      (value) =>
        value
          .trim()
          .split(/\s+/)
          .every((word) => word.length >= 2),
      {
        message: "Nome inválido. Digite o seu nome e sobrenome.",
      }
    )
    .refine((value) => value.length <= 256, {
      message: "O nome não pode ter mais de 256 caracteres.",
    }),
});

export default nameValidationSchema;
