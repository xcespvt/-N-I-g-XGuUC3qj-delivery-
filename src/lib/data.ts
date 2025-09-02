
import { DollarSign, CheckCircle, Percent, Star, Trophy, Car, Coffee, BatteryCharging, User, FileText, CreditCard, Tag, Shield, Stethoscope, BookOpen, ShoppingBag, Truck, Settings, Palette, Bell, HelpCircle, Phone, MessageSquare, PlayCircle, LogOut, Sun, Utensils, Zap, Clock, Target, Heart, GraduationCap, Languages, Gift, AlertTriangle, Moon, Map, TrendingUp, CloudRain, Receipt } from 'lucide-react';
import type { Delivery, EarningData, Hub, HotZone, Stat, Settlement, Gig, Incentive, Document, SubscriptionHistoryItem, SubscriptionStats, Checkup, PastCheckup, Course, MerchandiseItem, MerchandiseOrder, FaqItem, ContactMethod, VideoTutorial, Notification, LeaderboardUser, Achievement, Transaction, BatchOrder, UpcomingAppointment } from './types';

export const weeklyEarnings: EarningData[] = [
  { day: 'Mon', earnings: 450 },
  { day: 'Tue', earnings: 520 },
  { day: 'Wed', earnings: 600 },
  { day: 'Thu', earnings: 480 },
  { day: 'Fri', earnings: 750 },
  { day: 'Sat', earnings: 850 },
  { day: 'Sun', earnings: 700 },
];

const defaultRestaurant = {
    name: 'Default Restaurant',
    address: '123 Food Street, Anytown',
    avatarUrl: 'https://placehold.co/40x40.png',
    distance: 2,
    time: 10
};

const defaultOrderItems = [
    { name: 'Standard Item', quantity: 1, price: 100 }
];

const defaultEarningsBreakdown = {
    basePay: 20,
    distancePay: 50,
    commission: 30,
    membershipBonus: 0,
    petrolIncentive: 0,
    total: 100
};

export const deliveries: Delivery[] = [
  {
    id: 'ORD-001',
    customer: { name: 'Rahul S.', avatarUrl: 'https://placehold.co/40x40.png' },
    destination: 'Apartment 4B, Green View, HSR Layout',
    earnings: 177.00,
    distance: 6.8,
    estimatedTime: 35,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    status: 'In-progress',
    stage: 'Pickup',
    restaurant: {
        name: 'Biryani House',
        address: '123 Food Street, Koramangala',
        avatarUrl: 'https://placehold.co/40x40.png',
        distance: 2.3,
        time: 15
    },
    orderItems: [
        { name: 'Chicken Biryani', quantity: 1, price: 250 },
        { name: 'Coke', quantity: 2, price: 40 }
    ],
    earningsBreakdown: {
        basePay: 14.00,
        distancePay: 54.40,
        commission: 73.60,
        membershipBonus: 20.00,
        petrolIncentive: 15.00,
        total: 177.00
    }
  },
  {
    id: 'ORD-002',
    customer: { name: 'Bob Williams', avatarUrl: 'https://placehold.co/40x40.png' },
    destination: '789 Pine St, Metropolis',
    earnings: 150,
    distance: 5.1,
    estimatedTime: 25,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    status: 'Delivered',
    stage: 'Complete',
    restaurant: { ...defaultRestaurant, name: 'Pizza Palace' },
    orderItems: [{ name: 'Margherita Pizza', quantity: 1, price: 300 }],
    earningsBreakdown: { basePay: 20, distancePay: 100, commission: 30, total: 150 }
  },
  {
    id: 'ORD-003',
    customer: { name: 'Charlie Brown', avatarUrl: 'https://placehold.co/40x40.png' },
    destination: '101 Maple Dr, Gotham',
    earnings: 97,
    distance: 2.5,
    estimatedTime: 18,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    status: 'Delivered',
    stage: 'Complete',
    restaurant: { ...defaultRestaurant, name: 'Sushi Central' },
    orderItems: [{ name: 'California Roll', quantity: 2, price: 150 }],
    earningsBreakdown: { basePay: 15, distancePay: 62, commission: 20, total: 97 }
  },
  {
    id: 'ORD-004',
    customer: { name: 'Diana Prince', avatarUrl: 'https://placehold.co/40x40.png' },
    destination: '222 Birch Ln, Star City',
    earnings: 0,
    distance: 4.0,
    estimatedTime: 22,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
    status: 'Cancelled',
    stage: 'Cancelled',
    restaurant: { ...defaultRestaurant, name: 'Taco Town' },
    orderItems: [{ name: 'Beef Taco', quantity: 3, price: 90 }],
    earningsBreakdown: { basePay: 0, distancePay: 0, commission: 0, total: 0 }
  },
];

