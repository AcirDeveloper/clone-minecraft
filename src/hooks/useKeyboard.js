import { useEffect, useState } from 'react'

const ACTIONS_KEYBOARD_MAP = {
    KeyW: 'moveForward',
    KeyS: 'moveBackward',
    KeyA: 'moveLeft',
    KeyD: 'moveRight',
    Space: 'jump',
    KeyE: 'shoot',
    Digit1: 'dirt',
    Digit2: 'grass',
    Digit3: 'glass',
    Digit4: 'wood',
    Digit5: 'log',
}
export const useKeyboard = () => {
    const [actions, setActions] = useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
        shoot: false,
        dirt: false,
        grass: false,
        glass: false,
        wood: false,
        log: false,
    })

    useEffect(() => {
        const handleKeyEvent = (event) => {
            const { code } = event
            const action = ACTIONS_KEYBOARD_MAP[code]
            if (action) {
                setActions((prevActions) => ({
                    ...prevActions,
                    [action]: event.type === 'keydown',
                }))
            }
        }

        document.addEventListener('keydown', handleKeyEvent)
        document.addEventListener('keyup', handleKeyEvent)

        return () => {
            document.removeEventListener('keydown', handleKeyEvent)
            document.removeEventListener('keyup', handleKeyEvent)
        }
    }, [])
    return actions
}
