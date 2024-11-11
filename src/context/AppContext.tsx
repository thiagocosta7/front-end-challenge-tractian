'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { getCompanies, getLocations, getAssets } from '@/services/api';
import { Company, TreeNode } from '@/types';
import { buildTree } from '@/utils/buildTree';

interface AdditionalFilters {
  showEnergySensors: boolean;
  showCriticalAssets: boolean;
}

interface AppContextProps {
  companies: Company[];
  locations: TreeNode[];
  assets: TreeNode[];
  treeData: TreeNode[];
  setTreeData: (data: TreeNode[]) => void;
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company) => void;
  selectedAsset: TreeNode | null;
  setSelectedAsset: (asset: TreeNode | null) => void;
  additionalFilters: AdditionalFilters;
  setAdditionalFilters: (filters: AdditionalFilters) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [locations, setLocations] = useState<TreeNode[]>([]);
  const [assets, setAssets] = useState<TreeNode[]>([]);
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<TreeNode | null>(null);
  const [additionalFilters, setAdditionalFilters] = useState<AdditionalFilters>(
    {
      showEnergySensors: false,
      showCriticalAssets: false,
    },
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const companiesFetched = useRef(false);
  const companyDataFetched = useRef<string | null>(null);

  useEffect(() => {
    if (!companiesFetched.current) {
      companiesFetched.current = true;
      setIsLoading(true);
      getCompanies()
        .then((data) => {
          setCompanies(data);
          if (data.length > 0) {
            setSelectedCompany(data[0]);
          }
        })
        .catch((error) => {
          console.error('Error fetching companies:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (selectedCompany && companyDataFetched.current !== selectedCompany.id) {
      companyDataFetched.current = selectedCompany.id;
      setIsLoading(true);
      setSelectedAsset(null);
      Promise.all([
        getLocations(selectedCompany.id),
        getAssets(selectedCompany.id),
      ])
        .then(([fetchedLocations, fetchedAssets]) => {
          setLocations(fetchedLocations);
          setAssets(fetchedAssets);
          setTreeData(buildTree(fetchedLocations, fetchedAssets));
        })
        .catch((error) => {
          console.error('Error fetching company data:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedCompany]);

  return (
    <AppContext.Provider
      value={{
        companies,
        locations,
        assets,
        treeData,
        setTreeData,
        selectedCompany,
        setSelectedCompany,
        selectedAsset,
        setSelectedAsset,
        additionalFilters,
        setAdditionalFilters,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
