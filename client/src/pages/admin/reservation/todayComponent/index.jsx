import React, { useState } from 'react'
import TodayOccupied from './TodayOccupied'
import BasicAccordion from './AccordionComponent'
import useSetDefaultDate from '../../../../hooks/useSetDefaultDate'

const TodayComponent = () => {
  const [date, setDate] = useState(useSetDefaultDate(new Date()))
  console.log(useSetDefaultDate(new Date(date)))

  return (
    <React.Fragment>
      <TodayOccupied />
      <BasicAccordion setDate={setDate} />
    </React.Fragment>
  )
}

export default TodayComponent