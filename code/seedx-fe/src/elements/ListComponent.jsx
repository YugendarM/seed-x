import React from 'react'

const ListComponent = ({data, renderItem, className}) => {
  return (
    <div className={className}>
      {
        data?.map((item) => renderItem(item))
      }
    </div>
  )
}

export default ListComponent
