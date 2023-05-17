export interface FeedbackInterface {
  id?: string;
  customer_id?: string;
  restaurant_id?: string;
  rating: number;
  comment?: string;
  created_at: Date;
}
