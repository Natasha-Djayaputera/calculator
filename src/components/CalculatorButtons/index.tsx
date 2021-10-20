import React from 'react'
import { useEventListener } from '../../hooks/useEventListener'
import { isNumStr, isOpStr, NumStr, OpStr } from '../../types'
import Button from '../Button'

export interface ButtonsProps {
    onReset: () => void
    onBackspace: () => void
    onAddOperator: (op: OpStr) => void
    onAddNumber: (num: NumStr) => void
    onEnter: () => void
}

const CalculatorButtons: React.VFC<ButtonsProps> = ({
    onReset,
    onBackspace,
    onAddOperator,
    onAddNumber,
    onEnter,
}) => {
    useEventListener(
        document.body, 
        'keyup',
        (e: KeyboardEvent) => {
          if (isNumStr(e.key)) { onAddNumber(e.key) } 
          else if (isOpStr(e.key)) { onAddOperator(e.key) } 
          else if (e.key === 'Backspace') { onBackspace() }
          else if (e.key === 'Escape') { onReset() }
          else if (e.key === 'Enter') { onEnter()}
        }
      )

    return (
        <main className="buttons"> 
            <Button role="special"  area="e"    shadow="border"            >{'e'}</Button>
            <Button role="special"  area="mu"   shadow="border"            >{'μ'}</Button>
            <Button role="special"  area="sin"  shadow="border"            >{'sin'}</Button>
            <Button role="special"  area="deg"  shadow="border"            >{'deg'}</Button>
            <Button role="control"  area="ac"   shadow="border"            onClick={onReset}>{'Ac'}</Button>
            <Button role="control"  area="bksp" shadow="border"            onClick={onBackspace}>{'←'}</Button>
            <Button role="operator" area="div"  shadow="shadow-and-border" onClick={() => onAddOperator('/')}>{'/'}</Button>
            <Button role="operator" area="mul"  shadow="shadow-and-border" onClick={() => onAddOperator('*')}>{'*'}</Button>
            <Button role="number"   area="n7"   shadow="border"            onClick={() => onAddNumber('7')}>{'7'}</Button>
            <Button role="number"   area="n8"   shadow="border"            onClick={() => onAddNumber('8')}>{'8'}</Button>
            <Button role="number"   area="n9"   shadow="border"            onClick={() => onAddNumber('9')}>{'9'}</Button>
            <Button role="operator" area="min"  shadow="shadow-and-border" onClick={() => onAddOperator('-')}>{'-'}</Button>
            <Button role="number"   area="n4"   shadow="border"            onClick={() => onAddNumber('4')}>{'4'}</Button>
            <Button role="number"   area="n5"   shadow="border"            onClick={() => onAddNumber('5')}>{'5'}</Button>
            <Button role="number"   area="n6"   shadow="border"            onClick={() => onAddNumber('6')}>{'6'}</Button>
            <Button role="operator" area="add"  shadow="shadow-and-border" onClick={() => onAddOperator('+')}>{'+'}</Button>
            <Button role="number"   area="n1"   shadow="border"            onClick={() => onAddNumber('1')}>{'1'}</Button>
            <Button role="number"   area="n2"   shadow="border"            onClick={() => onAddNumber('2')}>{'2'}</Button>
            <Button role="number"   area="n3"   shadow="border"            onClick={() => onAddNumber('3')}>{'3'}</Button>
            <Button role="number"   area="n0"   shadow="border"            onClick={() => onAddNumber('0')}>{'0'}</Button>
            <Button role="number"   area="dot"  shadow="border"            onClick={() => onAddNumber('.')}>{'.'}</Button>
            <Button role="equals"   area="eq"   shadow=""                  onClick={() => onEnter()}>{'='}</Button>
          </main>
    )
}

export default CalculatorButtons