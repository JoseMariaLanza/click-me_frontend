import { useState, useEffect } from "react"

const useClickList = (API_URL) => {
    const [clickHistory, setClickHistory] = useState([])
    const [initialValue, setInitialValue] = useState(0)

    useEffect(() => {
        fetch(API_URL)
            .then(response => response.json())
            .then(response => {
                setClickHistory(response.page)
                setInitialValue(response.initial_value)
            })
    }, [])
    return [clickHistory, initialValue]
}

export default useClickList