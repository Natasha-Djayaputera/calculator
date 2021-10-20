import { DependencyList, useEffect } from "react"

export const useEventListener = <
    TEventType extends keyof HTMLElementEventMap
>(
    element: HTMLElement, 
    eventType: TEventType, 
    callback: (e: HTMLElementEventMap[TEventType])=> void,
    deps: DependencyList = [],
): void => {
    useEffect(() => {
        element.addEventListener (eventType, callback)
    
        return () => element.removeEventListener(eventType, callback)
    }, deps)
}