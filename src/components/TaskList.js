import { useState } from 'react';
import { Icon } from '@iconify/react';
import roundChevronRight from '@iconify/icons-ic/round-chevron-right';
import Button from './Button'
import { UseTodosContext } from '../context'

const Subtask = ({ detail }) => {
  const { isLoading, updateTaskStatus } = UseTodosContext()

  const isChecked = detail.status === 'active'

  const handleClickCheckboxTask = (e, id) => {
    const { checked } = e.target
    updateTaskStatus({ id, status: !checked ? 'inactive' : 'active' })
  }

  return (
    <>
      <div className="subtask ">
        <div className="task-title">
          <label className="container-checkbox">
            <input disabled={isLoading} type="checkbox" checked={isChecked ? 'checked' : ''} onChange={e => handleClickCheckboxTask(e, detail.id)} />
            <span className="checkmark"></span>
          </label>
          <span> {detail.title} </span>
        </div>
      </div>
    </>
  )
}

const Task = ({ detail = [] }) => {
  const { isLoading, createSubtask, updateTaskStatus } = UseTodosContext()

  const [open, setOpen] = useState(true)
  const [title, setTitle] = useState('')

  const handleChangeText = (event) => {
    setTitle(event.target.value)
  }

  const handleClickCheckboxTask = (e, id) => {
    const { checked } = e.target
    updateTaskStatus({ id, status: !checked ? 'inactive' : 'active' })
  }

  const handleClickCreateSubtask = (e, { parent_id, title }) => {
    createSubtask({ parent_id, title, callback: () => setTitle('') })
  }

  const isChecked = detail.status === 'active'
  const total = detail.sub_tasks?.length || 0
  const totalActive = detail.sub_tasks?.filter(o => o.status === 'active')?.length || 0

  return (
    <>
      <div className="task" onClick={e => setOpen(!open)}>
        <div className="task-title">
          <label className="container-checkbox">
            <input type="checkbox" checked={isChecked ? 'checked' : ''} disabled={isLoading} onChange={e => handleClickCheckboxTask(e, detail.id)} />
            <span className="checkmark"></span>
          </label>
          <span> {detail.title} </span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: 12 }}> {totalActive} of {total} completed</span>
          <span> <Icon icon={roundChevronRight} rotate={open ? 1 : 3} /> </span>
        </div>
      </div>

      {
        open && <div>
          {detail.sub_tasks?.length > 0 && detail.sub_tasks.map(subtask => <Subtask key={subtask.id} detail={subtask} />)}
          <div style={{
            padding: '16px',
            border: '1px solid black',
            width: 300,
            margin: '0 auto',
          }}>
            <input placeholder="What are the step ?" disabled={isLoading} className="mr-4" type="text"
              style={{ width: 200, border: 0 }}
              value={title} onChange={handleChangeText} />
            <Button name="New Step" onClick={e => handleClickCreateSubtask(e, { parent_id: detail.id, title })} disabled={!title || isLoading} />
          </div>
        </div>
      }

    </>
  )
}

const TaksList = ({ data = [], }) => {
  return data.length > 0 && data.map(detail => (
    <Task detail={detail} key={detail.id} />
  ))
}

export default TaksList;
