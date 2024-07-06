import { FC } from 'react'
import AppProvider from './main-provider';
import Button from '@/components/ui/button/button';
import { Download } from 'lucide-react';

const App: FC = () => {
    return (
        <div className='w-screen h-screen flex items-center justify-center bg-slate-600'>

            <AppProvider>
                <div className='flex gap-2'>
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
                    >
                        Моя медиатека
                    </Button>
                </div>
            </AppProvider>
        </div>
    )
};
export default App;