import { BoxValidation } from "../uikit/box.types";
import BoxInput from "../uikit/BoxInput"


type Props = {
  handleCurrentWordChange: (word: string) => void;
  disabled: boolean;
  validation: BoxValidation
  range: number;
  reset: number;
}
const WordleMain = ({
  handleCurrentWordChange,
  disabled,
  validation,
  range,
  reset
}: Props) => {
  const handleChange = (value: string) => {
    handleCurrentWordChange(value.toLowerCase());
  }

  return (
    <BoxInput
      onChange={handleChange}
      disabled={disabled}
      validation={validation}
      wordLength={range}
      reset={reset}
    />
  )
}

export default WordleMain