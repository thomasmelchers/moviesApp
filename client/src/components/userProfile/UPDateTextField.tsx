import React, { useState, useEffect } from 'react'
import { TextField } from '@mui/material'
import CreateRoundedIcon from '@mui/icons-material/CreateRounded'
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined'
import './UPStringTextField.scss'

interface Props {
    id: string
    label: string
    setValue: React.Dispatch<React.SetStateAction<any>>
    value: any
    isDisabled: boolean
    setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>
    setIsFormModified: React.Dispatch<React.SetStateAction<boolean>>
}

const UPDateTextField: React.FC<Props> = ({
    id,
    label,
    setValue,
    value,
    isDisabled,
    setIsDisabled,
    setIsFormModified,
}) => {
    const [isFieldValid, setIsFieldValid] = useState<boolean>(true)

    const deleteValueInput = () => {
        setIsDisabled(false)
        setIsFormModified(true)
        setValue('')
        console.log(value)
    }

    useEffect(() => {
        const isValueValid = () => {
            return value.length > 0 ? true : false
        }

        setIsFieldValid(isValueValid())
    }, [value])

    const displayButton = isDisabled ? (
        <CreateRoundedIcon
            onClick={() => {
                setIsFormModified(true)
                setIsDisabled(false)
            }}
            className={`actionButtons modifiedButton`}
        />
    ) : (
        <DoneOutlinedIcon
            onClick={() => setIsDisabled(true)}
            className={
                isFieldValid ? 'actionButtons validationButton' : 'invalid'
            }
        />
    )

    return (
        <TextField
            type="date"
            id={id}
            label={label}
            variant="filled"
            size="small"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            required
            autoComplete="off"
            fullWidth
            InputLabelProps={{ shrink: true }}
            InputProps={{
                endAdornment: (
                    <>
                        {displayButton},
                        <BackspaceRoundedIcon
                            onClick={deleteValueInput}
                            className="actionButtons clearButton"
                        />
                    </>
                ),
            }}
            {...(isDisabled ? { disabled: true } : { disabled: false })}
        />
    )
}

export default UPDateTextField
