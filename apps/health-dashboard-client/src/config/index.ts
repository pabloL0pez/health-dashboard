import { commonConfig } from "@/config/config.common";
import { devConfig } from "@/config/config.dev";
import { Config, Env, EnvConfig } from "@/config/types";

const getEnvConfig = (): EnvConfig => {
  const env = process.env.NEXT_PUBLIC_ENV as Env | undefined;

  if (!env) {
    return devConfig;
  }

  const envConfigs: Record<Env, EnvConfig> = {
    'DEV': devConfig,
    'TST': devConfig,
    'STG': devConfig,
    'PRD': devConfig,
  }

  return envConfigs[env];
}

export const useConfig = (): Config => {
  return {
    ...commonConfig,
    ...getEnvConfig(),
  }
}