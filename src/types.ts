export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'cosmetics' | 'jewelry' | 'toys';
  image: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  timestamp: any;
}
