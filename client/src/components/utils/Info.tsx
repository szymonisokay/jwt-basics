import React from "react"

type Props = {
  msg: string
  type: string
}

const Info: React.FC<Props> = ({ msg, type }) => {
  return <div className={`info-box ${type}`}>{msg}</div>
}

export default Info
