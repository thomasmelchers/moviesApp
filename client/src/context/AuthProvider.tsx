import { createContext, useState, ReactNode } from "react"
import { IAuth } from "./IAuth"

const initialAuthState = {
  username: "",
  accessToken: "",
  roles: {
    user: 0,
  },
}

interface AuthContextProps {
  auth: IAuth // You can replace 'any' with the actual type of 'auth'
  setAuth: React.Dispatch<React.SetStateAction<any>>
  persist: boolean
  setPersist: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextProps>({
  auth: initialAuthState,
  setAuth: () => {},
  persist: false,
  setPersist: () => {},
})

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<IAuth>(initialAuthState)
  const persistedData = localStorage.getItem("persist")
  const [persist, setPersist] = useState<boolean>(
    persistedData ? JSON.parse(persistedData) : false
  )

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
