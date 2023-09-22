// components/Main.tsx
import React, { useEffect, useState, useTransition, useCallback } from 'react';
import {
  handleOptionShuffling,
  isArrayCheck,
  shuffle,
} from '@app/utils/helper-functions';
import { useAuth } from '@app/hooks';
import { Button, Heading } from '@app/components';
import Axios from '@app/utils/axios';
import { BorderButton } from '@app/components';
const Main = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [result, setresult] = useState<boolean | null>(false);
  const [countries, setCountries] = useState<any[]>([]); // State to store countries data
  const [selectedCountry, setselectedCountry] = useState<any>(null); // State to store countries data
  const [options, setOptions] = useState<string[]>([]); // State to store options A, B, and C
  const auth = useAuth();

  const fetchData = useCallback(async () => {
    Axios.get('/auth/countries', {
      headers: { Authorization: `Bearer ${auth?.user?.token}` },
    })
      .then((response) => {
        const data = response.data.countries;
        setCountries(data);
        const result = handleOptionShuffling(data);
        setOptions(result.options);
        setselectedCountry(result.selectedCountry);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Empty dependency array ensures that this effect runs only once on component mount

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    setresult(true);
  };
  const handlePlayAgain = () => {
    const result = handleOptionShuffling(countries);
    setOptions(result.options);
    setselectedCountry(result.selectedCountry);
    setresult(false);
  };

  if (isArrayCheck(countries)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full md:w-6/12">
          <Heading
            variant="heading-six"
            label={`Which one is the capital city of ${selectedCountry?.name}`}
            className="text-black my-2 question-container"
          />
          {options &&
            options.map((op) => (
              <BorderButton
                handleAnswerClick={handleAnswerClick}
                selectedAnswer={selectedAnswer}
                value={op}
              />
            ))}
          {result ? (
            String(selectedAnswer).toLocaleLowerCase() ===
            String(selectedCountry?.capital).toLocaleLowerCase() ? (
              <div className="text-green-500 text-sm mt-2">
                {'Right Answer'}
              </div>
            ) : (
              <div className="my-2">
                <div className="text-red-500 text-sm mt-2">
                  {'Wrong Answer'}
                </div>
                <div className="text-green-500 text-sm mt-2">{`Capital city of ${selectedCountry?.name} is ${selectedCountry?.capital}`}</div>
              </div>
            )
          ) : null}
          <div className="text-center">
            {result && (
              <Button.Semantic
                type="submit"
                variant="primary"
                size="small"
                label="Play Again"
                onClick={handlePlayAgain}
                className="bg-blue-500 mr-2"
              />
            )}
            <Button.Semantic
              type="submit"
              variant="primary"
              size="small"
              label="Submit"
              onClick={handleSubmit}
              className="bg-blue-500"
            />
          </div>
        </div>
        {/* Logout button in top right corner */}
        <Button.Semantic
          variant="primary"
          size="small"
          label="Logout"
          onClick={auth.logout}
          className="bg-red-500 my-5"
        />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full md:w-6/12">
        <Heading
          variant="heading-six"
          label={`Which one is the capital city of Country`}
          className="text-black my-2 question-container"
        />
        {['Option A', 'Option B', 'Option C'].map((op) => (
          <BorderButton
            handleAnswerClick={handleAnswerClick}
            selectedAnswer={selectedAnswer}
            value={op}
          />
        ))}
        {result ? (
          String(selectedAnswer).toLocaleLowerCase() ===
          String(selectedCountry?.capital).toLocaleLowerCase() ? (
            <div className="text-green-500 text-sm mt-2">{'Right Answer'}</div>
          ) : (
            <div className="my-2">
              <div className="text-red-500 text-sm mt-2">{'Wrong Answer'}</div>
              <div className="text-green-500 text-sm mt-2">{`Capital city of ${selectedCountry?.name} is ${selectedCountry?.capital}`}</div>
            </div>
          )
        ) : null}
        <div className="text-center">
          <Button.Semantic
            type="submit"
            variant="primary"
            size="small"
            label="Submit"
            className="bg-blue-500"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
