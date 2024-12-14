/**
 * ui
 */
import { Select } from '@radix-ui/themes'

export type {
  RootProps,
  GroupProps,
  ItemProps,
  ContentProps,
  TriggerProps,
  LabelProps,
  SeparatorProps,
} from '@radix-ui/themes/dist/esm/components/select.d.ts'

const Component = {
  Root: Select.Root,
  Content: Select.Content,
  Group: Select.Group,
  Item: Select.Item,
  Trigger: Select.Trigger,
  Separator: Select.Separator,
  Label: Select.Label,
}

export default Component
