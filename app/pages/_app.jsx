import '../app/globals.css';
import { UserProvider } from '../components/UserContext';

export default function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    );
}