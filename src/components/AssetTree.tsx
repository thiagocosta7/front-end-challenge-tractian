'use client';

import React, { useEffect } from 'react';

import { useTreeContext } from '@/context/TreeContext';
import { getAssets, getLocations } from '@/services/api';
import { buildTree } from '@/utils/buildTree';
import TreeNode from './TreeNode';

const AssetTree = () => {
  const { treeData, setTreeData, selectedCompany } = useTreeContext();

  useEffect(() => {
    const loadData = async () => {
      if (selectedCompany) {
        const locations = await getLocations(selectedCompany.id);
        const assets = await getAssets(selectedCompany.id);
        const tree = buildTree(locations, assets);
        setTreeData(tree);
      }
    };

    loadData();
  }, [selectedCompany, setTreeData]);

  return (
    <div className="p-4">
      {treeData.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
};

export default AssetTree;
