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
import { PortfolioEditorProps } from "@/lib/types";
import {
  GeneralInfoValues,
  workExperienceSchema,
  WorkExperienceValues,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface WorkInfoFormProps extends PortfolioEditorProps {
  setFormRef?: (form: UseFormReturn<GeneralInfoValues>) => void;
}

function WorkExperienceForm({
  portfolioData,
  setPortfolioData,
}: WorkInfoFormProps) {
  const form = useForm<WorkExperienceValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperiences: portfolioData.workExperiences || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      const timeout = setTimeout(async () => {
        const isValid = await form.trigger();
        if (isValid) {
          setPortfolioData({
            ...portfolioData,
            workExperiences:
              values.workExperiences?.filter((exp) => exp !== undefined) || [],
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
        <h1 className="text-2xl font-bold">Work Experience</h1>
        <p className="text-muted-foreground text-sm">
          Tell us about your work experiences.
        </p>
      </div>
      <Form {...form}>
        {fields.map((field, index) => (
          <WorkExperienceItem
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
              position: "",
              company: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
        >
          Add Work Experience
        </Button>
      </div>
    </div>
  );
}

interface WorkExperienceItemProps {
  id: string;
  form: UseFormReturn<WorkExperienceValues>;
  index: number;
  remove: (index: number) => void;
}

const WorkExperienceItem = ({
  id,
  form,
  index,
  remove,
}: WorkExperienceItemProps) => {
  return (
    <div>
      <div></div>
      <div className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name={`workExperiences.${index}.position`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Software Engineer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`workExperiences.${index}.company`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="Microsoft" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name={`workExperiences.${index}.startDate`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`workExperiences.${index}.endDate`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormDescription>
          Leave <span className="font-semibold">end date</span> empty if you are
          currently working here.
        </FormDescription>
        <FormField
          control={form.control}
          name={`workExperiences.${index}.description`}
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
        <div>
          <Button variant="destructive" onClick={() => remove(index)}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkExperienceForm;
