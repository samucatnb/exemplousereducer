'use client'
import { useRouter } from "next/navigation"
import { useReducer } from "react"

type State = {
  count: number
}

type Action = | { type: 'increment' } | { type: 'decrement' } | { type: 'reset' }

const initializeState = { count: 0 }


function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'increment':
      console.log(state);
      console.log(action.type);
      return { count: state.count++ }
    case 'decrement':
      console.log(state);
      console.log(action.type);
      return { count: state.count-- }
    case 'reset':
      return { count: 0 }

  }
}

export default function Page() {
  const router = useRouter()
  //primeiro parametro desse hook , é o Reducer uma função responsavel por receber o valor do estado, e também a ação que você quer para o estado.
  //dispatch = é pra gente trocar a ação que queremos disparar.
  const [state, dispatch] = useReducer(reducer, initializeState)
  return (
    <div>
      <h1> Contatdor</h1>
      <div>
        <button onClick={() => dispatch({ type: "decrement" })}>-</button>
        <span>{state.count}</span>
        <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      </div>
        <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
        <button onClick={() => router.push('/task')}>Task</button>
    </div>
  )
}