import normalizationConfigForm from '~dnp/entities/normalization-config/ui/form/story'
import operationalTableForm from '~dnp/entities/operational-table/ui/form/story'
import storeConfigForm from '~dnp/entities/store-config/ui/form/story'
import targetTableForm from '~dnp/entities/target-table/ui/form/story'
import uiButton from '~dnp/shared/button/story'
import uiCard from '~dnp/shared/card/story'
import uiCodeEditor from '~dnp/shared/code-editor/story'
import uiCodeEditorVJson from '~dnp/shared/code-editor/variants/json/story'
import uiCollapse from '~dnp/shared/collapse/story'
import databasTableColumnForm from '~dnp/shared/database/ui/column-form/story'
import databasTableDatabaseTableForm from '~dnp/shared/database/ui/table-form/story'
import debugRenderCounter from '~dnp/shared/debug/story'
import explorerViewer from '~dnp/shared/explorer/ui/viewer/story'
import uiFormWJsonEditor from '~dnp/shared/form/widgets/json-editor/story'
import uiFormWKeyValue from '~dnp/shared/form/widgets/key-value/story'
import uiFormWTextArea from '~dnp/shared/form/widgets/text-area/story'
import uiFormWTextField from '~dnp/shared/form/widgets/text-field/story'
import uiPagination from '~dnp/shared/page/ui/pagination/story'
import uiPaginationWInfo from '~dnp/shared/page/ui/pagination/widgets/info/story'
import uiPaginationWSwitcher from '~dnp/shared/page/ui/pagination/widgets/switcher/story'
import sortButton from '~dnp/shared/sort/components/button/story'
import type { Story } from '~dnp/shared/storybook'
import tableList from '~dnp/shared/table/ui/list/story'
import uiTagPicker from '~dnp/shared/tag-picker/story/index'
import uiTagPickerWTag from '~dnp/shared/tag-picker/widgets/tag/story'
import uiTextHighlighter from '~dnp/shared/text/ui/highlighted/story'
import uiToast from '~dnp/shared/toast/story'
import uiNotificationToastList from '~dnp/shared/toast/variants/notification/list/story'
import uiTreeVNested from '~dnp/shared/tree/variants/nested/story'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const storyList: Story<any>[] = [
  explorerViewer,
  normalizationConfigForm,
  operationalTableForm,
  databasTableColumnForm,
  databasTableDatabaseTableForm,
  debugRenderCounter,
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
  uiFormWTextArea,
  uiPagination,
  uiPaginationWInfo,
  uiPaginationWSwitcher,
  uiToast,
  uiNotificationToastList,
]
