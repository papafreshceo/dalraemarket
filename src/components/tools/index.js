// src/components/tools/index.js

// 모든 도구 컴포넌트 import
import MarginCalculator from './MarginCalculator';
import PriceSimulator from './PriceSimulator';
import OrderIntegration from './OrderIntegration';
import OptionPricing from './OptionPricing';
import InventoryTracker from './InventoryTracker';
import DiscountCalculator from './DiscountCalculator';
import SalesAnalytics from './SalesAnalytics';
import CustomerMessage from './CustomerMessage';
import BarcodeGenerator from './BarcodeGenerator';
import TransactionStatement from './TransactionStatement';
import TrendAnalysis from './TrendAnalysis';
import CompetitorMonitor from './CompetitorMonitor';

// 도구 컴포넌트 맵
export const toolComponents = {
  'margin-calculator': MarginCalculator,
  'price-simulator': PriceSimulator,
  'order-integration': OrderIntegration,
  'option-pricing': OptionPricing,
  'inventory-tracker': InventoryTracker,
  'discount-calculator': DiscountCalculator,
  'sales-analytics': SalesAnalytics,
  'customer-message': CustomerMessage,
  'barcode-generator': BarcodeGenerator,
  'transaction-statement': TransactionStatement,
  'trend-analysis': TrendAnalysis,
  'competitor-monitor': CompetitorMonitor
};

// 개별 export도 제공
export {
  MarginCalculator,
  PriceSimulator,
  OrderIntegration,
  OptionPricing,
  InventoryTracker,
  DiscountCalculator,
  SalesAnalytics,
  CustomerMessage,
  BarcodeGenerator,
  TransactionStatement,
  TrendAnalysis,
  CompetitorMonitor
};