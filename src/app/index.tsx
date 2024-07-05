import { FC } from 'react'
import AppProvider from './main-provider';
import Button from '@/components/ui/button/button';

const App: FC = () => {
    return (
        <div className='w-screen h-screen flex items-center justify-center '>
            <AppProvider>
                <Button size={'sm'} variant={'default'} >Установи приложение</Button>
            </AppProvider>
        </div>
    )
};
export default App;