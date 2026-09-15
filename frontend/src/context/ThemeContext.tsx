import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";


export type ThemeMode =
    | "light"
    | "dark"
    | "system";


interface ThemeContextValue {

    theme: ThemeMode;

    setTheme: (
        theme: ThemeMode
    ) => void;

}


const ThemeContext =
    createContext<
        ThemeContextValue | undefined
    >(undefined);



const THEME_KEY =
    "campusos_theme";



interface ThemeProviderProps {

    children: ReactNode;

}



export const ThemeProvider = ({
    children,
}: ThemeProviderProps) => {


    const [theme, setThemeState] =
        useState<ThemeMode>(() => {


            const savedTheme =
                localStorage.getItem(
                    THEME_KEY
                ) as ThemeMode | null;


            return savedTheme || "system";

        });



    useEffect(() => {


        const root =
            document.documentElement;



        const applyTheme = () => {


            const prefersDark =
                window.matchMedia(
                    "(prefers-color-scheme: dark)"
                ).matches;



            let activeTheme:
                "light" | "dark";


            if(theme === "system"){


                activeTheme =
                    prefersDark
                        ? "dark"
                        : "light";


            }
            else {


                activeTheme =
                    theme;


            }



            root.setAttribute(
                "data-theme",
                activeTheme
            );


        };



        applyTheme();



        if(theme === "system"){


            const mediaQuery =
                window.matchMedia(
                    "(prefers-color-scheme: dark)"
                );



            mediaQuery.addEventListener(
                "change",
                applyTheme
            );



            return () => {

                mediaQuery.removeEventListener(
                    "change",
                    applyTheme
                );

            };


        }



    }, [theme]);




    const setTheme = (
        newTheme: ThemeMode
    ) => {


        localStorage.setItem(
            THEME_KEY,
            newTheme
        );


        setThemeState(
            newTheme
        );


    };




    return (

        <ThemeContext.Provider

            value={{
                theme,
                setTheme,
            }}

        >

            {children}

        </ThemeContext.Provider>

    );

};




export const useTheme = () => {


    const context =
        useContext(
            ThemeContext
        );



    if(!context){

        throw new Error(
            "useTheme must be used inside ThemeProvider"
        );

    }



    return context;

};