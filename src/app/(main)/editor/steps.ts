import React from "react";
import GeneralForm from "./forms/GeneralForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import EducationInfoForm from "./forms/EducationInfoForm";
import SkillsInfoForm from "./forms/SkillsInfoForm";
import { PortfolioEditorProps } from "@/lib/types";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import ProjectsForm from "./forms/ProjectsForm";

export const steps: {
  title: string;
  subTitle: string;
  component: React.ComponentType<PortfolioEditorProps>;
  key: string;
}[] = [
  {
    title: "General Info",
    subTitle: "This will be not shown on your portfolio.",
    component: GeneralForm,
    key: "general-info",
  },
  {
    title: "Personal Info",
    subTitle: "Tell us about yourself.",
    component: PersonalInfoForm,
    key: "personal-info",
  },
  {
    title: "Work Experience",
    subTitle: "Add your work experience.",
    component: WorkExperienceForm,
    key: "work-experiences",
  },
  {
    title: "Education",
    subTitle: "Enter your educational details",
    component: EducationInfoForm,
    key: "education-info",
  },
  {
    title: "Skills",
    subTitle: "Show off your skills.",
    component: SkillsInfoForm,
    key: "skills-info",
  },
  {
    title: "Projects",
    subTitle: "Enter your projects",
    component: ProjectsForm,
    key: "projects-info",
  },
];
