"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe";
import { X, CreditCard, Lock, Loader2, ShieldCheck, CheckCircle, AlertCircle } from "lucide-react";

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
  const [paymentSuccess, setPaymentSuccess] = useState(false);

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
      setPaymentSuccess(true);
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 2000);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#1f2937',
        fontFamily: 'system-ui, sans-serif',
        '::placeholder': {
          color: '#9ca3af',
        },
        iconColor: '#6b7280',
      },
      invalid: {
        color: '#ef4444',
        iconColor: '#ef4444',
      },
      complete: {
        color: '#059669',
        iconColor: '#059669',
      },
    },
  };

  if (paymentSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Thanh toán thành công!
        </h3>
        <p className="text-gray-600 mb-4">
          Bạn có thể tải xuống tài liệu ngay bây giờ.
        </p>
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-2 text-sm text-gray-600">Đang chuyển hướng...</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 animate-in slide-in-from-top duration-300">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Đơn hàng của bạn
            </h3>
          </div>
          
          <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200">
            <div className="flex gap-4">
              {document.image && (
                <img 
                  src={document.image}
                  alt={document.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {document.title}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    PDF
                  </span>
                  <span className="text-sm text-gray-600">
                    Tải xuống ngay
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Giá tài liệu:</span>
              <span className="font-semibold text-gray-900">${document.price}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Phí xử lý:</span>
              <span className="font-semibold text-green-600">Miễn phí</span>
            </div>
            <div className="border-t border-gray-300 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">Tổng cộng:</span>
                <span className="text-xl font-bold text-gray-900">${document.price}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 bg-white p-3 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>Thanh toán an toàn với mã hóa SSL 256-bit</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Lock className="w-4 h-4 text-green-600" />
            </div>
            <h4 className="font-bold text-gray-900">Thông tin thanh toán</h4>
          </div>
          
          <div className="bg-white p-6 border-2 border-gray-200 rounded-xl focus-within:border-gray-400 transition-colors">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Thông tin thẻ
            </label>
            <CardElement options={cardElementOptions} />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-blue-900 mb-1">Bảo mật thanh toán</h5>
                <p className="text-sm text-blue-700">
                  Thông tin thẻ của bạn được bảo vệ bằng mã hóa SSL 256-bit và tuân thủ tiêu chuẩn PCI DSS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold"
        >
          Hủy thanh toán
        </button>
        <button
          type="submit"
          disabled={!stripe || processing || !clientSecret}
          className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
        >
          {processing ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Đang xử lý...
            </>
          ) : (
            <>
              <Lock size={16} />
              Thanh toán $${document.price}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

// Main modal component
export function PaymentModal({ isOpen, onClose, onSuccess, document }: PaymentModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black transition-opacity duration-300 flex items-center justify-center z-50 ${
      isVisible ? "bg-opacity-60" : "bg-opacity-0"
    }`}>
      <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
        isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Thanh toán an toàn
              </h2>
              <p className="text-sm text-gray-600">
                Hoàn tất mua hàng của bạn
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          <Elements stripe={getStripe()}>
            <PaymentForm 
              document={document} 
              onClose={handleClose} 
              onSuccess={onSuccess}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
}
