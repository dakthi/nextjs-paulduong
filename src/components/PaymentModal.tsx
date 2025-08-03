"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe";
import { X, CreditCard, Lock, Loader2 } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  document: {
    id: string;
    title: string;
    price: number;
    image?: string;
  };
}

// Payment form component that uses Stripe hooks
function PaymentForm({ document, onClose, onSuccess }: Omit<PaymentModalProps, 'isOpen'>) {
  const stripe = useStripe();
  const elements = useElements();
  const { data: session } = useSession();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // Create payment intent when component mounts
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/payments/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            documentId: document.id,
            amount: document.price,
          }),
        });

        const data = await response.json();
        
        if (response.ok) {
          setClientSecret(data.clientSecret);
        } else {
          setError(data.error || 'Failed to create payment intent');
        }
      } catch (error) {
        setError('Failed to initialize payment');
      }
    };

    if (session?.user && document.id) {
      createPaymentIntent();
    }
  }, [session, document]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements || !clientSecret) {
      setError('Payment system not ready');
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Card element not found');
      setProcessing(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: session?.user.name || '',
            email: session?.user.email || '',
          },
        },
      }
    );

    if (confirmError) {
      setError(confirmError.message || 'Payment failed');
      setProcessing(false);
    } else if (paymentIntent?.status === 'succeeded') {
      setProcessing(false);
      onSuccess?.();
      onClose();
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Đơn hàng của bạn
          </h3>
          
          <div className="flex gap-4 mb-6">
            {document.image && (
              <img 
                src={document.image}
                alt={document.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-2">
                {document.title}
              </h4>
              <p className="text-sm text-gray-600">
                Tài liệu số - Tải xuống ngay
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Giá tài liệu:</span>
              <span className="font-medium">${document.price}</span>
            </div>
            <div className="border-t border-gray-300 pt-3">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-900">Tổng cộng:</span>
                <span className="text-lg font-semibold text-gray-900">${document.price}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Thông tin thanh toán</h4>
          
          <div className="p-4 border border-gray-300 rounded-lg">
            <CardElement options={cardElementOptions} />
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Lock size={16} />
            <span>Thông tin của bạn được bảo mật bằng SSL 256-bit</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={!stripe || processing || !clientSecret}
          className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
        >
          {processing && <Loader2 size={16} className="animate-spin" />}
          {processing ? "Đang xử lý..." : `Thanh toán $${document.price}`}
        </button>
      </div>
    </form>
  );
}

// Main modal component
export function PaymentModal({ isOpen, onClose, onSuccess, document }: PaymentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Thanh toán
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <Elements stripe={getStripe()}>
            <PaymentForm 
              document={document} 
              onClose={onClose} 
              onSuccess={onSuccess}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
}
