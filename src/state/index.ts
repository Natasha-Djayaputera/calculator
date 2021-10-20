import { numberDisplay } from "../components/CalculatorDisplay"
import { isOpStr, NumStr, OpStr } from "../types"

export interface AppState {
    expression: string
    result: number | null
    onEvaluated: boolean
}

export interface AppAddNumberAction {
    type: 'ADD_NUMBER'
    payload: NumStr
}

export interface AppAddOperatorAction {
    type: 'ADD_OPERATOR'
    payload: OpStr
}

export interface AppBackspaceAction {
    type: 'BACKSPACE'
    payload?: never
}

export interface AppResetAction {
    type: 'RESET'
    payload?: never
}

export interface AppEnterAction {
    type: 'ENTER'
    payload?: never
}

export type AppAction =
    | AppAddNumberAction
    | AppAddOperatorAction
    | AppBackspaceAction 
    | AppResetAction
    | AppEnterAction

export const reducer = (
    state: AppState, 
    action : AppAction,
    ): AppState => {
        let expression = state.expression
        let onEvaluated
        switch (action.type) {
        case 'ADD_NUMBER':
            expression = (state.onEvaluated ? '' : expression) + action.payload
            onEvaluated = false
            break
        case 'ADD_OPERATOR':
            // if (state.result !== null) {
            // expression = String(state.result) + action.payload
            // break
            // }
            switch (action.payload) {
            case '+':
            case '-':
                if (expression[expression.length - 1] !== action.payload)
                {expression += action.payload}
                break
            case '*':
            case '/':
            default:
                if (isOpStr(expression[expression.length - 1])) {
                expression = expression.replace(/[-+*/]*$/g, '') + action.payload
                // expression: expression.replace(new RegExp('[-+*/]*$', 'g'), '') + action.payload,
                } else {
                expression += action.payload
                }
                break
            }
            onEvaluated = false
            break
        case 'BACKSPACE':
            expression = expression.slice(0, expression.length - 1)
            onEvaluated = false
            break
        case 'RESET':
            expression = ''
            onEvaluated = false
            break
        case 'ENTER':
            expression = String(numberDisplay(state.result!, 5))
            onEvaluated = true
            break
        }

        let result: number | null

        try {
        result = expression === '' ? null : Number(eval(expression.replace(/[-+*/]*$/g, '')))
        } catch {
        result = NaN
        }
    return { result, expression, onEvaluated }
}