export const batchOrder: BatchOrder = {
    id: 'BATCH-001',
    orderCount: 4,
    dropPoints: 3,
    endLocation: 'Kek Building, Lmao Avenue, 13th Street, Astal...',
    deliveryEarnings: 1580.50,
    totalTips: 450.00,
    totalDistance: 11.3,
    totalEstEarnings: 2030.50,
};

export const hubs: Hub[] = [
    {
        id: 'hub-1',
        name: 'Koramangala Hub',
        address: '123, 1st Main, 5th Block, Koramangala',
        distance: 1.5,
        operatingHours: '24/7',
        facilities: [
            { name: 'Parking', icon: Car },
            { name: 'Rest Area', icon: Coffee },
            { name: 'Charging', icon: BatteryCharging }
        ]
    },
    {
        id: 'hub-2',
        name: 'Indiranagar Hub',
        address: '456, 12th Main, Indiranagar',
        distance: 3.2,
        operatingHours: '9 AM - 9 PM',
        facilities: [
            { name: 'Parking', icon: Car },
            { name: 'Rest Area', icon: Coffee }
        ]
    },
    {
        id: 'hub-3',
        name: 'HSR Layout Hub',
        address: '789, 27th Main, HSR Layout',
        distance: 4.0,
        operatingHours: '9 AM - 6 PM',
        facilities: [
            { name: 'Parking', icon: Car },
            { name: 'Charging', icon: BatteryCharging }
        ]
    }
];

export const hotZones: HotZone[] = [
    { name: 'Koramangala', distance: 1.5, orders: 12, earning: '₹600-800' },
    { name: 'Indiranagar', distance: 3.2, orders: 8, earning: '₹500-700' },
    { name: 'HSR Layout', distance: 4.0, orders: 10, earning: '₹400-600' },
];

export const earningsStats: Stat[] = [
    {
        title: "Total Earnings",
        value: "₹1,23,456",
        description: "+20.1% from last month",
        icon: DollarSign,
    },
    {
        title: "Total Deliveries",
        value: "152",
        description: "+15 since last month",
        icon: CheckCircle,
    },
    {
        title: "Acceptance Rate",
        value: "92%",
        description: "Maintained from last month",
        icon: Percent,
    },
    {
        title: "Customer Rating",
        value: "4.9/5",
        description: "Based on 120 ratings",
        icon: Star,
    },
];

export const settlements: Settlement[] = [
  {
    id: '#SET123456',
    date: 'May 10, 2025',
    time: '14:32',
    amount: 1200,
    status: 'Completed',
  },
  {
    id: '#SET123455',
    date: 'May 8, 2025',
    time: '19:15',
    amount: 950,
    status: 'Completed',
  },
  {
    id: '#SET123454',
    date: 'May 5, 2025',
    time: '12:08',
    amount: 1500,
    status: 'Completed',
  },
];

export const recentTransactions: Transaction[] = [
  { id: 1, date: 'May 1, 2025', amount: 130, type: 'Order Completed', status: 'Credited' },
  { id: 2, date: 'May 2, 2025', amount: 140, type: 'Order Completed', status: 'Credited' },
  { id: 3, date: 'May 3, 2025', amount: 150, type: 'Order Completed', status: 'Credited' },
  { id: 4, date: 'May 4, 2025', amount: 160, type: 'Order Completed', status: 'Credited' },
];

export const allTransactions: Transaction[] = [
  ...recentTransactions,
  { id: 5, date: 'Apr 30, 2025', amount: 125, type: 'Order Completed', status: 'Credited' },
  { id: 6, date: 'Apr 29, 2025', amount: 110, type: 'Order Completed', status: 'Credited' },
  { id: 7, date: 'Apr 28, 2025', amount: 200, type: 'Incentive', status: 'Credited' },
  { id: 8, date: 'Apr 27, 2025', amount: 145, type: 'Order Completed', status: 'Credited' },
  { id: 9, date: 'Apr 26, 2025', amount: 135, type: 'Order Completed', status: 'Credited' },
  { id: 10, date: 'Apr 25, 2025', amount: 155, type: 'Order Completed', status: 'Credited' },
];

