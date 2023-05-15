import { useEffect, useState } from 'react'

const ACTIONS_KEYBOARD_MAP = {
    KeyW: 'moveForward',
    KeyS: 'moveBackward',
    KeyA: 'moveLeft',
    KeyD: 'moveRight',
    Space: 'jump',
    KeyE: 'shoot',
    Digit1: 'dirt',
    Digit2: 'glass',
    Digit3: 'grass',
    Digit4: 'log',
    Digit5: 'wood',
}
export const useKeyboard = () => {
    const [actions, setActions] = useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
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
