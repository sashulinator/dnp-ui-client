import * as v from 'valibot'

/**
 * Base
 */

export const dcdatabase = v.object({
  id: v.pipe(v.string(), v.nonEmpty()),
  name: v.pipe(v.string(), v.nonEmpty()),
  display: v.string(),
  dcserviceId: v.pipe(v.string(), v.nonEmpty()),
})

/**
 * CreateInput
 */

export const dcdatabaseCreateInput = v.omit(dcdatabase, ['id'])

/**
 * UpdateInput
 */

export const dcdatabaseUpdateInput = dcdatabase

/**
 * Locator
 * Местонахождение таблицы
 */

export const dcdatabaseLocator = v.pick(dcdatabase, ['name', 'display', 'dcserviceId'])
