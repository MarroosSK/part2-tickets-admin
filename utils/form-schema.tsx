import * as z from "zod";

export const formSchema = z.object({
  email: z.string().min(2, {
    message: "Please, add proper email with @.",
  }),
  subject: z.string().min(3, {
    message: "Subject must be at least 3 characters.",
  }),
  text: z.string().min(1, {
    message: "Text can't be empty.",
  }),
});
