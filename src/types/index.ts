export const NUM_STR = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'] as const
export const OP_STR = ['+', '-', '*', '/'] as const
export type NumStr = typeof NUM_STR[number]
export type OpStr = typeof OP_STR[number]
export const isNumStr = (test: string): test is NumStr => (NUM_STR as Readonly<string[]>).includes(test)
export const isOpStr = (test: string): test is OpStr => (OP_STR as Readonly<string[]>).includes(test)