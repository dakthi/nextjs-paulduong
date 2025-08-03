"use client";

import { useState } from "react";
import { X, CreditCard, Lock } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
}

export function PaymentModal({ isOpen, onClose, document }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // TODO: Implement Stripe payment processing
    setTimeout(() => {
      setProcessing(false);
      onClose();
      // Show success message or redirect
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
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

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Order Summary */}
          <div className="p-6 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Đơn hàng của bạn
            </h3>
            
            <div className="flex gap-4 mb-6">
              <img 
                src={document.image}
                alt={document.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
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
              <div className="flex justify-between">
                <span className="text-gray-600">Thuế VAT:</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="border-t border-gray-300 pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900">Tổng cộng:</span>
                  <span className="text-lg font-semibold text-gray-900">${document.price}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Bao gồm:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Tải xuống ngay lập tức</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Truy cập trọn đời</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Cập nhật miễn phí</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Hỗ trợ qua email</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Payment Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {/* Payment Method */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Phương thức thanh toán</h4>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex-1 p-3 border rounded-lg flex items-center justify-center gap-2 transition ${
                      paymentMethod === "card" 
                        ? "border-gray-900 bg-gray-50" 
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <CreditCard size={20} />
                    <span className="text-sm font-medium">Thẻ tín dụng</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`flex-1 p-3 border rounded-lg flex items-center justify-center gap-2 transition ${
                      paymentMethod === "paypal" 
                        ? "border-gray-900 bg-gray-50" 
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <span className="text-blue-600 font-bold">PayPal</span>
                  </button>
                </div>
              </div>

              {paymentMethod === "card" && (
                <>
                  {/* Billing Info */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Thông tin thanh toán</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Họ và tên
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                          placeholder="Nguyễn Văn An"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Thông tin thẻ</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Số thẻ
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                          placeholder="1234 1234 1234 1234"
                          maxLength={19}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            MM/YY
                          </label>
                          <input
                            type="text"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                            placeholder="12/25"
                            maxLength={5}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                            placeholder="123"
                            maxLength={4}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Security Notice */}
              <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Lock size={16} />
                  <span>Thanh toán được bảo mật bởi Stripe SSL 256-bit</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Đang xử lý...</span>
                  </div>
                ) : (
                  `Thanh toán $${document.price}`
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Bằng cách thanh toán, bạn đồng ý với{" "}
                <a href="/terms" className="underline hover:no-underline">
                  Điều khoản dịch vụ
                </a>{" "}
                và{" "}
                <a href="/privacy" className="underline hover:no-underline">
                  Chính sách bảo mật
                </a>{" "}
                của chúng tôi.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}