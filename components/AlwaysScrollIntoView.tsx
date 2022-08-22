import { useEffect, useRef } from 'react'

/**
 * Scroll to this component when DOM updates, similar to
 * React Native's Flatlist inverted prop.
 *
 * @returns HTMLDivElement
 */
const AlwaysScrollIntoView = () => {
  const elementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => elementRef?.current?.scrollIntoView())

  return <div ref={elementRef} className="-mt-6" />
}

export default AlwaysScrollIntoView
