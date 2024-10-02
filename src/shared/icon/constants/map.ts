import ArrowLeft from '../widgets/arrow-left'
import ArrowRight from '../widgets/arrow-right'
import Check from '../widgets/check'
import ChevronDown from '../widgets/chevron-down'
import ChevronLeft from '../widgets/chevron-left'
import ChevronRight from '../widgets/chevron-right'
import ChevronUp from '../widgets/chevron-up'
import Cross1 from '../widgets/cross1'
import Cross2 from '../widgets/cross2'
import DotsVertical from '../widgets/dots-vertical'
import DoubleChevronLeft from '../widgets/double-chevron-left'
import DoubleChevronRight from '../widgets/double-chevron-right'
import InfoCircled from '../widgets/info-circled'
import Plus from '../widgets/plus'
import Star from '../widgets/star'
import Trash from '../widgets/trash'
import User from '../widgets/user'

export const map = {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  DotsVertical,
  DoubleChevronLeft,
  DoubleChevronRight,
  InfoCircled,
  Plus,
  Star,
  Trash,
  User,
  Cross1,
  Cross2,
  Check,
} satisfies Record<string, React.FC<React.SVGAttributes<SVGSVGElement>>>
