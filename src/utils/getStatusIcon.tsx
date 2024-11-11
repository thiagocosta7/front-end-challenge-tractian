import { BoltIcon } from '@heroicons/react/16/solid';

export const getStatusIcon = (
  status: 'alert' | 'operating' | undefined,
  sensorType?: string,
): JSX.Element | null => {
  if (status === 'alert') {
    return <span key="critical" className="size-2 rounded-full bg-red-700" />;
  }

  if (sensorType === 'energy') {
    return <BoltIcon key="energy" className="h-3 text-green-600" />;
  }

  if (status === 'operating') {
    return (
      <span key="operating" className="size-2 rounded-full bg-green-600" />
    );
  }

  return null;
};
