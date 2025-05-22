import dnpDcdatabaseInput from '~/entities/database-container/dcdatabase/input/story'
import dcdatabaseListTable from '~/entities/database-container/dcdatabase/list-table/story'
import dcdatabasePicker from '~/entities/database-container/dcdatabase/picker/story'
import dcrowTableList from '~/entities/database-container/dcrow/list-table/story'
import eDcserviceForm from '~/entities/database-container/dcservice/form/story'
import dcserviceInput from '~/entities/database-container/dcservice/input/story'
import dcserviceListTable from '~/entities/database-container/dcservice/list-table/story'
import dcservicePicker from '~/entities/database-container/dcservice/picker/story'
import dctableInput from '~/entities/database-container/dctable/input/story'
import dctableListTable from '~/entities/database-container/dctable/list-table/story'
import dctableMultipicker from '~/entities/database-container/dctable/multipicker/story'
import eDatabaseContanerDctablePicker from '~/entities/database-container/dctable/picker/story'
import eExecutableswRegexp from '~/entities/processing/executable/w.field-factory/regexp-functions/story'
import eExecutableswFackerColConfig from '~/entities/processing/executable/w.field-factory/w.facker-col-config/story'
import uiButton from '~/shared/button/story'
import uiCalendar from '~/shared/calendar/story'
import uiCard from '~/shared/card/story'
import uiCardInput from '~/shared/card/v.input/story'
import uiCollapse from '~/shared/collapse/story'
import debugRenderCounter from '~/shared/debug/story'
import sharedFileInput from '~/shared/file/ui/input/story'
import sharedFileUploadModal from '~/shared/file/ui/upload-modal/story'
import uiFormWKeyValue from '~/shared/form/key-value/story'
import uiInputBase from '~/shared/input/base/story'
import uiInput from '~/shared/input/story'
import sharedlinkTree from '~/shared/link-tree/story'
import linkMenuFormMenu from '~/shared/link-tree/w.form/story'
import sharedMultiselect from '~/shared/multiselect/ui/story'
import uiMultiselectPicker from '~/shared/multiselect/widgets/picker/story'
import uiPagination from '~/shared/page/ui/pagination/story'
import uiPaginationWInfo from '~/shared/page/ui/pagination/widgets/info/story'
import uiPaginationWSwitcher from '~/shared/page/ui/pagination/widgets/switcher/story'
import sharedSelectMultiple from '~/shared/select-multiple/story'
import uiSelectInput from '~/shared/select/v.input/story'
import selectSelectWInput from '~/shared/select/v.labeled/story'
import optionFilter from '~/shared/select/w.option-filter/story'
import type { Story } from '~/shared/storybook'
import tableList from '~/shared/table/-list/story'
import eProcessingWProcedureWValuePerColumn from '~/shared/table/-matrix/story'
import uiTagPicker from '~/shared/tag-picker/story/index'
import uiTagPickerWTag from '~/shared/tag-picker/widgets/tag/story'
import sharedTextInput from '~/shared/text-input/story'
import uiTextHighlighter from '~/shared/text/ui/highlighted/story'
import uiToast from '~/shared/toast/story'
import uiNotificationToastList from '~/shared/toast/variants/notification/list/story'
import uiTreeVNested from '~/shared/tree/variants/nested/story'
import uiViewWithAvatar from '~/shared/view/with-avatar/story'
import uiComponentFactory from '~/slices/layout-schema/story'
import sliceMonacoEditor from '~/slices/monaco-editor/story'
import sortButton from '~/slices/sort/components/button/story'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const storyList: Story<any>[] = [
  /**
   * entities
   */

  dcserviceListTable,
  dcservicePicker,
  dcserviceInput,
  dcdatabaseListTable,
  eDatabaseContanerDctablePicker,
  dnpDcdatabaseInput,
  dcdatabasePicker,
  dctableInput,
  dcrowTableList,
  eProcessingWProcedureWValuePerColumn,
  debugRenderCounter,
  eDcserviceForm,
  dctableListTable,
  uiSelectInput,
  eExecutableswRegexp,
  dctableMultipicker,

  /**
   * shared
   */

  uiComponentFactory,
  uiViewWithAvatar,
  sharedMultiselect,
  uiMultiselectPicker,
  uiCardInput,
  uiCalendar,
  eExecutableswFackerColConfig,
  selectSelectWInput,
  optionFilter,
  uiInput,
  sharedTextInput,
  sharedSelectMultiple,
  sharedlinkTree,
  uiButton,
  uiTreeVNested,
  uiCard,
  uiCollapse,
  tableList,
  sortButton,
  uiInputBase,
  uiTextHighlighter,
  uiTagPicker,
  uiTagPickerWTag,
  uiFormWKeyValue,
  uiPagination,
  uiPaginationWInfo,
  uiPaginationWSwitcher,
  uiToast,
  uiNotificationToastList,
  sharedFileInput,
  sharedFileUploadModal,
  sliceMonacoEditor,

  /**
   * slices
   */

  linkMenuFormMenu,
]
