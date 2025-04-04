interface FlutterwaveConfig {
    amount: number;
    email: string;
    name?: string;
    phone_number?: string;
    currency?: string;
  }
  
  interface FlutterwaveResponse {
    status: string;
    message: string;
    data?: {
      link: string;
      [key: string]: any;
    };
  }
  
  interface FlutterwavePlan {
    amount: number;
    currency: string;
    interval: string;
    planId?: string;
  }
  
  // Map plan intervals to their configurations (amounts are in actual currency units, NOT cents)
  export const flutterwavePlanMap: Record<string, FlutterwavePlan> = {
    week: {
      amount: 9.99,
      currency: 'USD',
      interval: 'weekly',
      planId: process.env.FLW_PLAN_WEEKLY,
    },
    month: {
      amount: 39.99,
      currency: 'USD',
      interval: 'monthly',
      planId: process.env.FLW_PLAN_MONTHLY,
    },
    year: {
      amount: 299.99,
      currency: 'USD',
      interval: 'yearly',
      planId: process.env.FLW_PLAN_YEARLY,
    },
  };
  
  // Get plan config from plan type string (e.g. 'month')
  export const getPlanConfigFromType = (planType: string): FlutterwavePlan => {
    const plan = flutterwavePlanMap[planType];
    if (!plan) {
      throw new Error(`Invalid plan type: ${planType}`);
    }
    return plan;
  };
  
  export class FlutterwaveService {
    private static readonly BASE_URL = 'https://api.flutterwave.com/v3';
    private static readonly SECRET_KEY = process.env.FLW_SECRET_KEY;
  
    static async initializePayment(config: FlutterwaveConfig): Promise<FlutterwaveResponse> {
      if (!this.SECRET_KEY) {
        throw new Error('Flutterwave secret key is not configured');
      }
  
      const payload = {
        tx_ref: `tx-${Date.now()}`,
        amount: this.formatAmount(config.amount), // Format amount correctly
        currency: config.currency || 'NGN',
        payment_options: 'card,banktransfer,ussd',
        redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/callback`,
        customer: {
          email: config.email,
          name: config.name || 'Customer',
          phone_number: config.phone_number || '',
        },
        customizations: {
          title: 'Meal Plan Subscription',
          description: 'Payment for meal plan subscription',
          logo: 'https://your-logo-url.com/logo.png',
        },
        meta: {
          source: 'meal-plan-app',
          timestamp: new Date().toISOString(),
        },
      };
  
      try {
        const response = await fetch(`${this.BASE_URL}/payments`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || 'Payment initialization failed');
        }
  
        return data;
      } catch (error) {
        console.error('Flutterwave payment error:', error);
        throw error;
      }
    }
  
    static async verifyTransaction(transactionId: string): Promise<FlutterwaveResponse> {
      if (!this.SECRET_KEY) {
        throw new Error('Flutterwave secret key is not configured');
      }
  
      try {
        const response = await fetch(
          `${this.BASE_URL}/transactions/${transactionId}/verify`,
          {
            headers: {
              Authorization: `Bearer ${this.SECRET_KEY}`,
            },
          }
        );
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || 'Transaction verification failed');
        }
  
        return data;
      } catch (error) {
        console.error('Flutterwave verification error:', error);
        throw error;
      }
    }
  
    // Format amount to integer for API (e.g., 9.99 → 999)
    static formatAmount(amount: number): number {
      return Math.round(amount * 100);
    }
  }
  
  // ======= PUBLIC HELPER FUNCTIONS ======= //
  
  export const initializePayment = async ({
    amount,
    email,
    name,
    phone_number,
    currency = 'NGN',
  }: FlutterwaveConfig) => {
    return FlutterwaveService.initializePayment({
      amount,
      email,
      name,
      phone_number,
      currency,
    });
  };
  
  export const verifyPayment = async (transactionId: string) => {
    return FlutterwaveService.verifyTransaction(transactionId);
  };
  
  export const formatAmount = (amount: number) => {
    return FlutterwaveService.formatAmount(amount);
  };
  
  // Get full payment config object from a plan type
  export const createPaymentConfig = (
    planType: string,
    email: string,
    name?: string
  ) => {
    const plan = getPlanConfigFromType(planType);
  
    return {
      amount: plan.amount,
      currency: plan.currency,
      email,
      name,
      meta: {
        plan_type: planType,
        interval: plan.interval,
        plan_id: plan.planId,
      },
    };
  };
  