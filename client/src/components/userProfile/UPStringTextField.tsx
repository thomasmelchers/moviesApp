import React, { useState, useEffect } from 'react'
import { TextField } from '@mui/material'
import CreateRoundedIcon from '@mui/icons-material/CreateRounded'
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined'
import './UPStringTextField.scss'

interface Props {
    id: string
    label: string
    setValue: React.Dispatch<React.SetStateAction<string>>
    value: string
    isDisabled: boolean
    setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>
    setIsFormModified: React.Dispatch<React.SetStateAction<boolean>>
}

const UPStringTextField: React.FC<Props> = ({
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
            if (id === 'email') {
                return value.includes('@' && '.') ? true : false
            }

            if (id === 'gender') {
                return value === 'M' || value === 'F' || value === 'X'
                    ? true
                    : false
            }
            return value.length > 0 ? true : false
        }

        setIsFieldValid(isValueValid())
    }, [value, id])

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
            type="text"
            id={id}
            label={label}
            variant="filled"
            size="small"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            required
            autoComplete="off"
            fullWidth
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

export default UPStringTextField
