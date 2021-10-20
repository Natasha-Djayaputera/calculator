import React, { useMemo } from 'react'
import { isOpStr } from '../../types'

export interface CalculatorDisplayProps {
    expression: string
    result: number | null
    onEvaluated: boolean
}

export const numberDisplay = (n: number, precision: number) => (1 * Math.round(n * 10 ** precision) / 10 ** precision)

const CalculatorDisplay: React.VFC<CalculatorDisplayProps> = ({expression, result, onEvaluated}) => {

    const processedExpression = useMemo(
        () => expression.split(/([-+*/])/g),
        [expression],
    )

    return (
        <header>
            <p className={`text-expression ellipsis`}>
                <span dir="ltr">
                    {expression.length > 0 
                    ? (processedExpression.map(
                            (expressionPart)=> isOpStr(expressionPart[0]) 
                            ? <span className="text-expression-operator">{expressionPart}</span> 
                            : <>{expressionPart}</> ))
                    : <>&nbsp;</>}
                </span>
            </p>
            <div style={{position: 'relative'}}>
                <p className="text-result ellipsis">
                    <span dir="ltr">
                        {result === null ? <>&nbsp;</> : `=${numberDisplay(result, 5)}`}
                    </span>
                </p>
                <p className={`text-result ellipsis ${String(result) === expression && onEvaluated ? 'text-result-onenter' : ''}`} style={{ position: 'absolute', bottom: 0, top: -8, left: 0, right: 0}}>
                    <span dir="ltr">
                        {result === null ? <>&nbsp;</> : `${numberDisplay(result, 5)}`}
                    </span>
                </p>
            </div>
        </header>
    )
}

export default CalculatorDisplay;