import { Link } from 'react-router-dom';
import { VerifyEmailForm } from '@wasp/auth/forms/VerifyEmail';
import { AuthWrapper } from './authWrapper';

export function EmailVerification() {
  return (
    <AuthWrapper>
      <VerifyEmailForm />
      <br />
      <span className='text-sm font-medium text-gray-900'>
        If everything is okay, <Link to='/login' className='underline'>go to login</Link>
      </span>
    </AuthWrapper>
  );
}
