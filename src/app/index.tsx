import { FC } from 'react'
import AppProvider from './main-provider';
import Button from '@/components/ui/button/button';
import { Bell, Download, Library, Menu } from 'lucide-react';

const App: FC = () => {
    return (
        <div className='w-screen h-screen flex items-center justify-center bg-slate-600 '>

            <AppProvider>
                <div className='flex gap-2 flex items-center '>
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
                        size={'icon'}
                        variant={'iconTransparent'}
                        hover={'iconHover'}
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
            </AppProvider>
        </div>
    )
};
export default App;