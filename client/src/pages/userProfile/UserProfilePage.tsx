import React, { useState } from 'react'
import { Grid } from '@mui/material'
import './userProfilePage.scss'
import UPStringTextField from '../../components/userProfile/UPStringTextField'
import UPDateTextField from '../../components/userProfile/UPDateTextField'

const UserProfilePage = () => {
    const [isFormModified, setIsFormModified] = useState<boolean>(false)

    const [username, setUsername] = useState<string>('user')
    const [isUsernameDisabled, setIsUsernameDisabled] = useState<boolean>(true)

    const [firstname, setFirstname] = useState<string>('user')
    const [isFirstnameDisabled, setIsFirstnameDisabled] =
        useState<boolean>(true)

    const [lastname, setLastname] = useState<string>('user')
    const [isLastnameDisabled, setIsLastnameDisabled] = useState<boolean>(true)

    const [gender, setGender] = useState<string>('M')
    const [isGenderDisabled, setIsGenderDisabled] = useState<boolean>(true)

    const [email, setEmail] = useState<string>('edfdfddf@fdff')
    const [isEmailDisabled, setIsEmailDisabled] = useState<boolean>(true)

    const [date, setDate] = useState('')
    const [isDateDisabled, setIsDateDisabled] = useState<boolean>(true)

    const profileFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            // const response
        } catch (error: any) {
            console.error(error.errorMessage)
        }
    }

    return (
        <Grid
            container
            flexDirection="column"
            item
            xs={12}
            md={10}
            lg={8}
            p={3}
            className="container__profile"
        >
            <section>
                <h1>Profile of </h1>
                <div className="profile__wrapper">
                    <div className="profile-form__container">
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
                                            setIsDisabled={
                                                setIsFirstnameDisabled
                                            }
                                            setIsFormModified={
                                                setIsFormModified
                                            }
                                        />
                                    </div>

                                    <div className="profile-form__layout-split50-50">
                                        <UPStringTextField
                                            id="lastname"
                                            label="Lastname"
                                            setValue={setLastname}
                                            value={lastname}
                                            isDisabled={isLastnameDisabled}
                                            setIsDisabled={
                                                setIsLastnameDisabled
                                            }
                                            setIsFormModified={
                                                setIsFormModified
                                            }
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
                                            setIsFormModified={
                                                setIsFormModified
                                            }
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
                                            setIsFormModified={
                                                setIsFormModified
                                            }
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
                                            ? !username ||
                                              !firstname ||
                                              !lastname ||
                                              !gender ||
                                              !email
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
                    <div className="image__container">image</div>
                </div>
            </section>
        </Grid>
    )
}

export default UserProfilePage
