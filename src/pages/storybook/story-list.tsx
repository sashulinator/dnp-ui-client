import type { Story } from '~/ui/storybook'

import explorerViewer from '~/entities/explorer/ui/viewer/story'
import normalizationConfigForm from '~/entities/normalization-config/ui/form/story'
import operationalTableForm from '~/entities/operational-table/ui/form/story'
import operationalTableFormWColumn from '~/entities/operational-table/ui/form/widgets/columns/story'
import storeConfigForm from '~/entities/store-config/ui/form/story'
import targetTableForm from '~/entities/target-table/ui/form/story'
import uiButton from '~/ui/button/story'
import uiCard from '~/ui/card/story'
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const storyList: Story<any>[] = [
  explorerViewer,
  normalizationConfigForm,
  operationalTableForm,
  operationalTableFormWColumn,
  storeConfigForm,
  targetTableForm,
  uiButton,
  uiCard,
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
