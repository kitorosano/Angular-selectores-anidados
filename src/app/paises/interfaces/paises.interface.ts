export interface PaisSmall {
  name: Name;
  cca3: string;
  borders: string[];
}

export interface Name {
  common:     string;
  official:   string;
  nativeName: NativeName;
}

export interface NativeName {
  spa: SPA;
}

export interface SPA {
  official: string;
  common:   string;
}