import { Badge } from "@/components/ui/badge";
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
import { useEdgeStore } from "@/lib/edgestore";
import { PortfolioEditorProps } from "@/lib/types";
import {
  GeneralInfoValues,
  PortfolioValues,
  projectSchema,
  ProjectValues,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project } from "@prisma/client";
import { X } from "lucide-react";
import React, { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

interface ProjectsFormProps extends PortfolioEditorProps {
  setFormRef?: (form: UseFormReturn<GeneralInfoValues>) => void;
}

function ProjectsForm({ portfolioData, setPortfolioData }: ProjectsFormProps) {
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
            portfolioData={portfolioData}
            setPortfolioData={setPortfolioData}
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
              photoUrl: null,
              skills: [],
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
  portfolioData: PortfolioValues;
  setPortfolioData: (data: PortfolioValues) => void;
}

const ProjectItem = ({
  index,
  form,
  remove,
  portfolioData,
  setPortfolioData,
}: ProjectItemProps) => {
  const { edgestore } = useEdgeStore();
  const skills = form.watch(`projects.${index}.skills`) || [];
  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newSkill = e.currentTarget.value.trim();

      if (newSkill && !skills.includes(newSkill)) {
        form.setValue(`projects.${index}.skills`, [...skills, newSkill]);
        form.trigger(`projects.${index}.skills`);
      }
      e.currentTarget.value = "";
    }
  };
  const removeSkill = (skill: string) => {
    form.setValue(
      `projects.${index}.skills`,
      skills.filter((s) => s !== skill),
    );
    form.trigger(`projects.${index}.skills`);
  };
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
        <FormField
          control={form.control}
          name={`projects.${index}.skills`}
          render={() => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type a skill and press Enter..."
                  onKeyDown={addSkill}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="flex items-center">
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <X size={12} />
              </button>
            </Badge>
          ))}
        </div>
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
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { value, ...fieldValues } }) => (
              <FormItem>
                <FormLabel>Project Image</FormLabel>
                <FormControl>
                  <Input
                    {...fieldValues}
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      fieldValues.onChange(file);
                      if (file) {
                        const res = await edgestore.publicImages.upload({
                          file,
                        });

                        if (res.url) {
                          const updatedProjects = [...portfolioData.projects];
                          updatedProjects[index] = {
                            ...updatedProjects[index],
                            photoUrl: res.url,
                          };

                          setPortfolioData({
                            ...portfolioData,
                            projects: updatedProjects,
                          });
                          form.setValue(`projects.${index}.photoUrl`, res.url);
                        }
                      }
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
