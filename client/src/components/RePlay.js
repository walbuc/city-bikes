/** @jsxImportSource theme-ui */
import {useLayoutEffect, useState} from 'react'
import {Select, Box} from 'theme-ui'
import {useDates, useBikes} from '../utils/hooks'
import {Button} from '../components/Buttons'
import {socket} from '../utils/io'

function RePlay() {
  const {dates} = useDates('')
  const {
    bikes: {location},
    isReplaying,
    setIsReplying,
  } = useBikes()
  const [selectedDate, setSelectedDate] = useState()

  function handleChange(e) {
    setSelectedDate(e.target.value)
  }

  function toggleReplay() {
    setIsReplying(value => !value)
  }

  function onHandleSubmit(e) {
    e.preventDefault()
    toggleReplay()
  }

  useLayoutEffect(() => {
    if (isReplaying) {
      socket.emit('start replay', selectedDate)
    }
  }, [isReplaying])

  return (
    <Box my={3}>
      <form onSubmit={onHandleSubmit}>
        <label>
          <p>Go back and re play!</p>
          <Select
            defaultValue={'default'}
            value={selectedDate}
            onChange={handleChange}
          >
            <option value="default" disabled>
              Select a previous date
            </option>
            {dates.map(date => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </Select>
        </label>
        <Box mt={3} sx={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button
            size="medium"
            type="submit"
            variant={location ? 'primary' : 'disabled'}
            color="background"
            disabled={!location}
            // bg={location ? 'primary' : 'muted'}

            // color={location ? 'background' : 'text'}
            // sx={{
            //   ':hover': {
            //     cursor: location ? 'pointer' : 'none',
            //   },
            // }}
          >
            {isReplaying ? 'Stop Re Play' : 'Re Play'}
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default RePlay
