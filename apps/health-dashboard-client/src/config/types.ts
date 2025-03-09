export type Env = 'DEV' | 'TST' | 'STG' | 'PRD';

export interface CommonConfig {
  endpoints: Endpoints;
}

export interface Endpoints {
  filters: string;
  claims: string;
}

export interface Apis {
  healthDashboardApi: string;
}

export interface EnvConfig {
  apis: Apis;
}

export type Config = CommonConfig & EnvConfig;