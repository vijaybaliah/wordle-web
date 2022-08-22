import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { getWordOfTheDay, removeCharAtIndex } from '../utils/helper'
import WordleMain from '../modules/main/WordleMain'
import type { BoxValidation, ValidationColorType } from '../modules/uikit/box.types'
// import { wordListData } from '../utils/constants'

// const lowerCasedWordListData = wordListData.map(wl => wl.toLowerCase())
const RANGE = 7;
const Home: NextPage = () => {
  const [ value, setValue ] = useState('')
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [word, setWord] = useState('')
  const [reset, setReset] = useState(0)
  useEffect(() => {
    if (currentIndex === 0) {
      getNewWord();
    }
  }, [currentIndex])

  const [ validationArray, setValidationArray ] = useState<BoxValidation[]>([])

  const getNewWord = () => {
    const currentWord = getWordOfTheDay()
    setWord(currentWord)
  }
  const handleCurrentWordChange = (value: string) => {
    setValue(value)
  }

  const checkCorrectWord = (validations: BoxValidation) => {
    const isWin = validations.every(validation => validation === 'green')
    if (isWin) {
      alert('You have won!!!');
      setCurrentIndex(RANGE + 1);
    }
  }

  const handleReset = () => {
    setValue('')
    setCurrentIndex(0)
    setReset(resetNo => resetNo + 1)
  }

  const handleValidate = () => {
    if (RANGE === value.length) {
      setCurrentIndex(index => index + 1);
      let tempWord = word;
      const tempValidationArray: BoxValidation = value.split('').map((letter, index) => {
        const wordIndex = tempWord.indexOf(letter);
        let result: ValidationColorType = 'gray'
        if (letter === word[index]) {
          result = 'green'
        } else if (wordIndex > -1 && wordIndex !== index) {
          result = 'orange'
        }
        tempWord = removeCharAtIndex(wordIndex, tempWord)
        return result
      })
      setValidationArray(arr=> ([...arr, tempValidationArray]))
      checkCorrectWord(tempValidationArray)
    } else {
      alert('Enter full value')
    }
    setValue('')
  }

  return (
    <div className={styles.container}>
      <p>
        NWORDLE
      </p>
      {
        Array(RANGE).fill(0).map((_a, index) => {
          const isDisabled = currentIndex !== index;
          const validation = validationArray[index]
          return (
            <WordleMain
              key={`${word}${index}`}
              handleCurrentWordChange={handleCurrentWordChange}
              disabled={isDisabled}
              validation={validation}
              range={RANGE}
              reset={reset}
            />
          )
        })
      }
      <div className={styles.validate}>
        <button onClick={handleValidate}  disabled={currentIndex >= RANGE}>
          validate
        </button>
        <button className={styles.reset} onClick={handleReset}>
          reset
        </button>
      </div>
    </div>
  )
}

export default Home
