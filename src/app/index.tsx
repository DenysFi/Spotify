// import { Button } from '@/components/ui/button';
// import SearchInput from '@/components/ui/search/search';
// import { Bell, Download, Library, Menu } from 'lucide-react';
import { type FC, useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import AppProvider from './main-provider';
import { createRouter } from './routes';

const AppRouter = () => {

    const router = useMemo(() => createRouter(), []);

    return <RouterProvider router={router} />
}

const App: FC = () => {

    return (
        <AppProvider>
            <AppRouter />
        </AppProvider>
    )
};
export default App;

{/* <div className='flex gap-2  items-center '>
                    <Button
                        size={'sm'}
                        variant={'default'}
                        hover={'pulse'}
                        iconLeft={<Download className='h-4 w-4' strokeWidth={3} />}
                    >
                        Установить приложение
                    </Button>
                    <Button
                        size={'sm'}
                        variant={'pillFilled'}
                        hover={'pulse'}
                    >
                        Узнать больше о Premium
                    </Button>
                    <Button
                        size={'lg'}
                        variant={'text'}
                        iconLeft={<Library />}
                        iconLeft={<Library />}
                    >
                        Моя медиатека
                    </Button>
                    <Button
                        size={'sm'}
                        variant={'text'}
                        iconRight={<Menu className='h-4 w-4' />}
                    >
                        Недавно прослушано
                    </Button>
                    <Button
                        size={'icon'}
                        variant={'icon'}
                        hover={'pulse'}
                    >
                        <Bell className='h-4 w-4' />
                    </Button>
                    <Button
                        size={'icon'}
                        variant={'icon'}
                        hover={'pulse'}
                    >
                        <div className=' w-full h-full px-[3px] py-[3px]  '>
                            <span className='bg-green-400 w-full h-full text-black rounded-full flex items-center justify-center'>
                                B
                            </span>
                        </div>
                    </Button>
                    <Button
                        size='icon'
                        variant='iconTransparent'
                        hover='iconPrimaryHover'

                    >
                        <Bell className='h-4 w-4' />
                    </Button>
                    <Button
                        size={'icon'}
                        variant={'iconTransparent'}
                        hover={'iconSecondaryHover'}
                    >
                        <Bell className='h-4 w-4' />
                    </Button>
                    <Button
                        size={'icon'}
                        variant={'iconTransparent'}
                    >
                        <Bell className='h-4 w-4' />
                    </Button>
                </div>
                <div className='flex gap-2  items-center '>
                    <SearchInput size={undefined} />
                </div> */}