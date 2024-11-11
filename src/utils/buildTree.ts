import { Asset, Location, TreeNode } from '@/types';

export const buildTree = (
  locations: Location[],
  assets: Asset[],
): TreeNode[] => {
  const nodeMap = new Map<string, TreeNode>();

  locations.forEach((location) => {
    nodeMap.set(location.id, {
      id: location.id,
      name: location.name,
      type: 'location',
      children: [],
      parentId: location.parentId || null,
    });
  });

  assets.forEach((asset) => {
    const node: TreeNode = {
      id: asset.id,
      name: asset.name,
      type: asset.sensorType ? 'component' : 'asset',
      children: [],
      parentId: asset.locationId || asset.parentId || null,
      status: asset.status,
      sensorType: asset.sensorType,
      sensorId: asset.sensorId,
      gatewayId: asset.gatewayId,
    };

    nodeMap.set(asset.id, node);
  });

  nodeMap.forEach((node) => {
    if (node.parentId) {
      const parentNode = nodeMap.get(node.parentId);
      if (parentNode) {
        parentNode.children.push(node);
      }
    }
  });

  return Array.from(nodeMap.values()).filter((node) => !node.parentId);
};
