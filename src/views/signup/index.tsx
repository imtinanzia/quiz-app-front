// components/Signup.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@app/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Heading, Input } from '@app/components';
import Axios from '@app/utils/axios';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await Axios.post('/auth/register', {
        fullName: name,
        email,
        password,
      });

      auth.saveUserData(response?.data?.user);
      setEmail('');
      setPassword('');
      setError(null);
      navigate('/login');
    } catch (err: any) {
      //   setError('Error signing up');
      setError(err?.response?.data?.message || 'Error signing up');
      console.error('Signup error', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full md:w-80">
        <Heading
          variant="heading-six"
          label={'Create a new account to get started.'}
          className="text-black my-2 text-center"
        />
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            required
            label="FullName"
            placeholder="FullName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            required
            label="Email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="text-sm my-2">
            Don't have an account?{' '}
            <Link className="underline" to="/login">
              Login
            </Link>
          </p>
          <div className="text-center">
            <Button.Semantic
              type="submit"
              variant="primary"
              size="small"
              label="Sign up"
              onClick={handleSubmit}
            />
          </div>
        </form>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default Signup;
