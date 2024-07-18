import { Any } from '../../core'
import { Emitter } from '../../emitter'
import { Prop, PropEvent } from './prop'

export interface LastingPropEvent<TValue> extends PropEvent<TValue> {
  isLast: boolean
}

/**
 * @final
 * Для хранения значений продолжительных/сontinuous процессов, таких как `перетаскивание`
 *
 * @template TEventName - Тип имени события
 * @template TValue - Тип значение
 */
export class LastingProp<TEventName extends string, TValue> extends Prop<TEventName, TValue> {
  /**
   * Хранит в себе последнее значение предыдущего продолжительного процесса
   */
  last: TValue

  constructor(eventName: TEventName, value: TValue, emitter: Emitter<Any>) {
    super(eventName, value, emitter)

    this.last = value

    if (eventName === '*') throw Error('`eventName` cannot be "*"')
    // Делаем `as ''` так как мы уверены что eventName !== '*'
    this.emitter.on(this.eventName as '', (event: LastingPropEvent<TValue>) => {
      if (!event.isLast) return
      this.last = event.value
    })
  }
}
