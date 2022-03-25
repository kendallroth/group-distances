// Utilities
// @ts-ignore
import { version } from "../package.json";

interface IWebConfig {
  /** App environment name */
  envName: string;
  links: {
    /** GitHub repository link */
    gitHub: string;
  };
  /** Whether app is deployed in production environment */
  production: boolean;
  /** Web app version */
  version: string;
}

const webConfig: IWebConfig = {
  envName: (import.meta.env.VITE_ENV_NAME as string) ?? "local",
  links: {
    gitHub: "https://github.com/kendallroth/group-distances",
  },
  production: import.meta.env.NODE_ENV === "production",
  version,
};

export default webConfig;
