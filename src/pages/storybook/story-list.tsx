import type { Story } from '~/ui/storybook'

import normalizationConfigForm from '~/entities/normalization-config/ui/form/story'
import uiButton from '~/ui/button/story'
import uiCodeEditor from '~/ui/code-editor/story'
import uiCodeEditorVJson from '~/ui/code-editor/variants/json/story'
import uiCollapse from '~/ui/collapse/story'
import uiFormWJsonEditor from '~/ui/form/widgets/json-editor/story'
import uiFormWKeyValue from '~/ui/form/widgets/key-value/story'
import uiFormWTextField from '~/ui/form/widgets/text-field/story'
import uiPagination from '~/ui/pagination/story'
import uiPaginationWInfo from '~/ui/pagination/widgets/info/story'
import uiPaginationWSwitcher from '~/ui/pagination/widgets/switcher/story'
import uiTagPicker from '~/ui/tag-picker/story/index'
import uiTagPickerWTag from '~/ui/tag-picker/widgets/tag/story'
import uiTextHighlighter from '~/ui/text-highlighter/story'
import uiToast from '~/ui/toast/story'
import uiNotificationToastList from '~/ui/toast/variants/notification/list/story'

export const storyList: Story<any>[] = [
  normalizationConfigForm,
  uiButton,
  uiCodeEditor,
  uiCodeEditorVJson,
  uiCollapse,
  uiTextHighlighter,
  uiTagPicker,
  uiTagPickerWTag,
  uiFormWJsonEditor,
  uiFormWKeyValue,
  uiFormWTextField,
  uiPagination,
  uiPaginationWInfo,
  uiPaginationWSwitcher,
  uiToast,
  uiNotificationToastList,
]
