import { object, string } from "zod";

const passwordValidationSchema = object({
  password: string().min(6, "A senha deve ter pelo menos 6 caracteres."),
  confirmPassword: string().min(6, "A senha deve ter pelo menos 6 caracteres."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"]
});

export default passwordValidationSchema;
