/** @jsxImportSource theme-ui */
import React, {useLayoutEffect, useEffect, useState, useRef} from 'react'
import {Select, Box} from 'theme-ui'
import {CgMediaLive} from 'react-icons/cg'
import {useDates} from '../utils/hooks'
import {Button} from '../components/Buttons'
import {socket} from '../utils/io'
import {useBikesContext} from '../context/BikesContext'

function RePlay() {
  const {dates} = useDates('')
  const {
    bikes: {location},
    bikes,
    isReplaying,
    setIsReplaying,
  } = useBikesContext()

  const mounted = useRef(false)
  const [selectedDate, setSelectedDate] = useState('default')
  const [updating, setUpdating] = useState(false)

  function handleChange(e) {
    setSelectedDate(e.target.value)
  }

  function toggleReplay() {
    if (isReplaying) {
      setSelectedDate('default')
    }
    setIsReplaying(value => !value)
  }

  function onHandleSubmit(e) {
    e.preventDefault()
    toggleReplay()
  }

  useLayoutEffect(() => {
    if (isReplaying) {
      const date = dates[selectedDate]
      const index = selectedDate
      socket.emit('re play start', date, index)
    }
  }, [isReplaying])

  useEffect(() => {
    mounted.current = true
    if (location) {
      setUpdating(true)
      setTimeout(() => {
        if (mounted) {
          setUpdating(false)
        }
      }, 3000)
    }
  }, [bikes])

  return (
    <Box my={3}>
      <form onSubmit={onHandleSubmit}>
        <label>
          <p>Go back and re play!</p>
          <Select value={selectedDate} onChange={handleChange}>
            <option value={'default'} disabled>
              Select a previous date
            </option>
            {dates.map((date, index) => (
              <option key={date} value={index}>
                {date}
              </option>
            ))}
          </Select>
        </label>
        <Box mt={3} sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box mr={2}>Live</Box>
            <CgMediaLive sx={{color: isReplaying ? 'gray' : 'red'}} />
            {updating && !isReplaying && <Box ml={2}>Updating...</Box>}
            {updating && isReplaying && <Box ml={2}>Replaying...</Box>}
          </Box>

          <Button
            size="medium"
            type="submit"
            variant={selectedDate != 'default' ? 'primary' : 'disabled'}
            color="background"
            disabled={!(selectedDate != 'default')}
          >
            {isReplaying ? 'Stop Re Play' : 'Re Play'}
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default RePlay
