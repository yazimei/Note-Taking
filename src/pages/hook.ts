import { useEffect, useState } from "react";

export const useLocalStorage = (key: string, initValue: any) => {
    const [value, setValue] = useState(() => {
        if (localStorage.getItem(key)) {
            const localData:any = localStorage.getItem(key);
            return localData &&localData !== "" ? JSON.parse(localData) : localData
        } else {
            return initValue
        }
    })
    useEffect(() => {
        if (value) {
            localStorage.setItem(key, JSON.stringify(value))
        }
    }, [value, key])
    return [value, setValue]
}