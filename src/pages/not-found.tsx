import Flex from '~/shared/flex'
import Text from '~/shared/text'

export default function NotFound(): JSX.Element {
  return (
    <Flex width='100%' height='100%' align='center' justify='center' direction='column'>
      <Text size='8'>404</Text>
      <Text>Страница не найдена</Text>
    </Flex>
  )
}

NotFound.dispayName = 'NotFound'
