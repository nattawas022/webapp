'use client'

import { useState } from "react"

export default function Button() {

    const [count, setCount] = useState(0)

    function add() {
        setCount(count + 1)
    }
    function minus() {
        setCount(count - 1)
    }
    function reset() {
        setCount(0)
    }

    return (
        <div>
            <h2>Count: {count}</h2>
            <div >
                <button
                    onClick={add}
                    className="bg-blue-200 p-2 border mr-2"
                > +1 </button>
                <button
                    onClick={minus}
                    className="bg-orange-200 p-2 border mr-3"
                > -1 </button>
                <button
                    onClick={reset}
                    className="bg-red-100 p-2 border"
                > 0 </button>
            </div>

        </div>

    )
}