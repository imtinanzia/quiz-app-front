interface BorderButtonProps {
  handleAnswerClick?: any;
  selectedAnswer?: string | null;
  value?: string | null;
}

const BorderButton = ({
  handleAnswerClick,
  selectedAnswer,
  value,
}: BorderButtonProps) => {
  return (
    <div className="mb-4">
      <button
        className={`w-full py-2 px-4 rounded border ${
          selectedAnswer === value ? 'border-blue-500' : ''
        }`}
        onClick={() => handleAnswerClick(value)}
      >
        {value}
      </button>
    </div>
  );
};

export default BorderButton
