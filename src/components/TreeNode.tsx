'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { TreeNode as TreeNodeType } from '@/types';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/16/solid';

interface TreeNodeProps {
  node: TreeNodeType;
}

const TreeNode = ({ node }: TreeNodeProps) => {
  const [isOpen, setIsOpen] = useState(false);

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

  const handleToggle = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="ml-4">
      <button
        className={`flex items-center ${hasChildren ? 'cursor-pointer' : 'cursor-default'}`}
        onClick={handleToggle}
      >
        <span className="mr-2 flex h-4 w-4 items-center justify-center">
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
          className="mr-2 h-4 w-4"
          width={24}
          height={24}
        />
        <span>{node.name}</span>
      </button>

      {isOpen && node.children.length > 0 && (
        <div className="ml-4">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
