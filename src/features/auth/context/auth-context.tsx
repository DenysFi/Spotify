import { auth } from "@/lib/auth"
import { onAuthStateChanged, type User } from "firebase/auth"
import { createContext, useEffect, useState, type ReactNode } from "react"

type TUserContext = {
	currentUser: User | null
	userLoggedIn: boolean
	isLoading: boolean
}
export const AuthContext = createContext<TUserContext>({
	currentUser: null,
	userLoggedIn: false,
	isLoading: true,
})

function AuthProvider({ children }: { children: ReactNode }) {
	const [currentUser, setCurrentUser] = useState<User | null>(null)
	const [userLoggedIn, setUserLoggedIn] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, initUser)

		return unsub
	}, [])

	function initUser(user: User | null) {
		if (user) {
			setCurrentUser(user)
			setUserLoggedIn(true)
		} else {
			setCurrentUser(null)
			setUserLoggedIn(false)
		}

		setIsLoading(false)
	}
	const value = { currentUser, userLoggedIn, isLoading }

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
