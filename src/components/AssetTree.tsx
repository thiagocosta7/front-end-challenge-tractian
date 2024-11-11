'use client';

import React, { useEffect, useState } from 'react';

import { useTreeContext } from '@/context/TreeContext';
import { getAssets, getLocations } from '@/services/api';
import { buildTree } from '@/utils/buildTree';
import TreeNode from './TreeNode';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';

const AssetTree = () => {
  const { treeData, setTreeData, selectedCompany, additionalFilters } =
    useTreeContext();
  const [searchTerm, setSearchTerm] = useState('');

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

  const filterTree = (nodes: typeof treeData): typeof treeData => {
    return nodes
      .map((node) => ({
        ...node,
        children: filterTree(node.children),
      }))
      .filter((node) => {
        const matchesSearch =
          node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          node.children.length > 0;

        const matchesSensorFilter = additionalFilters.showEnergySensors
          ? node.sensorType === 'energy'
          : true;

        const matchesCriticalFilter = additionalFilters.showCriticalAssets
          ? node.status === 'alert'
          : true;

        return matchesSearch && matchesSensorFilter && matchesCriticalFilter;
      });
  };

  const filteredTree = filterTree(treeData);

  return (
    <>
      <div className="relative mb-4 flex items-center">
        <input
          type="text"
          placeholder="Buscar Ativo ou Local"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border-b border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <MagnifyingGlassIcon className="pointer-events-none absolute right-2 size-4 text-gray-700" />
      </div>
      <div>
        {filteredTree.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </div>
    </>
  );
};

export default AssetTree;
