export type Theme = 'light' | 'dark' | (string & {});

export interface ThemeVariables {
  [key: string]: string;
}

export type ThemeStyles = Record<string, ThemeVariables>;
