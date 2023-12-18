import React, { useState, useEffect } from 'react'
import UPStringTextField from './UPStringTextField'
import UPDateTextField from './UPDateTextField'
import './userProfileForm.scss'
import IUser from '../../interfaces/IUser'
import axios from '../../api/axios'
import useInterceptorAxios from '../../hooks/useInterceptorAxios'

interface Props {
    user: IUser
}

const UserProfileForm: React.FC<Props> = ({ user }) => {
    console.log(user)
    const interceptorAxios = useInterceptorAxios()

    const [success, setSuccess] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const [isFormModified, setIsFormModified] = useState<boolean>(false)

    const [userId, setUserId] = useState<string>(user._id)
    const [username, setUsername] = useState<string>(user.username)
    const [isUsernameDisabled, setIsUsernameDisabled] = useState<boolean>(true)

    const [firstname, setFirstname] = useState<string>(
        user.firstname ? user.firstname : '',
    )
    const [isFirstnameDisabled, setIsFirstnameDisabled] =
        useState<boolean>(true)

    const [lastname, setLastname] = useState<string>(
        user.lastname ? user.lastname : '',
    )
    const [isLastnameDisabled, setIsLastnameDisabled] = useState<boolean>(true)

    const [gender, setGender] = useState<string>(user.gender ? user.gender : '')
    const [isGenderDisabled, setIsGenderDisabled] = useState<boolean>(true)

    const [email, setEmail] = useState<string>(user.email)
    const [isEmailDisabled, setIsEmailDisabled] = useState<boolean>(true)

    const [date, setDate] = useState('')
    const [isDateDisabled, setIsDateDisabled] = useState<boolean>(true)

    useEffect(() => {
        setUserId(user._id)
        setUsername(user.username)
        setFirstname(user.firstname ? user.firstname : '')
        setLastname(user.lastname ? user.lastname : '')
        setGender(user.gender ? user.gender : '')
        setEmail(user.email)
    }, [user])

    const profileFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setErrorMessage('')
        setSuccess(false)

        try {
            const response = await interceptorAxios.patch(
                `/users/${userId}`,
                JSON.stringify({
                    username,
                    firstname,
                    lastname,
                    gender,
                    email,
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                },
            )
            console.log(response.data)
            setSuccess(true)
        } catch (error: any) {
            console.error(error)
            if (!error?.response) {
                setErrorMessage('No Server Response')
            } else if (error.response.status === 500) {
                setErrorMessage('Some value(s) are not correct!')
            } else {
                setErrorMessage('Somthing went wrong. Try again later')
            }
        }
    }

    return (
        <div className="profile-form__container">
            {success ? (
                <div className="message-box success">
                    <p>User profile has been updated</p>
                </div>
            ) : null}

            {errorMessage ? (
                <div className="message-box error">
                    <p>{errorMessage}</p>
                </div>
            ) : null}

            <form onSubmit={profileFormSubmit}>
                <div className="profile-form__wrapper">
                    <div className="profile-form__layout">
                        <UPStringTextField
                            id={'username'}
                            label={'Username'}
                            setValue={setUsername}
                            value={username}
                            isDisabled={isUsernameDisabled}
                            setIsDisabled={setIsUsernameDisabled}
                            setIsFormModified={setIsFormModified}
                        />
                    </div>
                    <div className="profile-form__layout">
                        <div className="profile-form__layout-split50-50">
                            <UPStringTextField
                                id="firstname"
                                label="Firstname"
                                setValue={setFirstname}
                                value={firstname}
                                isDisabled={isFirstnameDisabled}
                                setIsDisabled={setIsFirstnameDisabled}
                                setIsFormModified={setIsFormModified}
                            />
                        </div>

                        <div className="profile-form__layout-split50-50">
                            <UPStringTextField
                                id="lastname"
                                label="Lastname"
                                setValue={setLastname}
                                value={lastname}
                                isDisabled={isLastnameDisabled}
                                setIsDisabled={setIsLastnameDisabled}
                                setIsFormModified={setIsFormModified}
                            />
                        </div>
                    </div>

                    <div className="profile-form__layout">
                        <div className="profile-form__layout-split75">
                            <UPDateTextField
                                id={'date'}
                                label={'Date'}
                                setValue={setDate}
                                value={date}
                                isDisabled={isDateDisabled}
                                setIsDisabled={setIsDateDisabled}
                                setIsFormModified={setIsFormModified}
                            />
                        </div>

                        <div className="profile-form__layout-split25">
                            <UPStringTextField
                                id="gender"
                                label="Gender"
                                setValue={setGender}
                                value={gender}
                                isDisabled={isGenderDisabled}
                                setIsDisabled={setIsGenderDisabled}
                                setIsFormModified={setIsFormModified}
                            />
                        </div>
                    </div>

                    <div className="profile-form__layout">
                        <UPStringTextField
                            id="email"
                            label="Email"
                            setValue={setEmail}
                            value={email}
                            isDisabled={isEmailDisabled}
                            setIsDisabled={setIsEmailDisabled}
                            setIsFormModified={setIsFormModified}
                        />
                    </div>
                </div>

                <div className="profile-form__layout button-margin">
                    <button
                        disabled={
                            isFormModified
                                ? !username || !email
                                    ? true
                                    : false
                                : false
                        }
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UserProfileForm
