/**
 * Вызов функций по очереди с одинаковыми аргументами
 * 🔴 Первой функцие необходимо передавать более расширенный тип
 * @param fnList
 * @returns
 */
export function fns<A extends unknown[]>(...fnList: (((...args: A) => void) | undefined)[]) {
  return function (this: (...args: A) => void, ...args: A) {
    for (const fn of fnList) fn?.apply(this, args)
  }
}
