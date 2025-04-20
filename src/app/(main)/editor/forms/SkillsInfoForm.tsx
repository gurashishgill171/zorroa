import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PortfolioEditorProps } from "@/lib/types";
import {
  GeneralInfoValues,
  skillsSchema,
  SkillsValues,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import React, { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

interface SkillsFormProps extends PortfolioEditorProps {
  setFormRef?: (form: UseFormReturn<GeneralInfoValues>) => void;
}

function SkillsInfoForm({ portfolioData, setPortfolioData }: SkillsFormProps) {
  const form = useForm<SkillsValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: portfolioData.skills || [],
    },
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      const timeout = setTimeout(async () => {
        const isValid = await form.trigger();
        if (isValid) {
          setPortfolioData({
            ...portfolioData,
            skills: values.skills?.filter((skill) => skill !== undefined) || [],
          });
        }
      }, 300);

      return () => clearTimeout(timeout);
    });

    return () => subscription.unsubscribe();
  }, [form.watch, setPortfolioData]);

  const skills = form.watch("skills") || [];

  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newSkill = e.currentTarget.value.trim();

      if (newSkill && !skills.includes(newSkill)) {
        form.setValue("skills", [...skills, newSkill]);
        form.trigger("skills");
      }
      e.currentTarget.value = "";
    }
  };

  const removeSkill = (skill: string) => {
    form.setValue(
      "skills",
      skills.filter((s) => s !== skill),
    );
    form.trigger("skills");
  };
  return (
    <div className="mx-auto flex max-w-xl flex-col space-y-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Skills</h1>
        <p className="text-muted-foreground text-sm">
          Showcase your skills on your portfolio. You can add or remove skills
          as needed.
        </p>
      </div>
      <Form {...form}>
        <FormField
          control={form.control}
          name="skills"
          render={() => (
            <FormItem>
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
      </Form>
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
    </div>
  );
}

export default SkillsInfoForm;
