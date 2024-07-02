import Button from '~/ui/button/story'
import uiFormWJsonEditor from '~/ui/form/widgets/json-editor/story'
import TextField from '~/ui/form/widgets/key-value/story'
import uiFormWKeyValue from '~/ui/form/widgets/text-field/story'
import Pagination from '~/ui/pagination/story'
import Info from '~/ui/pagination/widgets/info/story'
import Switcher from '~/ui/pagination/widgets/switcher/story'
import type { Story } from '~/ui/storybook'
import uiTagPicker from '~/ui/tag-picker/story/index'
import uiTagPickerWTag from '~/ui/tag-picker/widgets/tag/story'
import uiTextHighlighter from '~/ui/text-highlighter/story'

export const storyList: Story<any>[] = [
  uiTextHighlighter,
  uiFormWJsonEditor,
  TextField,
  uiTagPicker,
  uiTagPickerWTag,
  uiFormWKeyValue,
  Button,
  Pagination,
  Info,
  Switcher,
]
