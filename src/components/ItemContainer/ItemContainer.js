import React from 'react'

const ItemContainer = (props) => {
  // const [itemsState, setItemsState] = useState('Apple')

  return (
    <div>
      <h2>Items</h2>
      {props.fruit}
    </div>
  )
}

export default ItemContainer
