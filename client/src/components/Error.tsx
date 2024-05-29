import { PropsWithChildren } from "react"

const Error = ({ children }: PropsWithChildren) => {

  return (
    <p className="bg-red-800 text-white text-lg py-2 rounded-md font-bold text-center mb-2">{children}</p>
  )
}

export default Error