export const monthlySummary = {
    totalEarnings: '12383',
    comparison: '+18% vs April',
    earningsBreakdown: {
        deliveryCharges: '8558',
        incentives: '2500',
        referralBonuses: '1000',
        membershipBonus: '200',
        petrolIncentive: '200',
        tds: '50',
        penalties: '25',
    }
};

export const floatingCashDetails = {
    floatingCash: 1850,
    cashLimit: 2500,
    todayCollection: 850,
    todayDeposits: 0,
};

export const profileData = {
  name: "Rahul Singh",
  phone: "+91 98765 43210",
  rating: 4.2,
  avatarUrl: "https://placehold.co/100x100.png",
  stats: [
    { value: "112", label: "Deliveries" },
    { value: "98%", label: "Completion" },
    { value: "3", label: "Months" },
  ],
  performance: {
    onTimeDelivery: 96,
    customerRating: 4.2,
    orderAcceptance: 92,
  },
  accountSettings: [
    { label: "Personal Information", icon: User, href: "/profile/personal-information" },
    { label: "Documents", icon: FileText, href: "/profile/documents" },
    { label: "Bank Account", icon: CreditCard, href: "/profile/bank-account" },
  ],
  partnerBenefits: [
    { label: "Daily Subscription", icon: Tag, href: "/profile/daily-subscription", badge: "New", badgeColor: "blue" },
    { label: "Insurance", icon: Shield, badge: "Active", badgeColor: "green", href: "/profile/insurance" },
    { label: "Medical Check-up", icon: Stethoscope, href: '/profile/medical-check-up' },
    { label: "Medicine Reimbursement", icon: Receipt, href: "/profile/medicine-reimbursement" },
    { label: "Free Educational Courses", icon: BookOpen, badge: "2 New", badgeColor: "blue", href: "/profile/educational-courses" },
  ],
  store: [
    { label: "Browse Merchandise", icon: ShoppingBag, href: "/profile/merchandise" },
    { label: "Track Orders", icon: Truck, href: "/profile/track-orders" },
  ],
  appSettings: [
    { label: "Dark Mode", icon: Palette, isSwitch: true },
    { label: "Notification Settings", icon: Bell, href: "/profile/notification-settings" },
  ],
  helpAndSupport: [
    { label: "Help & Support", icon: HelpCircle, href: "/profile/help-and-support" },
  ],
};

export const gigs: Gig[] = [
  { id: 'shift-1', time: '09:00 AM - 01:00 PM' },
  { id: 'shift-2', time: '01:00 PM - 05:00 PM' },
  { id: 'shift-3', time: '05:00 PM - 09:00 PM' },
  { id: 'shift-4', time: '09:00 PM - 01:00 AM' },
];

export const incentives: Incentive[] = [
  {
    id: 'weekend-warrior',
    title: 'Weekend Warrior',
    description: 'Complete 15 deliveries this weekend',
    reward: 500,
    progress: 40,
    deadline: 'Sunday, 11:59 PM',
    icon: Zap,
    iconBg: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'peak-hour-hero',
    title: 'Peak Hour Hero',
    description: 'Complete 8 deliveries during lunch hours',
    reward: 300,
    progress: 75,
    deadline: 'Today, 3:00 PM',
    icon: Clock,
    iconBg: 'bg-orange-100 text-orange-600',
  },
  {
    id: 'monthly-milestone',
    title: 'Monthly Milestone',
    description: 'Complete 100 deliveries this month',
    reward: 1500,
    progress: 65,
    deadline: 'May 31, 11:59 PM',
    icon: Target,
    iconBg: 'bg-green-100 text-green-600',
  },
  {
    id: 'referral-bonus',
    title: 'Referral Bonus',
    description: 'Refer a friend who completes 10 deliveries',
    reward: 800,
    progress: 0,
    deadline: 'No deadline',
    icon: Star,
    iconBg: 'bg-purple-100 text-purple-600',
  },
];

