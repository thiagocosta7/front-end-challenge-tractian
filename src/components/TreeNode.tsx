'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { TreeNode as TreeNodeType } from '@/types';
import {
  BoltIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/16/solid';
import { useAppContext } from '@/context/AppContext';
import { getStatusIcon } from '@/utils/getStatusIcon';

interface TreeNodeProps {
  node: TreeNodeType;
}

const TreeNode = ({ node }: TreeNodeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedAsset, setSelectedAsset } = useAppContext();

  const hasChildren = node.children.length > 0;

  const getIcon = (type: TreeNodeType['type']) => {
    switch (type) {
      case 'component':
        return '/icons/component.png';
      case 'asset':
        return '/icons/asset.png';
      case 'location':
        return '/icons/location.png';
      default:
        return '/icons/location.png'; // Fallback
    }
  };

  const handleSelect = () => {
    setSelectedAsset(node);
    console.log('nodeee', node);
  };

  const handleToggle = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  const isSelected = selectedAsset?.id === node.id;

  const isComponent = node?.type === 'component';

  const isOperating = node?.status === 'operating';
  const isCritical = node?.status === 'alert';
  const isEnergySensor = node?.sensorType === 'energy';

  return (
    <>
      <button
        className={`flex w-full items-center rounded p-2 ${
          isSelected ? 'bg-blue-500 text-white' : 'bg-white'
        }`}
        onClick={() => {
          handleSelect();
          handleToggle();
        }}
      >
        <span className="mr-2 flex size-4 items-center justify-center">
          {hasChildren ? (
            isOpen ? (
              <ChevronDownIcon />
            ) : (
              <ChevronRightIcon />
            )
          ) : null}
        </span>
        <Image
          src={getIcon(node.type)}
          alt={node.type}
          className={`mr-2 size-4 ${isSelected ? 'brightness-[100] grayscale-[100%]' : ''}`}
          width={24}
          height={24}
        />
        <span className="mr-2">{node.name}</span>
        {isComponent && getStatusIcon(node.status, node.sensorType)}
      </button>

      {isOpen && node.children.length > 0 && (
        <div className="ml-4">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </>
  );
};

export default TreeNode;
