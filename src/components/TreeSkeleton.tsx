import Skeleton from 'react-loading-skeleton';

export const TreeSkeleton = ({
  levels = 2,
  nodesPerLevel = 2,
}: {
  levels?: number;
  nodesPerLevel?: number;
}) => {
  const renderSkeletonTree = (currentLevel: number): JSX.Element[] => {
    if (currentLevel > levels) return [];

    return Array.from({ length: nodesPerLevel }, (_, index) => (
      <div
        key={`${currentLevel}-${index}`}
        className="flex flex-col gap-2 pl-8"
      >
        <Skeleton width={350} height={24} />
        <div className="ml-4">{renderSkeletonTree(currentLevel + 1)}</div>
      </div>
    ));
  };

  return <div>{renderSkeletonTree(1)}</div>;
};
