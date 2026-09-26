/**
 * Types & Interfaces for Sandrana Rice Mills
 */

export interface ProductItem {
  id: string;
  name: string;
  category: 'kaynat' | 'basmati' | 'long-grain' | 'hybrid';
  subheading: string;
  description: string;
  grainLength: string;
  moistureContent: string;
  brokenGrains: string;
  purity: string;
  color: string;
  idealUse: string;
  packagingOptions: string[];
  imageKey: string;
  defaultFileName: string;
}

export interface ManagementProfile {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  imageKey: string;
  defaultFileName: string;
  phone?: string;
}

export interface ProcessingStep {
  step: string;
  title: string;
  shortDesc: string;
  details: string;
  iconName: string;
}

export interface ImageSlot {
  key: string;
  defaultFileName: string;
  title: string;
  targetSection: 'Brand / Logo' | 'Hero Banner' | 'Heritage' | 'Paddy Agriculture' | 'Product' | 'Leadership';
  assignedLabel: string;
  aspectRatio: '1:1' | '16:9' | '4:3' | '3:4';
  description: string;
}

export interface ContactFormData {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  productInterest: string;
  quantityEst: string;
  message: string;
}
