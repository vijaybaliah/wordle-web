
export type BoxStateType = {
  [key: string]: string
}


export type BoxDefaultProps = {
  wordLength: number
}

export type BoxProps = {
  onChange: (value: string) => void;
  disabled?: boolean;
  validation: BoxValidation
  reset: number
} & BoxDefaultProps


export type ValidationColorType = 'green' | 'orange' | 'gray'
export type BoxValidation = ValidationColorType[]