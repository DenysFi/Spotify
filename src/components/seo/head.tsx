import { type FC } from 'react'
import { Helmet } from 'react-helmet-async';

interface HeaderProps {
    title: string,
    description?: string
}

const Head: FC<HeaderProps> = ({ title, description = '' }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
        </Helmet>
    )
};
export default Head;