'use client'
import { useRouter } from "next/navigation"
import { useReducer, useState } from "react"

type Task = {
  id: number
  text: string
}

const initialState: Task[] = []

type Action = | { type: "add"; text: string } | { type: 'remove'; id: number } | { type: 'reset' }

function reducer(state: Task[], action: Action) {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        { id: Date.now(), text: action.text }
      ]
    case 'remove':
      return state.filter((task) => task.id !== action.id) //retorna os elementos da lista que for diferente do id que estou passando
    case 'reset':
      return []
  }
}

export default function Task() {
  const router = useRouter()
  const [input, setInput] = useState("")

  const [state, dispatch] = useReducer(reducer, initialState)

  const addTask = () => {
    dispatch({ type: 'add', text: input })
    setInput("")
  }

  return (
    <div>
      <h1>Tarefas</h1>
      <div>
        <input type="text" name="task" id="task" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={() => { addTask() }}>Adicionar Tarefas</button>
      </div>

      <button onClick={() => { router.back() }}>Voltar</button>
      <br></br>
      <div>
        <ul style={{ border: 'solid', borderColor: 'red' }}>
          {state.map((task) => (
            <li key={task.id}>
              <span>{task.text}</span>
              <button style={{ backgroundColor: 'yellowgreen' }} key={task.id} onClick={() => { dispatch({ type: 'remove', id: task.id }) }}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
          <button onClick={() => { dispatch({type: 'reset'}) }}>Reset</button>
    </div>

  )
}