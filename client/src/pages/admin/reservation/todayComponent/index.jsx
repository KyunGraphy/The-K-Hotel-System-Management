/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useState } from 'react'

import TodayOccupied from './TodayOccupied'
import BasicAccordion from './AccordionComponent'
import useSetDefaultDate from '../../../../hooks/useSetDefaultDate'
import BackdropComponent from '../../../../components/backdrop/BackdropComponent'
import { RoomContext } from '../../../../contexts/RoomContext'
import useFetch from '../../../../hooks/useFetch'

const TodayComponent = () => {
  const [date, setDate] = useState(useSetDefaultDate(new Date()))

  const { hotelId } = useContext(RoomContext)

  const { data: activity, loading } = useFetch(
    (hotelId !== null) ?
      `/reservation/activity/${hotelId}/${useSetDefaultDate(new Date(date))}` :
      `/reservation/activity/${useSetDefaultDate(new Date(date))}`
  )

  return (
    <React.Fragment>
      {loading && <BackdropComponent />}
      <TodayOccupied activity={activity} />
      <BasicAccordion setDate={setDate} activity={activity} />
    </React.Fragment>
  )
}

export default TodayComponent