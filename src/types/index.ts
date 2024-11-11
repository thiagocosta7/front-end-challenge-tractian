export interface TreeNode {
  id: string;
  name: string;
  type: 'location' | 'asset' | 'component';
  children: TreeNode[];
  parentId?: string | null;
  status?: 'operating' | 'alert';
  sensorType?: string;
}

export interface Location {
  id: string;
  name: string;
  parentId?: string | null;
}

export interface Asset {
  id: string;
  name: string;
  parentId?: string | null;
  locationId?: string | null;
  sensorType?: string;
  status?: 'operating' | 'alert';
}

export interface Company {
  id: string;
  name: string;
}
