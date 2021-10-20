import React from 'react'

export type ButtonRole = 
    | 'control' 
    | 'operator' 
    | 'number' 
    | 'equals' 
    | 'special'
export type ButtonArea = 
    | 'ac' 
    | 'bksp' 
    | 'div' 
    | 'mul' 
    | `n${0|1|2|3|4|5|6|7|8|9}` 
    | 'min' 
    | 'add' 
    | 'eq' 
    | 'dot' 
    | 'e' 
    | 'mu' 
    | 'sin' 
    | 'deg'
export type ButtonBorder = 
    | 'border' 
    | 'shadow-and-border' 
    | ''

export interface ButtonProps extends Pick<React.ComponentProps<'button'>, 'className' | 'onClick'> {
    role: ButtonRole
    area: ButtonArea
    shadow: ButtonBorder
}

const Button: React.FC<ButtonProps> = ({className, role, area, shadow,... props}) => {
    const cn = `button-${role} button-${area} ${shadow} ${className ?? ``}`

    return (
        <button {...props} className={cn}>
            {props.children}
        </button>
    )
}

export default Button;