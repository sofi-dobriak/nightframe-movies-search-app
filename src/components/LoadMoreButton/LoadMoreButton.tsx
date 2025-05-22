interface LoadMoreButtonProps {
  handleLoadMore: () => void;
}

const LoadMoreButton = ({ handleLoadMore }: LoadMoreButtonProps) => {
  return (
    <button
      onClick={handleLoadMore}
      className='block m-auto mb-10 rounded-sm border-none bg-[var(--button-bg-color)] min-w-[150px] h-[50px] transition duration-300ms ease-in-out cursor-pointer hover:bg-[var(--hover-color)] focus:bg-[var(--hover-color)]'
    >
      Load more
    </button>
  );
};

export default LoadMoreButton;
