import React, { type PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../ui/logo/logo'


function Header() {

    return (
        <header className='bg-[#000] w-full h-[80px] flex items-center justify-center '>
            <div className='container text-white flex h-full items-center justify-between'>
                <div>
                    <Logo />
                </div>
                <nav >
                    <ul className='flex items-center justify-center font-bold'>
                        <li className='py-7 px-4 cursor-pointer'>
                            <a href="" className='transition-colors duration-300 hover:text-[#1ED760]'>Premium</a>
                        </li>
                        <li className='py-7 px-4 cursor-pointer'>
                            <a href="" className='transition-colors duration-300 hover:text-[#1ED760]'>Підтримка</a>
                        </li>
                        <li className='py-7 px-4 cursor-pointer'>
                            <a href="" className='transition-colors duration-300 hover:text-[#1ED760]'>Завантажити</a>
                        </li>
                        <li className='h-4 bg-white w-[1px] mx-4' />
                        <li className='py-7 px-4 cursor-pointer'>
                            <Link to='/register' className='transition-colors duration-300 hover:text-[#1ED760]'>Зареєструватися</Link>
                        </li>
                        <li className='py-7 px-4 cursor-pointer'>
                            <Link to='/login' className='transition-colors duration-300 hover:text-[#1ED760]'>Увійти</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
function Footer() {

    return <footer>

        footer
    </footer>
}


interface LandingLayoutProps extends PropsWithChildren { }

function LandingLayout({ children }: LandingLayoutProps) {

    return (
        <main className='flex flex-col min-h-screen'>
            <Header />
            <section className='container flex-auto'>
                {children}
            </section>
            <Footer />
        </main>
    )
}

export default LandingLayout
