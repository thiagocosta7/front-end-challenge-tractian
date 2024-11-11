'use client';

import React, { useState, useEffect } from 'react';
import { useTreeContext } from '@/context/TreeContext';
import { getCompanies } from '@/services/api';
import Image from 'next/image';

interface Company {
  id: string;
  name: string;
}

const Header = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const { selectedCompany, setSelectedCompany } = useTreeContext();

  useEffect(() => {
    getCompanies().then((companies) => {
      if (companies.length > 0) {
        setCompanies(companies);
        setSelectedCompany(companies[0]);
      }
    });
  }, [setSelectedCompany]);

  return (
    <header className="flex items-center justify-between bg-gray-900 px-4 py-3 text-white">
      <Image src={'/logo.svg'} alt="TRACTIAN" width={103} height={14} />
      <div className="flex space-x-2">
        {companies.map((company) => (
          <button
            key={company.id}
            onClick={() => setSelectedCompany(company)}
            className={`rounded px-2 py-1 text-xs ${
              selectedCompany?.id === company.id
                ? 'bg-blue-600 text-white'
                : 'bg-blue-900 text-gray-300'
            } hover:bg-blue-500`}
          >
            {company.name}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
