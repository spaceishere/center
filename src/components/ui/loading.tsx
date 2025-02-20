import { cn } from '@/lib/utils';
import { Loader2Icon, type LucideProps } from 'lucide-react';

const LoadingOverlay = () => (
  <div className="fixed inset-0 z-50 bg-black/20 " />
);

const Loading = ({
  className,
  style
}: {
  className?: string;
  style?: object;
}) => {
  return (
    <LoadingWrapper className={className} style={style}>
      <LoadingIcon />
      <LoadingText />
    </LoadingWrapper>
  );
};

export const LoadingIcon = ({ className, ...rest }: LucideProps) => {
  return (
    <Loader2Icon
      className={cn('animate-spin h-5 w-5 mr-2', className)}
      {...rest}
    />
  );
};

export const LoadingWrapper = ({
  className,
  children,
  style
}: {
  className?: string;
  children: React.ReactNode;
  style?: object;
}) => {
  return (
    <div
      style={style}
      className={cn('flex items-center justify-center flex-auto', className)}
    >
      {children}
    </div>
  );
};

export const LoadingText = () => {
  return <span className="text-sm">Уншиж байна...</span>;
};

export { Loading, LoadingOverlay };