export const documents: Document[] = [
  {
    id: 'aadhaar',
    title: 'Aadhar Card',
    description: 'Front and back side of your Aadhar card',
    status: 'Verified',
    uploadedDate: '15 Apr 2023',
    expiryDate: 'N/A',
  },
  {
    id: 'pan',
    title: 'PAN Card',
    description: 'Clear photo of your PAN card',
    status: 'Verified',
    uploadedDate: '15 Apr 2023',
    expiryDate: 'N/A',
  },
  {
    id: 'license',
    title: 'Driving License',
    description: 'Front and back side of your driving license',
    status: 'Pending',
    uploadedDate: '20 Apr 2023',
    expiryDate: '19 Apr 2028',
  },
  {
    id: 'rc',
    title: 'Vehicle RC',
    description: 'Registration certificate of your vehicle',
    status: 'Rejected',
    uploadedDate: '16 Apr 2023',
    expiryDate: '17 Apr 2028',
    rejectionReason: 'Document is not clearly visible. Please upload a clearer image.',
  },
  {
    id: 'insurance',
    title: 'Vehicle Insurance',
    description: 'Valid insurance policy of your vehicle',
    status: 'Not Uploaded',
  },
];

export const subscriptionHistory: SubscriptionHistoryItem[] = [
  { id: 'sub1', date: 'May 7, 2025', description: 'Active for 24 hours', amount: 17.70, status: 'Paid' },
  { id: 'sub2', date: 'May 6, 2025', description: 'Active for 24 hours', amount: 17.70, status: 'Paid' },
  { id: 'sub3', date: 'May 5, 2025', description: 'Active for 24 hours', amount: 17.70, status: 'Paid' },
];

export const subscriptionStats: SubscriptionStats = {
  extraEarnings: 240,
  priorityOrders: 12,
  subscribedDays: 8,
};

export const availableCheckups: Checkup[] = [
    {
        id: 'basic',
        name: 'Basic Health Check-up',
        description: 'Blood pressure, BMI, general health',
        icon: Heart,
    },
    {
        id: 'eye',
        name: 'Eye Check-up',
        description: 'Vision test and eye health assessment',
        icon: Heart,
    },
    {
        id: 'dental',
        name: 'Dental Check-up',
        description: 'Basic dental examination and cleaning',
        icon: Heart,
    },
];

export const pastCheckups: PastCheckup[] = [
    {
        id: 'past-basic',
        name: 'Basic Health Check-up',
        date: 'January 15, 2025',
        status: 'Completed',
        icon: Stethoscope,
    },
    {
        id: 'past-eye',
        name: 'Eye Check-up',
        date: 'October 10, 2024',
        status: 'Completed',
        icon: Stethoscope,
    },
];

export const upcomingAppointment: UpcomingAppointment = {
  id: 'appoint-1',
  centerName: 'Apollo Clinic, Koramangala',
  address: '1st Floor, #100, 17th Main Rd, 5th Block, Koramangala',
  date: 'Friday, May 24, 2025',
  time: '11:00 AM - 11:30 AM',
  checkups: ['Basic Health', 'Eye Test', 'Dental']
};

export const courses: Course[] = [
  {
    id: 'eng-comm',
    title: 'English Communication',
    subtitle: 'Improve your customer interaction skills',
    description: 'Learn how to communicate effectively with customers in English. This course covers basic greetings, handling customer queries, and more.',
    icon: Languages,
    duration: '2 hours',
    status: 'Available',
    isNew: true,
  },
  {
    id: 'fin-lit',
    title: 'Financial Literacy',
    subtitle: 'Manage your earnings effectively',
    description: 'Learn how to save, invest, and manage your earnings. This course covers budgeting, saving strategies, and basic investment concepts.',
    icon: FileText,
    duration: '3 hours',
    status: 'Available',
    isNew: true,
  },
  {
    id: 'road-safety',
    title: 'Road Safety',
    subtitle: 'Learn safe driving practices',
    description: 'This course covers traffic rules, defensive driving techniques, and how to handle various road conditions safely.',
    icon: GraduationCap,
    status: 'InProgress',
    progress: 65,
  },
  {
    id: 'crevings-orient',
    title: 'Crevings Orientation',
    subtitle: 'Introduction to Crevings delivery',
    description: 'This course covers the basics of Crevings delivery operations, app usage, and partner policies.',
    icon: GraduationCap,
    status: 'Completed',
    completedDate: 'April 15, 2025',
  },
];

