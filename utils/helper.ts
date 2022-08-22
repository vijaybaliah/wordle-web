import { wordListData } from './constants'

export const getWordOfTheDay = () => {
  const wordIndex = Math.floor(Math.random() * wordListData.length)
  return wordListData[wordIndex].toLowerCase()
}

export const removeCharAtIndex = (index: number, str: string) => {
  return str.substring(0, index) + str.substring(index + 1, str.length)
}
