import explorerViewer from '~/entities/explorer/ui/viewer/story'
import normalizationConfigForm from '~/entities/normalization-config/ui/form/story'
import operationalTableForm from '~/entities/operational-table/ui/form/story'
import storeConfigForm from '~/entities/store-config/ui/form/story'
import operationalTableFormWColumn from '~/entities/table-schema/ui/widgets/columns/story'
import targetTableForm from '~/entities/target-table/ui/form/story'
import uiButton from '~/shared/button/story'
import uiCard from '~/shared/card/story'
import uiCodeEditor from '~/shared/code-editor/story'
import uiCodeEditorVJson from '~/shared/code-editor/variants/json/story'
import uiCollapse from '~/shared/collapse/story'
import uiFormWJsonEditor from '~/shared/form/widgets/json-editor/story'
import uiFormWKeyValue from '~/shared/form/widgets/key-value/story'
import uiFormWTextField from '~/shared/form/widgets/text-field/story'
import uiPagination from '~/shared/pagination/story'
import uiPaginationWInfo from '~/shared/pagination/widgets/info/story'
import uiPaginationWSwitcher from '~/shared/pagination/widgets/switcher/story'
import sortButton from '~/shared/sort/components/button/story'
import type { Story } from '~/shared/storybook'
import tableList from '~/shared/table/components/list/story'
import uiTagPicker from '~/shared/tag-picker/story/index'
import uiTagPickerWTag from '~/shared/tag-picker/widgets/tag/story'
import uiTextHighlighter from '~/shared/text-highlighter/story'
import uiToast from '~/shared/toast/story'
import uiNotificationToastList from '~/shared/toast/variants/notification/list/story'
import uiTreeVNested from '~/shared/tree/variants/nested/story'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const storyList: Story<any>[] = [
  explorerViewer,
  normalizationConfigForm,
  operationalTableForm,
  operationalTableFormWColumn,
  storeConfigForm,
  targetTableForm,
  uiButton,
  uiTreeVNested,
  uiCard,
  uiCodeEditor,
  uiCodeEditorVJson,
  uiCollapse,
  tableList,
  sortButton,
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
