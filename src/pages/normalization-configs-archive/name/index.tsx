import Flex from '~/ui/flex'

export interface Props {
  className?: string | undefined
}

const displayName = 'page-NormalizationConfigs_name'

/**
 * page-Main
 */
export default function Component(): JSX.Element {
  return (
    <main className={displayName}>
      <Flex p='8'>NormalizationConfigs_name</Flex>
    </main>
  )
}

Component.displayName = displayName
