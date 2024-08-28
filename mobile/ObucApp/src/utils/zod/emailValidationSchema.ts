import { object, string } from 'zod';

const emailValidationSchema = object({
  email: string({
      required_error: 'Informe seu e-mail.',
    })
    .max(256, {message: 'Informe um email de até 256 caracteres.'})
    .email({message: 'E-mail inválido.'})
});

export default emailValidationSchema;