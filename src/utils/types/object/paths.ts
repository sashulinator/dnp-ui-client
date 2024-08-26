/**
 * НЕ ОРИГИАЛЬНЫЙ ФАЙЛ ИЗ TS_TOOLBELT
 *
 * смотри
 * Object.Paths broken with TS 4.9
 * https://github.com/millsp/ts-toolbelt/issues/322
 */
type DistributedKeyof<Target> = Target extends any ? keyof Target : never

type DistributedAccess<Target, Key> = Target extends any ? (Key extends keyof Target ? Target[Key] : undefined) : never

type Leaf = Date | boolean | string | number | symbol | bigint

type DepthCounter = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export type Paths<Target, Depth extends DepthCounter[number] = 10> = Depth extends never
  ? never
  : Target extends never
    ? never
    : Target extends Leaf
      ? never
      : {
          [Key in string & DistributedKeyof<Target>]:
            | [Key]
            | (NonNullable<DistributedAccess<Target, Key>> extends (infer ArrayItem)[]
                ?
                    | [Key, number]
                    | (Paths<ArrayItem, DepthCounter[Depth]> extends infer V extends any[]
                        ? [Key, number, ...V]
                        : never)
                : Paths<NonNullable<DistributedAccess<Target, Key>>, DepthCounter[Depth]> extends infer V extends any[]
                  ? [Key, ...V]
                  : never)
        }[string & DistributedKeyof<Target>]
