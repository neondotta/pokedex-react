import ReactLoading from 'react-loading';
import { LoaderContainer } from './styles';

interface LoaderProps {
    isLoading: boolean;
    type?: string;
  }

export function Loader({ isLoading, type = 'spinningBubbles'  }: LoaderProps) {


    return(
        <>
            {isLoading && (
                <LoaderContainer className="loader">
                    <ReactLoading type={type} color='#30a7d7' height={300} width={175} />
                </LoaderContainer>
            )}
        </>
    )
}