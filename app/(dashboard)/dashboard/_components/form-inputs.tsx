"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormWrapper from "./form-wrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";

import { sendTicket } from "@/actions/send-issue";
import { formSchema } from "@/utils/form-schema";
import { FormErrors } from "./form-errors";
import { FormSuccess } from "./form-success";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const FormInputs = () => {
  const { toast } = useToast();
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
    toast({
      variant: "default",
      title: "Issue Sent",
      description: new Date().toString(),
    });
  };

  return (
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
            className="w-full flex gap-2 bg-slate-500 hover:bg-slate-800"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default FormInputs;
