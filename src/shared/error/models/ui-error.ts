import { BaseError } from '~/utils/error'

export interface UiErrorable {
  message: string
  description: string
  translated: string
}

export class UiError<P extends Record<string, unknown> = Record<string, unknown>>
  extends BaseError<P>
  implements UiErrorable
{
  public readonly description: string
  public readonly translated: string

  constructor(message: string, props: { description: string; translated: string } & P) {
    super(message, props)

    this.description = props.description
    this.translated = props.translated

    if (props) {
      Object.assign(this, props)
    }
  }
}
