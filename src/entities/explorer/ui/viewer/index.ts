/**
 * ui
 */
import { default as Root } from './ui/viewer'

/**
 * widgets
 */
import Breadscrums from './widgets/breadscrums'
import List from './widgets/list'
import Table from './widgets/table'

export { NAME, type Props as ViewerProps } from './ui/viewer'

export default {
  Root,
  List,
  Table,
  Breadscrums,
}
