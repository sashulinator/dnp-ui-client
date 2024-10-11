import { BaseError } from '~/utils/error'

export interface UiErrorable {
  message: string
  description: string
}

export class UiError<P extends Record<string, unknown> = Record<string, unknown>>
  extends BaseError<P>
  implements UiErrorable
{
  public readonly description: string

  constructor(message: string, props: { description: string } & P) {
    super(message, props)

    this.description = props.description

    if (props) {
      Object.assign(this, props)
    }
  }
}
