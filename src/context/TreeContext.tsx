'use client';

import React, { createContext, useContext, useState } from 'react';

import { Company, TreeNode } from '@/types';

interface TreeContextProps {
  treeData: TreeNode[];
  setTreeData: (data: TreeNode[]) => void;
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company) => void;
}

const TreeContext = createContext<TreeContextProps | undefined>(undefined);

export const TreeProvider = ({ children }: { children: React.ReactNode }) => {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  return (
    <TreeContext.Provider
      value={{ treeData, setTreeData, selectedCompany, setSelectedCompany }}
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
