"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  subject: z.string().min(3, {
    message: "Subject must be at least 3 characters.",
  }),
  text: z.string().min(1, {
    message: "Text can't be empty.",
  }),
});

export const sendTicket = async (values: z.infer<typeof formSchema>) => {
  console.log(values);
  //validation on server so no one can manipulate them
  const validateFields = formSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { email, subject, text } = validateFields.data;
  try {
    await db.issue.create({
      data: {
        email,
        subject,
        text,
      },
    });
    revalidatePath("/issues");
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
