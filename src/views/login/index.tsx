import React, { useState } from 'react';
import { Heading, Container, Text, Input, Button } from '@app/components';
import axios from 'axios';
import { useAuth } from '@app/hooks';
import { Link } from 'react-router-dom';
import Axios from '@app/utils/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<any>(null);
  const [result, setresult] = useState<any>(false);
  const auth = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // Make an Axios POST request to your API endpoint
      const response = await Axios.post('/auth/login', {
        email,
        password,
      });

      // Handle the response here (e.g., set user state or redirect)
      auth.saveUserData(response?.data?.user);
      // Reset the form
      setEmail('');
      setPassword('');
      setError(null);
      window.location.reload();
    } catch (err: any) {
      // Handle errors (e.g., display error message)
      setError(err?.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="bg-[#FFF8F8] ">
      <Container>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded shadow-md w-full md:w-80">
            <Heading
              variant="heading-six"
              label={'Welcome back!'}
              className="text-black my-2 text-center"
            />
            <form onSubmit={handleSubmit} className='space-y-4'>
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
                <Link className="underline" to="/signup">
                  Register
                </Link>
              </p>
              <div className="text-center">
                <Button.Semantic
                  type="submit"
                  variant="primary"
                  size="small"
                  label="Login"
                  onClick={handleSubmit}
                  id="login-btn"
                />
              </div>
            </form>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            {result && (
              <div className="text-green-500 text-sm mt-2">{`Logged in as:${auth?.user?.name}`}</div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
