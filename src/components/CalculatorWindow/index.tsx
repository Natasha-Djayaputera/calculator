import React, { useState } from 'react'

export interface CalculatorWindowProps {}
export interface Point2D {
    x: number
    y: number
}

const CalculatorWindow: React.FC<CalculatorWindowProps> = ({
    children,
}) => {
    const [ { x, y }, setPosition] = useState<Point2D>({x: 0, y: 0})
    const [ isDragging, setIsDragging] = useState(false)

    return (
        <div 
            className="window" 
            style={{ 
                transform: `translateX(${x}px) translateY(${y}px)`, 
                cursor: `${isDragging ? `grabbing` : `grab` }`,
            }}
            onMouseDown={() => {setIsDragging(true)}}
            onMouseUp={() => {setIsDragging(false)}}
            onMouseMove={(e) => {
                if ( isDragging ){
                    setPosition({
                        x: x + (e.movementX),
                        y: y + (e.movementY),
                    })
                }
            }}
        >
            <button 
                className="window-controls"
                onClick={() => setPosition({ x: 0, y: 0})}
            >
                ↻
            </button>
            {children}
        </div>
    )
}
export default CalculatorWindow;