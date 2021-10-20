// import React, { useEffect, useReducer, useState } from 'react';
// import { TypeOfTag } from 'typescript';
// import './App.css';
// import Backdrop from './components/Backdrop';
// import Button from './components/Button';

// const NUM_STR = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'] as const
// const OP_STR = ['+', '-', '*', '/'] as const
// type NumStr = typeof NUM_STR[number]
// type Op = typeof OP_STR[number]
// const isNumStr = (test: string): boolean => (NUM_STR as Readonly<string[]>).includes(test)
// const isOpStr = (test: string): boolean => (OP_STR as Readonly<string[]>).includes(test)

// interface AppState {
//   expression: string
//   result: number | null
// }

// interface AppAddNumberAction {
//   type: 'ADD_NUMBER'
//   payload: NumStr
// }

// interface AppAddOperatorAction {
//   type: 'ADD_OPERATOR'
//   payload: Op
// }

// interface AppBackspaceAction {
//   type: 'BACKSPACE'
//   payload?: never
// }

// interface AppResetAction {
//   type: 'RESET'
//   payload?: never
// }

// type AppAction =
//   | AppAddNumberAction
//   | AppAddOperatorAction
//   | AppBackspaceAction
//   | AppResetAction

// const reducer = (
//   state: AppState, 
//   action : AppAction,
//   ): AppState => {
//     let expression = state.expression
//     switch (action.type) {
//       case 'ADD_NUMBER':
//         expression += action.payload
//         break
//       case 'ADD_OPERATOR':
//         if (state.result !== null) {
//           expression = String(state.result) + action.payload
//           break
//         }
//         switch (action.payload) {
//           case '+':
//           case '-':
//             if (expression[expression.length - 1] !== action.payload)
//               {expression += action.payload}
//               break
//           case '*':
//           case '/':
//           default:
//             if (isOpStr(expression[expression.length - 1])) {
//               expression = expression.replace(/[-+*/]*$/g, '') + action.payload
//             // expression: expression.replace(new RegExp('[-+*/]*$', 'g'), '') + action.payload,
//             } else {
//               expression += action.payload
//             }
//               break
//         }
//         break
//       case 'BACKSPACE':
//         expression = expression.slice(0, expression.length - 1)
//         break
//       case 'RESET':
//         expression = ''
//         break
//     }

//     let result: number | null

//     try {
//       result = expression === '' ? null : Number(eval(expression.replace(/[-+*/]*$/g, '')))
//     } catch {
//       result = NaN
//     }
//     return { result, expression }
//   }


// // const reducer = (state: AppState, action: AppAction): AppState => {
// //   switch (action.type) {
// //     case "ADD_NUMBER":
// //       return {
// //         expression: state.expression + action.payload,
// //         result: null,
// //       };
// //     case "ADD_OPERATOR":
// //       if (state.result !== null) {
// //         return {
// //           expression: String(state.result) + action.payload,
// //           result: null,
// //         };
// //       }
// //       switch (action.payload) {
// //         case "+":
// //         case "-":
// //           return state.expression[state.expression.length - 1] ===
// //             action.payload
// //             ? { expression: state.expression, result: null }
// //             : { expression: state.expression + action.payload, result: null };
// //         case "*":
// //         case "/":
// //         default:
// //           return ["+", "-", "*", "/"].includes(
// //             state.expression[state.expression.length - 1]
// //           )
// //             ? {
// //                 expression: state.expression + action.payload,
// //                 result: null,
// //               }
// //             : {
// //                 expression: state.expression + action.payload,
// //                 result: null,
// //               };
// //       }
// //     case "BACKSPACE":
// //       return {
// //         expression: state.expression.slice(0, state.expression.length - 1),
// //         result: null,
// //       };
// //     case "CALCULATE":
// //       try {
// //         return {
// //           expression: state.expression,
// //           result: Number(eval(state.expression.replace(/[-+*/]*$/g, ""))),
// //           // new RegExp("[-+*/]*$", "sig", )
// //         };
// //       } catch {
// //         return {
// //           expression: state.expression,
// //           result: NaN,
// //         };
// //       }

