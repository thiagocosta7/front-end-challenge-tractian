import { BoltIcon } from '@heroicons/react/16/solid';

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
