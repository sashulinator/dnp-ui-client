export default function Square(props: React.SVGAttributes<SVGSVGElement>): JSX.Element {
  return (
    <svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path fill='currentColor' fillRule='evenodd' d='M1 1h13v13H1V1Zm1 1v11h11V2H2Z' clipRule='evenodd' />
    </svg>
  )
}
