import eDcserviceCardInput from '~/entities/database-container/dcservice/ui/card/story'
import eDcserviceForm from '~/entities/database-container/dcservice/ui/form/story'
import eDatabaseContanerDctableInput from '~/entities/database-container/dctable/ui/input/story'
import dctableListTable from '~/entities/database-container/dctable/ui/list-table/story.ts'
import eExecutableswFackerColConfig from '~/entities/processing/executable/w.field-factory/w.facker-col-config/story'
import uiButton from '~/shared/button/story'
import uiCalendar from '~/shared/calendar/story'
import uiCard from '~/shared/card/story'
import uiCardInput from '~/shared/card/v.input/story'
import uiCodeEditor from '~/shared/code-editor/story'
import uiCodeEditorVJson from '~/shared/code-editor/variants/json/story'
import uiCollapse from '~/shared/collapse/story'
import debugRenderCounter from '~/shared/debug/story'
import sharedFileInput from '~/shared/file/ui/input/story'
import sharedFileUploadModal from '~/shared/file/ui/upload-modal/story'
import sharedFormCheckbox from '~/shared/form/ui/checkbox/story'
import uiFormWJsonEditor from '~/shared/form/ui/json-editor/story'
import uiFormWKeyValue from '~/shared/form/ui/key-value/story'
import uiFormWTextArea from '~/shared/form/ui/text-area/story'
import uiFormWTextField from '~/shared/form/w.string-field/story'
import sharedFormETextInputVShared from '~/shared/form/w.string-field/v.typed/story'
import sharedFormUnionField from '~/shared/form/w.union-field/v.typed/story'
import uiInput from '~/shared/input/story'
import sharedlinkTree from '~/shared/link-tree/story'
import linkMenuFormMenu from '~/shared/link-tree/w.form/story'
import uiPagination from '~/shared/page/ui/pagination/story'
import uiPaginationWInfo from '~/shared/page/ui/pagination/widgets/info/story'
import uiPaginationWSwitcher from '~/shared/page/ui/pagination/widgets/switcher/story'
import sharedSelectMultiple from '~/shared/select-multiple/story'
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
import sliceMonacoEditor from '~/slices/monaco-editor/story'
import sharedReactFactory from '~/slices/react-factory/story'
import sortButton from '~/slices/sort/components/button/story'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const storyList: Story<any>[] = [
  /**
   * entities
   */

  eDatabaseContanerDctableInput,
  eProcessingWProcedureWValuePerColumn,
  debugRenderCounter,
  eDcserviceForm,
  eDcserviceCardInput,
  dctableListTable,

  /**
   * shared
   */

  uiViewWithAvatar,
  uiCardInput,
  uiCalendar,
  eExecutableswFackerColConfig,
  sharedReactFactory,
  selectSelectWInput,
  optionFilter,
  uiInput,
  sharedFormETextInputVShared,
  sharedTextInput,
  sharedSelectMultiple,
  sharedlinkTree,
  uiButton,
  uiTreeVNested,
  uiCard,
  uiCodeEditor,
  uiCodeEditorVJson,
  uiCollapse,
  tableList,
  sortButton,
  sharedFormUnionField,
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
  sharedFormCheckbox,
  sharedFileInput,
  sharedFileUploadModal,
  sliceMonacoEditor,

  /**
   * slices
   */

  linkMenuFormMenu,
]
