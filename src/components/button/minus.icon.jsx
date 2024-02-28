
const MinusIconButton = ({...rest}) => {
  return (
    <button {...rest}  >
      <svg className={`w-6 h-6 hover:cursor-pointer stroke-white`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    </button>
  )
}

export default MinusIconButton;