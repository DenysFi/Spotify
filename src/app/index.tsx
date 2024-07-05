import { FC } from 'react'
import AppProvider from './main-provider';
import Button from '@/components/ui/button/button';

const App: FC = () => {
    return (
        <AppProvider>
            <Button size={'lg'} variant={'default'} >fff</Button>
        </AppProvider>
    )
};
export default App;