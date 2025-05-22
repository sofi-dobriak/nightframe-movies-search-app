import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className='min-w-[320px] max-w-[375px] m-auto py-0 pl-4 pr-4 md:max-w-[768px] xl:max-w-[1440px]'>
      {children}
    </div>
  );
};

export default Container;
