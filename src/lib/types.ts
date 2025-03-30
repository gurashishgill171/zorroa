import { PortfolioValues } from "./validations";

export type PortfolioEditorProps = {
  portfolioData: PortfolioValues;
  setPortfolioData: (data: PortfolioValues) => void;
};