// //     case "RESET":
// //       return {
// //         expression: "",
// //         result: null,
// //       };
// //   }
// // };

// const App = () => {
//   // const [expression, setExpression] = useState('')
//   // const [result, setResult] = useState <number|null> (null)
//   const [state, dispatch] = useReducer(reducer, { expression: '', result: null })
//   const { expression, result } = state

//   // const reset = () => {
//   //   setExpression(() => '')
//   //   setResult(() => null)
//   // }
//   const reset = () => dispatch({ type: 'RESET' })

//   // const backspace = () => {
//   //   setExpression((expression) => expression.slice(0, expression.length - 1))
//   //   setResult(() => null)
//   // }
//   const backspace = () => dispatch({ type: 'BACKSPACE' })

//   // const calculate = () => {
//   //   let currentExpression = expression
//   //   const endsWithOperator = 
//   //     expression.length > 0 
//   //     && ['+', '-', '*', '/'].includes(expression[expression.length - 1])
//   //   if (endsWithOperator) {
//   //     currentExpression = currentExpression.slice(0, currentExpression.length - 1)
//   //   }
//   //   setResult(() => Number(eval(currentExpression)))
//   // }

//   // const addNumber = (additions: string) => () => {
//   //   setExpression((expression) => expression + additions)
//   //   setResult(() => null)
//   // }
//   const addNumber = (num: NumStr) => () => dispatch({ type: 'ADD_NUMBER', payload: num })

//   // const addOperator = (op: Op) => () => {
//   //   const endsWithOperator = 
//   //     expression.length > 0 
//   //     && ['+', '-', '*', '/'].includes(expression[expression.length - 1])
    
//   //     if (endsWithOperator) {
//   //       setExpression((expression) => expression.slice(0, expression.length - 1) + op)
//   //     } else {
//   //       setExpression((expression) => expression + op)
//   //     }
//   //     setResult(() => null)
//   // }
//   const addOperator = (op: Op) => () => dispatch({ type: 'ADD_OPERATOR', payload: op })

//   // useEffect(() => {
//   //   const keypressHandler = (e: KeyboardEvent) => {
//   //     if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(e.key)) {
//   //       addNumber(e.key as NumStr)()
//   //     } else if (['+', '-', '/', '*'].includes(e.key)) {
//   //       addOperator(e.key as Op)()
//   //     } else if (e.key === 'Backspace') {
//   //       backspace()
//   //     } else if (e.key === 'Enter') {
//   //       calculate()
//   //     } else if (e.key === 'Escape') {
//   //       reset()
//   //     }
//   //   }

//   //   document.body.addEventListener('keyup', keypressHandler)

//   //   return () => document.body.removeEventListener('keyup', keypressHandler)
//   // }, [calculate])


//   useEffect(() => {
//     const keypressHandler = (e: KeyboardEvent) => {
//       if (isNumStr(e.key)) {
//         addNumber(e.key as NumStr)()
//       } else if (isOpStr(e.key)) {
//         addOperator(e.key as Op)()
//       } else if (e.key === 'Backspace') {
//         backspace()
//       // } else if (e.key === 'Enter') {
//         // calculate()
//       } else if (e.key === 'Escape') {
//         reset()
//       }
//     }

//     document.body.addEventListener('keyup', keypressHandler)

//     return () => document.body.removeEventListener('keyup', keypressHandler)
//   }, [])

//   // useEffect(() => {
//   //   if(expression.length > 0) {
//   //     calculate()
//   //   }
//   // }, [expression])

//   const numberDisplay = (n: number, precision: number) => (1 * Math.round(n * 10 ** precision) / 10 ** precision)

