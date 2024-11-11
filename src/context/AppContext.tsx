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
  companies: Company[]; // List of companies available
  locations: TreeNode[]; // List of locations for the selected company
  assets: TreeNode[]; // List of assets for the selected company
  treeData: TreeNode[]; // Complete tree structure of assets and locations
  setTreeData: (data: TreeNode[]) => void; // Function to update the tree data
  selectedCompany: Company | null; // Currently selected company
  setSelectedCompany: (company: Company) => void; // Function to update the selected company
  selectedAsset: TreeNode | null; // Currently selected asset or component
  setSelectedAsset: (asset: TreeNode | null) => void; // Function to update the selected asset or component
  additionalFilters: AdditionalFilters; // Filters applied to the tree data
  setAdditionalFilters: (filters: AdditionalFilters) => void; // Function to update filters
  isLoading: boolean; // Indicates if data is being loaded
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

/**
 * AppProvider Component
 * Provides application-wide context, including data, state management, and loading status.
 *
 * @param {React.ReactNode} children - The child components that will consume the context.
 *
 * @returns {JSX.Element} The context provider wrapping the children components.
 */
export const AppProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
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
            setSelectedCompany(data[0]); // Automatically selects the first company
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
      setSelectedAsset(null); // Resets the selected asset on company change
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
