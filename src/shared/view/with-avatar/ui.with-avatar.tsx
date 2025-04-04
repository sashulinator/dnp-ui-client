import Avatar from '~/shared/avatar'
import Flex, { type FlexProps } from '~/shared/flex'
import Icon, { type IconName } from '~/shared/icon'
import Skeleton from '~/shared/skeleton'
import Text from '~/shared/text'
import { c } from '~/utils/core'

export type Props = FlexProps & {
  iconName: IconName
  title?: string | undefined
  subtitle?: string | undefined
  loading?: boolean | undefined
}

const NAME = 'ui-view-withAvatar'

export default function Component(props: Props): JSX.Element {
  const { className, iconName, title, subtitle, loading = false, ...flexProps } = props

  return (
    <Flex className={c(className, NAME)} align='center' {...flexProps}>
      <Skeleton loading={loading} style={{ borderRadius: '50%' }} width='var(--space-7)' height='var(--space-7)'>
        <Avatar mr='2' radius='full' fallback={<Icon width='1.2rem' height='1.2rem' name={iconName} />} />
      </Skeleton>
      <Flex direction='column' gap={loading ? '1' : '0'}>
        <Skeleton loading={loading} width='5rem'>
          <Text size='2'>{title}</Text>
        </Skeleton>
        <Skeleton loading={loading} width='5rem'>
          <Text size='1' color='gray'>
            {subtitle}
          </Text>
        </Skeleton>
      </Flex>
    </Flex>
  )
}

Component.displayName = NAME