export const merchandise: MerchandiseItem[] = [
  {
    id: 't-shirt',
    name: 'Crevings Delivery T-Shirt',
    category: 'Apparel',
    price: 'FREE',
    tag: 'Essential',
    imageUrls: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    imageHint: 'delivery t-shirt',
  },
  {
    id: 'raincoat',
    name: 'Crevings Raincoat',
    category: 'Weather',
    price: 'FREE',
    tag: 'Seasonal',
    imageUrls: ['https://placehold.co/600x600.png'],
    imageHint: 'delivery raincoat',
  },
  {
    id: 'helmet',
    name: 'Crevings Helmet',
    category: 'Safety',
    price: 'FREE',
    tag: 'Required',
    imageUrls: ['https://placehold.co/600x600.png'],
    imageHint: 'delivery helmet',
  },
  {
    id: 'jersey',
    name: 'Crevings Jersey',
    category: 'Apparel',
    price: 'FREE',
    imageUrls: ['https://placehold.co/600x600.png'],
    imageHint: 'delivery jersey',
  },
  {
    id: 'delivery-bag',
    name: 'Crevings Delivery Bag',
    category: 'Accessory',
    price: 'FREE',
    tag: 'Essential',
    imageUrls: ['https://placehold.co/600x600.png'],
    imageHint: 'delivery bag',
  },
  {
    id: 'phone-mount',
    name: 'Crevings Phone Mount',
    category: 'Accessory',
    price: 'FREE',
    imageUrls: ['https://placehold.co/600x600.png'],
    imageHint: 'phone mount',
  },
];

export const merchandiseOrders: MerchandiseOrder[] = [
  {
    id: 'merch-ord-1',
    productName: 'Crevings Helmet',
    orderId: 'ORD23456',
    date: 'June 2, 2023',
    status: 'In Transit',
    imageUrl: 'https://placehold.co/200x200.png',
    imageHint: 'delivery helmet'
  },
  {
    id: 'merch-ord-2',
    productName: 'Crevings Raincoat',
    orderId: 'ORD34567',
    date: 'July 10, 2023',
    status: 'Processing',
    imageUrl: 'https://placehold.co/200x200.png',
    imageHint: 'delivery raincoat'
  },
  {
    id: 'merch-ord-3',
    productName: 'Crevings Delivery Bag',
    orderId: 'ORD12345',
    date: 'May 15, 2023',
    status: 'Delivered',
    imageUrl: 'https://placehold.co/200x200.png',
    imageHint: 'delivery bag'
  }
];

export const faqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How do I update my bank account details?',
    answer: 'You can update your bank account details in the "Profile" section of the app. Go to Profile > Bank Account and follow the instructions to add or update your account.',
  },
  {
    id: 'faq-2',
    question: 'What should I do if a customer is not available at the delivery location?',
    answer: 'Please try to contact the customer via the app. If they are unreachable, wait for 10 minutes at the location. After that, you can mark the order as undelivered and contact support for further instructions.',
  },
  {
    id: 'faq-3',
    question: 'How do I report an issue with an order?',
    answer: 'You can report an issue directly from the order details screen. Look for the "Report Issue" button and select the relevant problem. You can also contact support for immediate assistance.',
  },
  {
    id: 'faq-4',
    question: 'How are my earnings calculated?',
    answer: 'Your earnings are calculated based on base pay, distance traveled, and any applicable bonuses or incentives. You can view a detailed breakdown for each order in your earnings history.',
  },
  {
    id: 'faq-5',
    question: 'What happens if I have an accident while delivering?',
    answer: 'Your safety is our priority. First, ensure you are safe and seek medical attention if needed. Then, report the incident to us through the emergency contact option in the app. You are covered by our partner insurance policy.',
  },
  {
    id: 'faq-6',
    question: 'How do I change my working area?',
    answer: 'Your working area is determined by your current location when you go online. To work in a different area, simply travel to that location before you start your gig.',
  },
  {
    id: 'faq-7',
    question: 'Why was my incentive not credited?',
    answer: 'Incentives are usually credited within 24-48 hours after the conditions are met. If you believe there is an error, please contact support with the details of the incentive and we will investigate.',
  },
];

export const contactMethods: ContactMethod[] = [
  {
    id: 'call',
    title: 'Call Customer Care',
    description: 'Get immediate assistance from our support team.',
    icon: Phone,
  },
  {
    id: 'chat',
    title: 'Chat with Support',
    description: 'Chat with a live agent for any queries.',
    icon: MessageSquare,
    badge: 'Online',
    badgeColor: 'green',
    href: '/profile/help-and-support/chat'
  },
];

