import './ui.nav.scss'

import { ScrollArea, Separator } from '@radix-ui/themes'

import { useMemo } from 'react'

import { routes } from '~/app/route'
import { storyList } from '~/pages/storybook/story-list'
import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Link from '~/shared/link'
import LinkTree, { type TreeItem } from '~/shared/link-tree'
import Logo from '~/shared/logo-icon'
import Text from '~/shared/text'
import { c, group } from '~/utils/core'

const NAME = 'dnp-nav-Nav'

/**
 * dnp-nav-Nav
 */
export default function Component(): JSX.Element {
  const routesTree = useMemo(toTreeItem, [])

  return (
    <nav className={c(NAME)}>
      <Flex className='container' direction='column' align='center' gap='2' pt='8px'>
        <Flex width='100%' pl='1' pr='1'>
          <Button
            variant='outline'
            size='2'
            asChild
            style={{ width: '100%', justifyContent: 'flex-start', boxShadow: 'none' }}
          >
            <Link to={routes.main.getUrl()}>
              <Button variant='outline' size='2' square={true} asChild>
                <span>
                  <Logo height='1rem' width='2rem' />
                </span>
              </Button>
              <Text style={{ marginLeft: '8px' }}>НСИ</Text>
            </Link>
          </Button>
        </Flex>
        <Separator />
        <ScrollArea>
          <Flex direction='column' width='100%' align='center' gap='2'>
            <Flex p='1' width='100%'>
              <LinkTree expanded={{}} offset={0} tree={routesTree} />
            </Flex>
          </Flex>
        </ScrollArea>
      </Flex>
    </nav>
  )

  /**
   * private
   */
  function toTreeItem(): TreeItem[] {
    const groupedStory = group(storyList, (story) => {
      return story.getName().split('-').slice(0, 2).join('-')
    })
    return Object.entries(groupedStory).map(([key, stories]) => {
      const [, slice] = key.split('-')

      return {
        id: key,
        name: slice,
        renderIcon: () => <>·</>,
        children: stories.map((story) => ({
          id: story.getName(),
          name: story.getName().replace(`${key}-`, ''),
          link: { url: `/storybook/${story.getName()}` },
          children: [],
        })),
      }
    })
  }
}

Component.displayName = NAME
