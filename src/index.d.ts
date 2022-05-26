declare function env(key: string): string

declare const utils: {
  int(key:string, defaultValue?: number): number | undefined
  float(key:string, defaultValue?: number): number | undefined
  bool(key:string, defaultValue?: boolean): boolean | undefined
  json(key:string, defaultValue?: object): object | undefined
  array(key:string, defaultValue?: string): string | undefined
  date(key:string, defaultValue?: string): string | undefined
}