export const videoTutorials: VideoTutorial[] = [
  {
    id: 'video-1',
    title: 'How to use the Crevings Partner App',
    description: 'A complete walkthrough of the app features and functionalities.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'mobile app tutorial',
    duration: '5:30',
    videoUrl: 'https://youtube.com',
  },
  {
    id: 'video-2',
    title: 'Handling Customer Interactions',
    description: 'Learn best practices for providing excellent customer service.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'customer service',
    duration: '3:45',
    videoUrl: 'https://youtube.com',
  },
  {
    id: 'video-3',
    title: 'Understanding Your Earnings',
    description: 'A detailed explanation of how your earnings are calculated.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'money earnings',
    duration: '4:15',
    videoUrl: 'https://youtube.com',
  },
];

export const notifications: Notification[] = [
  {
    id: 1,
    title: 'Payout Successful',
    description: 'Your weekly payout of ₹4,580 has been transferred to your bank account.',
    time: '2 hours ago',
    read: false,
    icon: DollarSign,
  },
  {
    id: 2,
    title: 'Weekend Bonus Achieved!',
    description: 'Congratulations! You\'ve earned a ₹500 bonus for completing 15 weekend deliveries.',
    time: '1 day ago',
    read: false,
    icon: Gift,
  },
  {
    id: 3,
    title: 'New Course Available',
    description: 'Enroll in the new "Advanced Customer Service" course for free.',
    time: '3 days ago',
    read: true,
    icon: BookOpen,
  },
  {
    id: 4,
    title: 'Document expiring soon',
    description: 'Your Vehicle Insurance is expiring in 15 days. Please upload a new one.',
    time: '4 days ago',
    read: true,
    icon: AlertTriangle,
  },
  {
    id: 5,
    title: 'New Merchandise Added',
    description: 'Check out the new Crevings winter jacket in the merchandise store.',
    time: '1 week ago',
    read: true,
    icon: ShoppingBag,
  },
];

export const leaderboardData: LeaderboardUser[] = [
  { id: 'user-1', rank: 1, name: 'Priya Patel', avatarUrl: 'https://placehold.co/40x40.png', score: 215 },
  { id: 'user-2', rank: 2, name: 'Amit Kumar', avatarUrl: 'https://placehold.co/40x40.png', score: 203 },
  { id: 'user-3', rank: 3, name: 'Sneha Sharma', avatarUrl: 'https://placehold.co/40x40.png', score: 198 },
  { id: 'user-4', rank: 4, name: 'Vikram Singh', avatarUrl: 'https://placehold.co/40x40.png', score: 185 },
  { id: 'user-5', rank: 5, name: 'Anjali Gupta', avatarUrl: 'https://placehold.co/40x40.png', score: 172 },
  { id: 'user-12', rank: 12, name: 'Rahul Singh', avatarUrl: 'https://placehold.co/40x40.png', score: 141, isCurrentUser: true },
  { id: 'user-6', rank: 6, name: 'Deepak Yadav', avatarUrl: 'https://placehold.co/40x40.png', score: 169 },
  { id: 'user-7', rank: 7, name: 'Neha Reddy', avatarUrl: 'https://placehold.co/40x40.png', score: 165 },
];

export const achievementsData: Achievement[] = [
    { id: 'fast-starter', name: 'Fast Starter', description: 'Complete 10 deliveries in your first week.', icon: Zap, achieved: true },
    { id: 'rating-star', name: 'Rating Star', description: 'Maintain a 4.8+ rating over 50 reviews.', icon: Star, achieved: true },
    { id: 'weekend-warrior', name: 'Weekend Warrior', description: 'Complete 25 deliveries in a single weekend.', icon: Trophy, achieved: true },
    { id: 'city-explorer', name: 'City Explorer', description: 'Deliver to 5 different city zones.', icon: Map, achieved: true },
    { id: 'rain-or-shine', name: 'Rain or Shine', description: 'Complete 10 deliveries during rainy weather.', icon: CloudRain, achieved: true },
    { id: 'safe-driver', name: 'Safety Shield', description: 'Complete 100 consecutive deliveries with no issues.', icon: Shield, achieved: false, progress: 78 },
    { id: 'night-owl', name: 'Night Owl', description: 'Complete 50 deliveries after 10 PM.', icon: Moon, achieved: false, progress: 45 },
    { id: 'top-earner', name: 'Top Earner', description: 'Earn over ₹10,000 in a single week.', icon: TrendingUp, achieved: false, progress: 60 },
    { id: 'loyal-partner', name: 'Loyal Partner', description: 'Complete 1 year with Crevings.', icon: Heart, achieved: false, progress: 25 },
];
