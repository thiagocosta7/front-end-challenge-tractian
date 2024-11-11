'use client';

import React, { createContext, useContext, useState } from 'react';

import { Company, TreeNode } from '@/types';

interface AdditionalFilters {
  showEnergySensors: boolean;
  showCriticalAssets: boolean;
}

interface TreeContextProps {
  treeData: TreeNode[];
  setTreeData: (data: TreeNode[]) => void;
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company) => void;
  selectedAsset: TreeNode | null;
  setSelectedAsset: (asset: TreeNode | null) => void;
  additionalFilters: AdditionalFilters;
  setAdditionalFilters: (filters: AdditionalFilters) => void;
}

const TreeContext = createContext<TreeContextProps | undefined>(undefined);

export const TreeProvider = ({ children }: { children: React.ReactNode }) => {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<TreeNode | null>(null);
  const [additionalFilters, setAdditionalFilters] = useState<AdditionalFilters>(
    {
      showEnergySensors: false,
      showCriticalAssets: false,
    },
  );

  return (
    <TreeContext.Provider
      value={{
        treeData,
        setTreeData,
        selectedCompany,
        setSelectedCompany,
        selectedAsset,
        setSelectedAsset,
        additionalFilters,
        setAdditionalFilters,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};

export const useTreeContext = () => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error('useTreeContext must be used within a TreeProvider');
  }
  return context;
};
