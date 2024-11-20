import entitieAnalyticsFormWColumn from '~/entities/analytics/ui/form/widgets/column/story'
import entitieAnalyticsFormWDatabase from '~/entities/analytics/ui/form/widgets/database/story'
import entitieAnalyticsFormWSchema from '~/entities/analytics/ui/form/widgets/schema/story'
import entitieAnalyticsFormWTable from '~/entities/analytics/ui/form/widgets/table/story'
import normalizationConfigForm from '~/entities/normalization-config/ui/form/story'
import operationalTableForm from '~/entities/operational-table/ui/form/story'
import storeConfigForm from '~/entities/store-config/ui/form/story'
import targetTableForm from '~/entities/target-table/ui/form/story'
import uiButton from '~/shared/button/story'
import uiCard from '~/shared/card/story'
import uiCodeEditor from '~/shared/code-editor/story'
import uiCodeEditorVJson from '~/shared/code-editor/variants/json/story'
import uiCollapse from '~/shared/collapse/story'
import debugRenderCounter from '~/shared/debug/story'
import sharedFileInput from '~/shared/file/ui/input/story'
import sharedFileUploadModal from '~/shared/file/ui/upload-modal/story'
import uiFormWJsonEditor from '~/shared/form/ui/json-editor/story'
import uiFormWKeyValue from '~/shared/form/ui/key-value/story'
import uiFormWTextArea from '~/shared/form/ui/text-area/story'
import uiFormWTextField from '~/shared/form/ui/text-field/story'
import uiPagination from '~/shared/page/ui/pagination/story'
import uiPaginationWInfo from '~/shared/page/ui/pagination/widgets/info/story'
import uiPaginationWSwitcher from '~/shared/page/ui/pagination/widgets/switcher/story'
import type { Story } from '~/shared/storybook'
import tableList from '~/shared/table/ui/list/story'
import uiTagPicker from '~/shared/tag-picker/story/index'
import uiTagPickerWTag from '~/shared/tag-picker/widgets/tag/story'
import uiTextHighlighter from '~/shared/text/ui/highlighted/story'
import uiToast from '~/shared/toast/story'
import uiNotificationToastList from '~/shared/toast/variants/notification/list/story'
import uiTreeVNested from '~/shared/tree/variants/nested/story'
import explorerViewer from '~/slices/explorer/ui/viewer/story'
import linkMenuLinkMenu from '~/slices/link-menu/ui/link-menu/story'
import sortButton from '~/slices/sort/components/button/story'
import databasTableColumnForm from '~/slices/table/ui/column-form/story'
import databasTableDatabaseTableForm from '~/slices/table/ui/table-form/story'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const storyList: Story<any>[] = [
  /**
   * entities
   */

  explorerViewer,
  normalizationConfigForm,
  operationalTableForm,
  databasTableColumnForm,
  databasTableDatabaseTableForm,
  debugRenderCounter,
  storeConfigForm,
  targetTableForm,
  entitieAnalyticsFormWColumn,
  entitieAnalyticsFormWTable,
  entitieAnalyticsFormWSchema,
  entitieAnalyticsFormWDatabase,

  /**
   * shared
   */

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
  sharedFileInput,
  sharedFileUploadModal,

  /**
   * slices
   */

  linkMenuLinkMenu,
]
