import React, { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './boxinput.module.css'
import type { BoxDefaultProps, BoxProps, BoxStateType } from './box.types';


const cx = classNames.bind(styles);

const BOX_ENUM = 'box'


const defaultProps: BoxDefaultProps = {
  wordLength: 7
}

const generateOtpInitialState = (wordLength: number): BoxStateType => {
  let result: BoxStateType = {}
  for (let i = 0; i < wordLength; i++) {
    result[`${BOX_ENUM}${i}`] = ''
  }
  return result
}
const BoxInput = ({
  onChange,
  wordLength,
  disabled,
  validation,
  reset,
}: BoxProps) => {
  const initialBoxState = generateOtpInitialState(wordLength);

  const [boxesValue, setBoxesValue] = useState<BoxStateType>(initialBoxState)
  const targetValue = useMemo(() => {
    return Object.keys(boxesValue).reduce((res, boxValue) => {
      return `${res}${boxesValue[boxValue]}`
    }, '')
  }, [boxesValue])

  useEffect(() => {
    setBoxesValue(initialBoxState)
  }, [reset])

  useEffect(() => {
    onChange(targetValue);
  }, [targetValue])

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const name = event.target.getAttribute('name')
    const value = event.target.value.trim()
    if (value.search(/[^a-zA-Z]+/) === -1) {
      setBoxesValue((box) => ({ ...box, [`${name}`]: value }))
    } else {
      alert('Enter only characters')
    }
  }

  const inputfocus = (element: any) => {
    if (element.key === "Delete" || element.key === "Backspace") {
      const next = element.target.tabIndex - 2;
      if (next > -1) {

        element.target.form.elements[next].focus()
      }
    }
    else {

      const next = element.target.tabIndex;
      if (next < wordLength && element.target.value !== '') {
        element.target.form.elements[next].focus()
      }
    }

  }

  return (

    <form>
      {
        Array(wordLength).fill(0).map((_a, index) => {
          const color = Array.isArray(validation) ? validation[index] : '';
          return (
            <input
              key={`${BOX_ENUM}${index}`}
              name={`${BOX_ENUM}${index}`}
              type="text"
              autoComplete="off"
              className={cx('box', color)}
              value={boxesValue[`${BOX_ENUM}${index}`]}
              onChange={handleChange}
              tabIndex={index + 1}
              maxLength={1}
              onKeyUp={inputfocus}
              disabled={disabled}
            />
          )
        })
      }
    </form>

  )
}


BoxInput.defaultProps = defaultProps

export default BoxInput;