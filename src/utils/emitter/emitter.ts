// ORIGINAL CODE
// https://github.com/developit/mitt/blob/main/src/index.ts

export type EventType = string | symbol

export type Events = Record<EventType, any>

// An event handler can take an optional event argument
// and should not return a value
export type Handler<T = unknown> = (event: T) => void
export type WildcardHandler<T = Record<string, unknown>> = (type: keyof T, event: T[keyof T]) => void

// An array of all currently registered event handlers for a type
export type EventHandlerList<T = unknown> = Array<Handler<T>>
export type WildCardEventHandlerList<T = Record<string, unknown>> = Array<WildcardHandler<T>>

// A map of event types and their corresponding event handlers.
export type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
  keyof Events | '*',
  EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events>
>

/**
 * Mitt: Tiny (~200b) functional event emitter / pubsub.
 * @name mitt
 * @returns {Mitt}
 */
export class Emitter<Events extends Record<EventType, unknown>> {
  all: EventHandlerMap<Events>

  constructor(all?: EventHandlerMap<Events>) {
    this.all = all || new Map()
  }

  /**
   * Register an event handler for the given type.
   * @param {string|symbol} type Type of event to listen for, or `'*'` for all events
   * @param {Function} handler Function to call in response to given event
   * @memberOf mitt
   */
  on<Key extends keyof Events>(
    type: Key | '*',
    handler: Key extends '*' ? WildcardHandler<Events> : Handler<Events[Key]>
  ): () => void {
    const handlers: (WildcardHandler<Events> | Handler<Events[keyof Events]>)[] | undefined = this.all!.get(type)
    if (handlers) {
      handlers.push(handler as Handler<Events[keyof Events]>)
    } else {
      this.all!.set(type, [handler] as EventHandlerList<Events[keyof Events]>)
    }

    return () => this.off(type as Key, handler)
  }

  /**
   * Remove an event handler for the given type.
   * If `handler` is omitted, all handlers of the given type are removed.
   * @param {string|symbol} type Type of event to unregister `handler` from (`'*'` to remove a wildcard handler)
   * @param {Function} [handler] Handler function to remove
   * @memberOf mitt
   */
  off = <Key extends keyof Events | '*'>(
    type: Key,
    handler?: Key extends '*' ? WildcardHandler<Events> : Handler<Events[Key]>
  ) => {
    const handlers: (WildcardHandler<Events> | Handler<Events[keyof Events]>)[] | undefined = this.all!.get(type)
    if (handlers) {
      if (handler) {
        handlers.splice(handlers.indexOf(handler as Handler<Events[keyof Events]>) >>> 0, 1)
      } else {
        this.all!.set(type, [])
      }
    }
  }

  /**
   * Invoke all handlers for the given type.
   * If present, `'*'` handlers are invoked after type-matched handlers.
   *
   * Note: Manually firing '*' handlers is not supported.
   *
   * @param {string|symbol} type The event type to invoke
   * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
   * @memberOf mitt
   */
  emit<Key extends keyof Events>(type: Key, evt?: Events[Key]) {
    let handlers = this.all!.get(type)
    if (handlers) {
      for (let index = 0; index < handlers.length; index++) {
        const handler = handlers[index]
        // @ts-ignore
        handler(evt)
      }
      // ;(handlers as EventHandlerList<Events[keyof Events]>).slice().map((handler) => {
      //   handler(evt!)
      // })
    }

    handlers = this.all!.get('*')
    if (handlers) {
      for (let index = 0; index < handlers.length; index++) {
        const handler = handlers[index]
        // @ts-ignore
        handler(type, evt!)
      }
      // ;(handlers as WildCardEventHandlerList<Events>).slice().map((handler) => {
      //   handler(type, evt!)
      // })
    }
  }
}
