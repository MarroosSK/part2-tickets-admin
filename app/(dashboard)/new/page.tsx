//export const dynamic = "force-dynamic";
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";

import { sendTicket } from "@/actions/send-issue";
import { formSchema } from "@/utils/form-schema";
import { FormErrors } from "./_components/form-errors";
import { FormSuccess } from "./_components/form-success";
import FormWrapper from "./_components/form-wrapper";

const NewIssuePage = () => {
  //for pending when sending data
  const [isPending, startTransition] = useTransition();
  //states for error/success messages from server
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      subject: "",
      text: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    //reset error/success messages at start of every submit
    setError("");
    setSuccess("");

    startTransition(() => {
      sendTicket(values).then((data) => {
        setError(data?.error);
        setSuccess("Sent successfully!");
      });
    });
  };

  return (
    <main className="w-full flex flex-col mb-20">
      <div>
        <h2 className="pl-8 pt-12 md:pt-0  mt-4 text-2xl font-extrabold tracking-tight lg:text-4xl text-slate-600">
          New Issue
        </h2>
      </div>

      <div className="flex-1 space-y-4 p-8">
        <FormWrapper>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="john.doe@example.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="e.g: lost password"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isPending}
                        placeholder="Tell us about your issue."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* error/ success */}
              <FormErrors message={error} />
              <FormSuccess message={success} />
              <Button
                type="submit"
                className="w-full bg-slate-500 hover:bg-slate-800"
              >
                Submit
              </Button>
            </form>
          </Form>
        </FormWrapper>
      </div>
    </main>
  );
};

export default NewIssuePage;
