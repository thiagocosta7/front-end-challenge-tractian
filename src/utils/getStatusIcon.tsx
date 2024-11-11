import {
  BoltIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/16/solid';

/**
 * Returns the appropriate status icon based on the provided status and sensor type
 *
 * @param {'alert' | 'operating' | undefined} status - The status of the asset or component
 * - `'alert'` indicates a critical condition;
 * - `'operating'` indicates normal operation;
 * - `undefined` indicates no specific status;
 * @param {string} [sensorType] - The type of sensor associated with the asset or component
 * - `'energy'` indicates an energy sensor;
 * @returns {JSX.Element | null} - A JSX element representing the status icon, or `null` if no icon is applicable
 *
 */
export const getStatusIcon = (
  status: 'alert' | 'operating' | undefined,
  sensorType?: string,
): JSX.Element | null => {
  if (status === 'alert') {
    return <ExclamationCircleIcon className="size-4 text-red-600" />;
  }

  if (sensorType === 'energy') {
    return <BoltIcon className="size-4 text-green-500" />;
  }

  if (status === 'operating') {
    return <CheckCircleIcon className="size-4 text-green-500" />;
  }

  return null;
};
