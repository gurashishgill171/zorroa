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
import { PortfolioEditorProps } from "@/lib/types";
import { projectSchema, ProjectValues } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

function ProjectsForm({
  portfolioData,
  setPortfolioData,
}: PortfolioEditorProps) {
  const form = useForm<ProjectValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projects: portfolioData.projects || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      const timeout = setTimeout(async () => {
        const isValid = await form.trigger();
        if (isValid) {
          setPortfolioData({
            ...portfolioData,
            projects: values.projects?.filter((pro) => pro !== undefined) || [],
          });
        }
      }, 300);

      return () => clearTimeout(timeout);
    });

    return () => subscription.unsubscribe();
  }, [form.watch, setPortfolioData]);

  return (
    <div className="mx-auto flex max-w-xl flex-col space-y-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Projects Info</h1>
        <p className="text-muted-foreground text-sm">
          Add your projects to showcase your work.
        </p>
      </div>
      <Form {...form}>
        {fields.map((field, index) => (
          <ProjectItem
            id={field.id}
            key={field.id}
            index={index}
            form={form}
            remove={remove}
          />
        ))}
      </Form>
      <div className="flex justify-center">
        <Button
          onClick={() =>
            append({
              title: "",
              description: "",
              url: "",
              photoUrl: "",
            })
          }
        >
          Add Project
        </Button>
      </div>
    </div>
  );
}

interface ProjectItemProps {
  id: string;
  index: number;
  form: UseFormReturn<ProjectValues>;
  remove: (index: number) => void;
}

const ProjectItem = ({ id, index, form, remove }: ProjectItemProps) => {
  return (
    <div>
      <div></div>
      <div className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name={`projects.${index}.title`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Full Stack youtube clone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`projects.${index}.description`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name={`projects.${index}.url`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deployed Link</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`projects.${index}.photoUrl`}
            render={({ field: { value, ...fieldValues } }) => (
              <FormItem>
                <FormLabel>Project Image</FormLabel>
                <FormControl>
                  <Input
                    {...fieldValues}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      fieldValues.onChange(file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <Button variant="destructive" onClick={() => remove(index)}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsForm;
