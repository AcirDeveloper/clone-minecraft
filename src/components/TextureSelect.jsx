import * as images from '../images/images.js'
import { useEffect, useState } from 'react'
import { useStore } from '../hooks/useStore.js'
import { useKeyboard } from '../hooks/useKeyboard.js'

export const TextureSelect = () => {
    const [visible, setVisible] = useState(true)
    const [texture, setTexture] = useStore((state) => [state.texture, state.setTexture])
    const { dirt, grass, glass, wood, log } = useKeyboard()

    useEffect(() => {
        const visibilityTimeOut = setTimeout(() => {
            setVisible(false)
        }, 1000)
        setVisible(true)
        return () => clearTimeout(visibilityTimeOut)
    }, [texture])

    useEffect(() => {
        const options = {
            dirt,
            grass,
            glass,
            wood,
            log,
        }
        const selectedTexture = Object.entries(options).find(([texture, isEnabled]) => isEnabled)

        if (selectedTexture) {
            const [textureName] = selectedTexture
            setTexture(textureName)
        }
        console.log(selectedTexture)
    }, [dirt, grass, glass, wood, log])

    //if (!visible) return null
    return (
        <div className='texture-selector'>
            {Object.entries(images).map(([imgKey, imgs]) => {
                return (
                    <img
                        className={texture === imgKey.replace('Img', '') ? 'selected' : ''}
                        key={imgKey}
                        src={imgs}
                        alt={imgKey}
                    />
                )
            })}
        </div>
    )
}
