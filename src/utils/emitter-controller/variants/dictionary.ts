import { Id } from '~/utils/core'

import { Key, find, get } from '../../dictionary'
import { Emitter } from '../../emitter'
import { toDictionary } from '../../list'

export type DictionaryEvents<TItem> = {
  add: { item: TItem }
  update: { item: TItem }
  remove: { item: TItem }
}

/**
 * Позволяет подписаться на события добвления/обновления/удаления
 */
export class Dictionary<TItem, E extends DictionaryEvents<TItem> = DictionaryEvents<TItem>> extends Emitter<E> {
  items: Record<Key, TItem>

  getId: (s: TItem) => Id

  constructor(itemList: TItem[], getId: (s: TItem) => Id) {
    super()

    this.getId = getId

    this.items = toDictionary(getId, itemList) || {}
  }

  values(): TItem[] {
    return Object.values(this.items)
  }

  get = (id: Key | undefined): TItem => {
    return get(this.items, id)
  }

  find = (id: Key | undefined): TItem | undefined => {
    return find(this.items, id)
  }

  add = (item: TItem, event?: Record<string, unknown>): void => {
    this.items[this.getId(item)] = item
    this.emit('add', { item, ...event })
  }

  update = (item: TItem, event?: Record<string, unknown>): void => {
    this.items[this.getId(item)] = item
    this.emit('update', { item, ...event })
  }

  remove = (key: Key, event?: Record<string, unknown>): void => {
    const item = this.get(key)
    this.items[this.getId(item)] = item
    delete this.items[this.getId(item)]
    this.emit('remove', { item, ...event })
  }
}
