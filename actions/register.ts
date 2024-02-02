"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  console.log(values);
  //validation on server so no one can manipulate them
  const validateFields = RegisterSchema.safeParse(values);

  //equivalent to Response.json({error: "fmkdmf"}) in api routes
  if (!validateFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  //if data exists, take them
  const { name, email, password } = validateFields.data;
  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  //verify that email exists
  const userEmailExist = await db.user.findUnique({
    where: {
      email,
    },
  });

  //if user exists, throw error
  if (userEmailExist) {
    return {
      error: "Email taken!",
    };
  }

  //if its not true, create it
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "Registered successfully!" };
};
