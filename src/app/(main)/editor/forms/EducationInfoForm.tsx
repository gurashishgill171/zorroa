import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { PortfolioEditorProps } from "@/lib/types";
import {
  educationSchema,
  EducationValues,
  GeneralInfoValues,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

interface EducationFormProps extends PortfolioEditorProps {
  setFormRef?: (form: UseFormReturn<GeneralInfoValues>) => void;
}

function EducationInfoForm({
  portfolioData,
  setPortfolioData,
}: EducationFormProps) {
  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: portfolioData.educations || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      const timeout = setTimeout(async () => {
        const isValid = await form.trigger();
        if (isValid) {
          setPortfolioData({
            ...portfolioData,
            educations:
              values.educations?.filter((edu) => edu !== undefined) || [],
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
        <h1 className="text-2xl font-bold">Education Info</h1>
        <p className="text-muted-foreground text-sm">
          Tell us about your education.
        </p>
      </div>
      <Form {...form}>
        {fields.map((field, index) => (
          <EducationItem
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
              degree: "",
              school: "",
              startDate: "",
              endDate: "",
              description: "",
            })
          }
        >
          Add Education
        </Button>
      </div>
    </div>
  );
}

interface EducationItemProps {
  id: string;
  index: number;
  form: UseFormReturn<EducationValues>;
  remove: (index: number) => void;
}

const EducationItem = ({ id, index, form, remove }: EducationItemProps) => {
  return (
    <div>
      <div></div>
      <div className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name={`educations.${index}.degree`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Degree</FormLabel>
              <FormControl>
                <Input placeholder="B.E. Computer Science" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`educations.${index}.school`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>School</FormLabel>
              <FormControl>
                <Input
                  placeholder="Thapar Institute of Engineering and Technology"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name={`educations.${index}.startDate`}
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
            name={`educations.${index}.endDate`}
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
          currently studying here.
        </FormDescription>
        <FormField
          control={form.control}
          name={`educations.${index}.description`}
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
export default EducationInfoForm;
