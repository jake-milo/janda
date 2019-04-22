import { useContext } from 'react';
import { RouterContext } from '../components/Router';

export const useRouter = () => useContext(RouterContext);

export const useLocation = () => useRouter().location || {};
