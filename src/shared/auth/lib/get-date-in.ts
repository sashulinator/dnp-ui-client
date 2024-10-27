/**
 * Получить дату через @param inSeconds секунд
 */
export function getDateIn(inSeconds: number): Date {
  const now = new Date()
  now.setSeconds(now.getSeconds() + inSeconds)
  return now
}
