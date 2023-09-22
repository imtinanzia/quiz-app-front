import { useContext } from 'react';
import { AuthContext } from '@app/context';

const useAuth = () => useContext(AuthContext);

export default useAuth;
