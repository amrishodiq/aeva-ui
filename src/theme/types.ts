export type Theme = 'light' | 'dark' | (string & {});

export interface ThemeVariables {
  [key: string]: string | undefined;
}

export interface CustomTheme {
  extends?: 'light' | 'dark';
  variables: ThemeVariables;
  [key: string]: any;
}

export type ThemeStyles = Record<string, CustomTheme | ThemeVariables>;
