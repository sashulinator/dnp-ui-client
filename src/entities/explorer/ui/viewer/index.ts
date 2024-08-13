/**
 * ui
 */

import { default as Root } from './ui/viewer'

export { NAME, type Props as ViewerProps } from './ui/viewer'

/**
 * widgets
 */

import Breadscrums from './widgets/breadscrums'
import List from './widgets/list'
import Table from './widgets/table'

export default {
  Root,
  List,
  Table,
  Breadscrums,
}
