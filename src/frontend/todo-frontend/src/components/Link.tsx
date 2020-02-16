import React from 'react'

import { FilterLinkHandler } from '../containers/FilterLink'

interface OwnProps {
    active: boolean,
    children: string
}

type Props = OwnProps & FilterLinkHandler

const Link: React.FC<Props> = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>
  }
  return (
    <a
      href=""
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </a>
  )
}
// Link.propTypes = {
//   active: PropTypes.bool.isRequired,
//   children: PropTypes.node.isRequired,
//   onClick: PropTypes.func.isRequired
// }

export default Link