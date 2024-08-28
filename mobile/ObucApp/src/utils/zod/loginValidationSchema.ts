import { z } from "zod";

const loginValidationSchema = z.object({
  email: z
    .string({
      required_error: "Informe seu e-mail.",
    })
    .max(256, { message: "Informe um email de até 256 caracteres." })
    .email({ message: "E-mail inválido." }),
  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export default loginValidationSchema;
