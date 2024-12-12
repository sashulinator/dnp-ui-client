export type PathValue<Obj extends Record<string, unknown>, Key extends string> = Key extends `${infer I1}.${infer I2}`
  ? Obj[I1] extends Record<string, unknown>
    ? PathValue<Obj[I1], I2>
    : Obj[I1]
  : Obj[Key]
