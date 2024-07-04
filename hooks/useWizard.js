import { useEffect, useState } from 'react'

const useWizard = (initialStepNumber = 1, onChangeStep) => {
  const [currentStepNumber, setCurrentStepNumber] = useState(initialStepNumber)

  const goToStepNumber = (stepNumber) => {
    setCurrentStepNumber(stepNumber)
  }

  const goToNextStep = () => {
    setCurrentStepNumber((prevState) => prevState + 1)
  }

  const goToPreviousStep = () => {
    setCurrentStepNumber((prevState) => prevState - 1)
  }

  useEffect(() => {
    onChangeStep?.()
  }, [onChangeStep, currentStepNumber])

  return {
    currentStepNumber,
    goToNextStep,
    goToPreviousStep,
    goToStepNumber
  }
}

export default useWizard
