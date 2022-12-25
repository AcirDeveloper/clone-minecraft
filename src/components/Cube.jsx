import { useBox } from '@react-three/cannon'
import { useState } from 'react'
import { useStore } from '../hooks/useStore.js'
// importamos todas las texturas
import * as textures from '../images/textures.js'

export const Cube = ({ id, position, texture }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [removeCube] = useStore((state) => [state.removeCube])
    const [ref] = useBox(() => ({ type: 'Static', position }))
    const activeTexture = textures[texture + 'Texture']

    return (
        <mesh
            onPointerMove={(e) => {
                e.stopPropagation()
                setIsHovered(true)
            }}
            onPointerOut={(e) => {
                e.stopPropagation()
                setIsHovered(false)
            }}
            onClick={(e) => {
                e.stopPropagation()
                if (e.altKey) {
                    removeCube(id)
                }
            }}
            ref={ref}
        >
            <boxBufferGeometry attach='geometry' />
            <meshStandardMaterial
                attach='material'
                map={activeTexture}
                color={isHovered ? 'grey' : 'white'}
                transparent
            />
        </mesh>
    )
}
