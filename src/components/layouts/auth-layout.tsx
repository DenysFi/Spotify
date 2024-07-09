import React, { type PropsWithChildren } from 'react'
import Head from '../seo/head'
import clsx from 'clsx';
import Logo from '../ui/logo/logo';

interface AuthLayoutProps extends PropsWithChildren {
    type: 'login' | 'registrate'
}

function Header() {

    return (
        <div className='pt-8 pb-6'>
            <Logo color='white' />
        </div>
    )
}

function AuthLayout({ children, type }: AuthLayoutProps) {

    const headTitle = type.charAt(0).toUpperCase() + type.slice(1);
    const isLogin = type === 'login';

    return (
        <section className={
            clsx(
                'w-screen h-screen bg-primaryBg flex flex-col items-center ',
                {
                    'sm:bg-primaryBgGradient sm:p-8': isLogin,
                }
            )}>

            <Head title={`${headTitle} | Spotify`} />
            {!isLogin && (
                <>
                    <Header />
                    {children}
                </>
            )}

            {isLogin &&
                <div className='max-w-[45em] w-full bg-primaryBg flex flex-col items-center rounded-lg pb-8 '>
                    <Header />
                    {children}
                </div>
            }

        </section>
    )
}

export default AuthLayout
