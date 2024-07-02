import { Component, ErrorInfo, ReactNode } from 'react'

interface State {
  hasError: boolean
}

export interface Props {
  children: ReactNode
  fallback: ReactNode
}

/**
 * Пример использования:
 * <ErrorBoundary fallback={<h1>Что-то пошло не так.</h1>}>
 *   <MyComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_: Error): State {
    // Обновить состояние, чтобы следующий рендер показал запасной UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Вы можете логировать ошибку с помощью браузерного API, если требуется
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Рендерим запасной UI
      return this.props.fallback
    }

    return this.props.children
  }
}

export default ErrorBoundary
