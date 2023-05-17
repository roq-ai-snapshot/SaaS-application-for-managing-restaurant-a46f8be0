export interface OrdersInterface {
  id?: string;
  customer_id?: string;
  restaurant_id?: string;
  status: string;
  total_price: number;
  created_at: Date;
  updated_at: Date;
}
