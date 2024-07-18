import { Any, Id } from '../../core'
import { Emitter } from '../../emitter'
import { Dictionary, DictionaryEvents } from './dictionary'

/**
 * Позволяет производить CRUD операции и подписывает `emitter` на все события `emitter`a элемента
 */
export class EmitterDictionary<
  TEmitter extends Emitter<Any>,
  TEvents extends DictionaryEvents<TEmitter> = DictionaryEvents<TEmitter>,
> extends Dictionary<TEmitter, TEvents> {
  constructor(emitterList: TEmitter[], getId: (s: TEmitter) => Id) {
    super(emitterList, getId)

    this.subscribeToEmitters(emitterList)

    this.subscribeToDictionary()
  }

  private subscribeToEmitters(emitterList: TEmitter[]): void {
    for (let index = 0; index < emitterList.length; index++) {
      const emitter = emitterList[index]
      emitter.on('*', (eventName, ev) => {
        this.emit(eventName as keyof TEvents, { item: emitter, ...ev })
      })
    }
  }

  private subscribeToDictionary(): void {
    this.on('add', (event: DictionaryEvents<TEmitter>['add']) => {
      this.subscribeToEmitters([event.item])
    })
    this.on('update', (event: DictionaryEvents<TEmitter>['update']) => {
      this.subscribeToEmitters([event.item])
    })
    this.on('remove', (event: DictionaryEvents<TEmitter>['remove']) => {
      event.item.off('*')
    })
  }
}
