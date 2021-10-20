import React, { useReducer } from 'react';
import './App.css';
import Backdrop from './components/Backdrop';
import CalculatorButtons from './components/CalculatorButtons';
import CalculatorDisplay from './components/CalculatorDisplay';
import CalculatorWindow from './components/CalculatorWindow';
import { reducer } from './state';
import { NumStr, OpStr } from './types';

const App = () => {
  const [state, dispatch] = useReducer(reducer, { expression: '', result: null, onEvaluated: false, })

  return (
    <div className="app">
      <Backdrop/>
      <CalculatorWindow>
        <CalculatorDisplay {...state}/>
        <CalculatorButtons 
          onReset={() => dispatch({ type: 'RESET' })} 
          onBackspace={() => dispatch({ type: 'BACKSPACE' })} 
          onAddNumber={(num: NumStr) => dispatch({ type: 'ADD_NUMBER', payload: num })} 
          onAddOperator={ (op: OpStr) => dispatch({ type: 'ADD_OPERATOR', payload: op })}
          onEnter={() => dispatch({ type: 'ENTER' })}
        />
      </CalculatorWindow>
    </div>
  );
}

export default App;
