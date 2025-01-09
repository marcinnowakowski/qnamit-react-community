import Header from '../main/Header';
import Whizard from '../screens/Whizard';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { AppDispatch } from '../../redux/store';

const Main: React.FC = () => {
  const headerTitle = 'Medical Inquiry';

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
      dispatch(logout());
      alert('Logged out successfully');
  };

  return (
    <div className='Main'>
      <Header title={headerTitle} onLogout={handleLogout} />
      <Whizard />
    </div>
  );
};

export default Main;
