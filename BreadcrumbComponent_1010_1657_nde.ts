// 代码生成时间: 2025-10-10 16:57:58
import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@reach/breadcrumb';
import { useLocation } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

interface BreadcrumbItemData {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItemData[];
}

const BreadcrumbComponent: React.FC<BreadcrumbProps> = ({ items }) => {
  const location = useLocation();
  const client = useApolloClient();

  // Error handling for breadcrumb items
  if (!Array.isArray(items) || items.length === 0) {
    console.error('Breadcrumb items must be a non-empty array.');
    return null;
  }

  // Render breadcrumb items
  return (
    <Breadcrumb style={{ margin: '1rem 0' }}>
      {items.map((item, index) => {
        // Provide a default href if not specified
        const href = item.href || '#';

        return (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink to={href} onClick={() => {
              // Handle click event for breadcrumb item
              item.onClick && item.onClick();
            }}>
              {item.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;