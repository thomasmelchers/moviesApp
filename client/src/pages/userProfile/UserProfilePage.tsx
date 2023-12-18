import React, { useState, useEffect, useRef } from 'react'
import { Grid } from '@mui/material'
import './userProfilePage.scss'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import useInterceptorAxios from '../../hooks/useInterceptorAxios'
import IUser from '../../interfaces/IUser'
import UserProfileForm from '../../components/userProfile/UserProfileForm'

const UserProfilePage = () => {
    const { id } = useParams()
    const interceptorAxios = useInterceptorAxios()
    const navigate = useNavigate()
    const location = useLocation()

    const effectRan = useRef(true)

    const [user, setUser] = useState<IUser>({
        roles: { User: 1000 },
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        gender: '',
        refreshToken: '',
        _id: '',
    })

    useEffect(() => {
        const controller = new AbortController()

        const getUsers = async () => {
            try {
                const response = await interceptorAxios.get(`/users/${id}`, {
                    signal: controller.signal,
                })
                setUser(response.data.result)
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Request canceled due to component unmounting')
                } else {
                    console.error(err)
                    navigate('/login', {
                        state: { from: location },
                        replace: true,
                    })
                }
            }
        }

        getUsers()

        // clean up function
        return () => {
            effectRan.current = false
            controller.abort()
        }
    }, [])

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
                <h1>Profile of {user.username} </h1>
                <div className="profile__wrapper">
                    {/* <div className="profile-form__container">
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
                    </div> */}
                    <UserProfileForm user={user} />
                    <div className="image__container">image</div>
                </div>
            </section>
        </Grid>
    )
}

export default UserProfilePage
