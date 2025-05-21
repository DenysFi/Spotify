import { createContext, useEffect, useState, type ReactNode } from "react";

type User = {
  displayName: string;
  email: string;
};

type TUserContext = {
  currentUser: User | null;
  userLoggedIn: boolean;
  isLoading: boolean;
  setCurrentUser: (user: User | null) => void;
};
export const AuthContext = createContext<TUserContext>({
  currentUser: null,
  userLoggedIn: false,
  isLoading: true,
  setCurrentUser: () => {},
});

function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  // 	const unsub = onAuthStateChanged(auth, initUser)

  // 	return unsub
  // }, [])

  // function initUser(user: User | null) {
  // 	if (user) {
  // 		setCurrentUser(user)
  // 		setUserLoggedIn(true)
  // 	} else {
  // 		setCurrentUser(null)
  // 		setUserLoggedIn(false)
  // 	}

  // 	setIsLoading(false)
  // }

  // Get the cookie value

  // call the fetch function with retry logic
  useEffect(() => {
    // define a fetch function that retries until status 200 or 401
    async function fetchWithRetry(url: string, options: any) {
      try {
        // make the fetch request
        const response = await fetch(url, options);
        // check the status code
        if (response.status == 200) {
          console.log("Authorized");
          const j: {
            name: string;
            email: string;
          } = await response.json();
          setCurrentUser({ email: j.email, displayName: j.email });
          setUserLoggedIn(true);
          return response; // return the response
        } else if (response.status == 401) {
          console.log("Unauthorized");
          return response; // return the response
        } else {
          // throw an error to trigger the catch block
          throw new Error("" + response.status);
        }
      } catch (error) {
        // increment the retry count
        // check if the retry limit is reached
      }
    }

    fetchWithRetry("/pingauth", {
      method: "GET",
    })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setIsLoading(false); // set loading to false when the fetch is done
      });
  }, []);

  const value = { currentUser, userLoggedIn, isLoading, setCurrentUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
