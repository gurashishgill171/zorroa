"use client";

import { generalInfoSchema, GeneralInfoValues } from "@/lib/validations";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function GeneralForm() {
  const form = useForm<GeneralInfoValues>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: GeneralInfoValues) {
    console.log(values);
  }
  return (
    <div className="mx-auto flex max-w-xl flex-col space-y-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold">General Info</h1>
        <p className="text-sm font-light">
          This will not appear on your portfolio.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="My portfolio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="A portfolio for my self." {...field} />
                </FormControl>
                <FormDescription>
                  Describe what&apos;s the portfolio is about
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

export default GeneralForm;
