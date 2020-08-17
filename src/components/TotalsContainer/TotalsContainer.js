import React from 'react'

const TotalsContainer = (props) => {
  const totals= props.totals;
  return (
    <div>
      {totals[0].name}: {totals[0].value}
      <br/>
      {totals[1].name}: {totals[1].value}
      <br/>
      {totals[2].name}: {totals[2].value}
    </div>
  )
}

export default TotalsContainer
