
import type { LucideIcon } from "lucide-react";
import type { ElementType } from "react";

export interface EarningData {
  day: string;
  earnings: number;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface EarningsBreakdown {
  basePay: number;
  distancePay: number;
  commission: number;
  membershipBonus?: number;
  petrolIncentive?: number;
  total: number;
}

export interface Restaurant {
    name: string;
    address: string;
    avatarUrl: string;
    distance: number; // in km
    time: number; // in mins
    navigationUrl: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
}

export interface Delivery {
  id: string;
  customer: {
    name: string;
    avatarUrl: string;
    instructions?: string;
  };
  destination: string;
  earnings: number;
  distance: number;
  timestamp: string;
  status: 'In-progress' | 'Delivered' | 'Cancelled';
  stage: 'Pickup' | 'AtRestaurant' | 'PickedUp' | 'AtCustomer' | 'Complete' | 'Cancelled';
  restaurant: Restaurant;
  customerLocation?: {
    coordinates: {
      lat: number;
      lng: number;
    };
    address: string;
  };
  orderItems: OrderItem[];
  earningsBreakdown: EarningsBreakdown;
  estimatedTime: number; // in minutes
}

export interface BatchOrder {
  id: string;
  orderCount: number;
  dropPoints: number;
  endLocation: string;
  deliveryEarnings: number;
  totalTips: number;
  totalDistance: number;
  totalEstEarnings: number;
}

export interface Hub {
    id: string;
    name: string;
    address: string;
    distance: number;
    operatingHours: string;
    facilities: {
        name: string;
        icon: LucideIcon;
    }[];
}

export interface HotZone {
    name: string;
    distance: number;
    orders: number;
    earning: string;
}

export interface Stat {
    title: string;
    value: string;
    description: string;
    icon: LucideIcon;
}

export interface Settlement {
  id: string;
  date: string;
  time: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface Gig {
  id: string;
  time: string;
}

export interface Incentive {
  id: string;
  title: string;
  description: string;
  reward: number;
  progress: number;
  deadline: string;
  icon: LucideIcon;
  iconBg: string;
}

export type DocumentStatus = 'Verified' | 'Pending' | 'Rejected' | 'Not Uploaded';

export interface Document {
  id: string;
  title: string;
  description: string;
  status: DocumentStatus;
  uploadedDate?: string;
  expiryDate?: string;
  rejectionReason?: string;
}

export interface SubscriptionHistoryItem {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'Paid';
}

export interface SubscriptionStats {
  extraEarnings: number;
  priorityOrders: number;
  subscribedDays: number;
}

export interface Checkup {
    id: string;
    name: string;
    description: string;
    icon: LucideIcon;
}

export interface PastCheckup {
    id: string;
    name: string;
    date: string;
    status: 'Completed';
    icon: LucideIcon;
}

export interface UpcomingAppointment {
  id: string;
  centerName: string;
  address: string;
  date: string;
  time: string;
  checkups: string[];
}

export type CourseStatus = 'Available' | 'InProgress' | 'Completed';

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  status: CourseStatus;
  duration?: string;
  progress?: number;
  completedDate?: string;
  isNew?: boolean;
}

export type MerchandiseTag = 'Essential' | 'Seasonal' | 'Required';

export interface MerchandiseItem {
  id: string;
  name: string;
  category: 'Apparel' | 'Safety' | 'Weather' | 'Accessory';
  price: string;
  tag?: MerchandiseTag;
  imageUrls: string[];
  imageHint: string;
}

export type MerchandiseOrderStatus = 'In Transit' | 'Processing' | 'Delivered' | 'Cancelled';

export interface MerchandiseOrder {
  id: string;
  productName: string;
  orderId: string;
  date: string;
  status: MerchandiseOrderStatus;
  imageUrl: string;
  imageHint: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactMethod {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  badgeColor?: string;
  href?: string;
}

export interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  duration: string;
  videoUrl: string;
}

export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  icon: LucideIcon;
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  name: string;
  avatarUrl: string;
  score: number;
  isCurrentUser?: boolean;
}

export interface Achievement {
  id: string;
  name:string;
  description: string;
  icon: LucideIcon;
  achieved: boolean;
  progress?: number;
}

export interface Transaction {
  id: number;
  date: string;
  amount: number;
  type: string;
  status: 'Credited' | 'Debited';
}

export interface MedicineReimbursement {
    id: string;
    date: string;
    amount: number;
    status: 'Approved' | 'Pending' | 'Rejected';
    reimbursedAmount: number;
}

    