//   return (
//     <div className="app">
//       <Backdrop/>
//       <div className="window">
//         <header>
//           <p className="text-expression ellipsis">
//             <span dir="ltr">
//               {expression.length > 0 ? expression : <>&nbsp;</>}
//             </span>
//           </p>
//           <p className="text-result ellipsis">
//             <span dir="ltr">
//               {result === null ? <>&nbsp;</> : `=${numberDisplay(result, 5)}`}
//             </span>
//           </p>
//         </header>
//         <div className="buttons"> 
//             <Button role="special"  area="e"    shadow="border"            >{'e'}</Button>
//             <Button role="special"  area="mu"   shadow="border"            >{'μ'}</Button>
//             <Button role="special"  area="sin"  shadow="border"            >{'sin'}</Button>
//             <Button role="special"  area="deg"  shadow="border"            >{'deg'}</Button>
//             <Button role="control"  area="ac"   shadow="border"            onClick={reset}>{'Ac'}</Button>
//             <Button role="control"  area="bksp" shadow="border"            onClick={backspace}>{'←'}</Button>
//             <Button role="operator" area="div"  shadow="shadow-and-border" onClick={addOperator('/')}>{'/'}</Button>
//             <Button role="operator" area="mul"  shadow="shadow-and-border" onClick={addOperator('*')}>{'*'}</Button>
//             <Button role="number"   area="n7"   shadow="border"            onClick={addNumber('7')}>{'7'}</Button>
//             <Button role="number"   area="n8"   shadow="border"            onClick={addNumber('8')}>{'8'}</Button>
//             <Button role="number"   area="n9"   shadow="border"            onClick={addNumber('9')}>{'9'}</Button>
//             <Button role="operator" area="min"  shadow="shadow-and-border" onClick={addOperator('-')}>{'-'}</Button>
//             <Button role="number"   area="n4"   shadow="border"            onClick={addNumber('4')}>{'4'}</Button>
//             <Button role="number"   area="n5"   shadow="border"            onClick={addNumber('5')}>{'5'}</Button>
//             <Button role="number"   area="n6"   shadow="border"            onClick={addNumber('6')}>{'6'}</Button>
//             <Button role="operator" area="add"  shadow="shadow-and-border" onClick={addOperator('+')}>{'+'}</Button>
//             <Button role="number"   area="n1"   shadow="border"            onClick={addNumber('1')}>{'1'}</Button>
//             <Button role="number"   area="n2"   shadow="border"            onClick={addNumber('2')}>{'2'}</Button>
//             <Button role="number"   area="n3"   shadow="border"            onClick={addNumber('3')}>{'3'}</Button>
//             <Button role="equals"   area="eq"   shadow=""                  >{'='}</Button>
//             <Button role="number"   area="n0"   shadow="border"            onClick={addNumber('0')}>{'0'}</Button>
//             <Button role="number"   area="dot"  shadow="border"            onClick={addNumber('.')}>{'.'}</Button>
//             {/* <button className="button-special button-e border">e</button>
//             <button className="button-special button-mu border">μ</button>
//             <button className="button-special button-sin border">sin</button>
//             <button className="button-special button-deg border">deg</button>
//             <button className="button-control button-ac border">Ac</button>
//             <button className="button-control button-bksp border">←</button>
//             <button className="button-operator button-div shadow-and-border">/</button>
//             <button className="button-operator button-mul shadow-and-border">*</button>
//             <button className="button-number button-n7 border">7</button>
//             <button className="button-number button-n8 border">8</button>
//             <button className="button-number button-n9 border">9</button>
//             <button className="button-operator button-min shadow-and-border">-</button>
//             <button className="button-number button-n4 border">4</button>
//             <button className="button-number button-n5 border">5</button>
//             <button className="button-number button-n6 border">6</button>
//             <button className="button-operator button-add shadow-and-border">+</button>
//             <button className="button-number button-n1 border">1</button>
//             <button className="button-number button-n2 border">2</button>
//             <button className="button-number button-n3 border">3</button>
//             <button className="button-equals button-eq border">=</button>
//             <button className="button-number button-n0 border">0</button>
//             <button className="button-number button-dot border">.</button> */}
//           </div>
//       </div>
//     </div>
//   );
// }

// export default App;

export {}