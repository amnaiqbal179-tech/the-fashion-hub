'use client';

import { useState, useEffect } from 'react';
import { 
  ShoppingBasket, 
  RefreshCw, 
  Eye, 
  Trash2, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  MapPin, 
  User, 
  Clock, 
  CreditCard,
  MessageSquare
} from 'lucide-react';

interface OrderItem {
  id: string;
  productName?: string;
  product?: {
    name: string;
    images?: string[];
  };
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  email?: string;
  phone?: string;
  address?: string;
  city: string;
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  paymentMethod?: string;
  createdAt: string;
  orderItems?: OrderItem[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        setError('Failed to load orders from API');
      }
    } catch (err) {
      console.error('Failed to fetch orders', err);
      setError('An error occurred while fetching orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const showSuccessMessage = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(''), 4000);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      setUpdatingId(id);
      setError('');

      const res = await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        showSuccessMessage(`Order #${id.slice(-6)} status updated to ${newStatus}`);
        fetchOrders();
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to update order status');
      }
    } catch (err) {
      console.error('Failed to update status', err);
      setError('An error occurred while updating status');
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteOrder = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;

    try {
      setDeletingId(id);
      setError('');

      const res = await fetch(`/api/orders?id=${id}`, { 
        method: 'DELETE' 
      });

      if (res.ok) {
        showSuccessMessage('Order deleted successfully');
        if (selectedOrder?.id === id) setSelectedOrder(null);
        fetchOrders();
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to delete order');
      }
    } catch (err) {
      console.error('Failed to delete order', err);
      setError('An error occurred while deleting order');
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-50 text-amber-700 border-amber-200 focus:ring-amber-400';
      case 'CONFIRMED':
        return 'bg-blue-50 text-blue-700 border-blue-200 focus:ring-blue-400';
      case 'SHIPPED':
        return 'bg-purple-50 text-purple-700 border-purple-200 focus:ring-purple-400';
      case 'DELIVERED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 focus:ring-emerald-400';
      case 'CANCELLED':
        return 'bg-red-50 text-red-700 border-red-200 focus:ring-red-400';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans p-4 sm:p-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ShoppingBasket className="w-6 h-6 text-amber-500" /> Orders Management
          </h1>
          <p className="text-slate-500 text-xs mt-1">View, track, and manage all incoming store orders</p>
        </div>
        <button
          onClick={fetchOrders}
          disabled={loading}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-500' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError('')} className="text-red-400 hover:text-red-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center items-center gap-2 text-slate-400 text-xs">
            <RefreshCw className="w-5 h-5 animate-spin text-amber-500" />
            <span>Loading orders...</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">No orders found in database.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-5">Order ID / Date</th>
                  <th className="py-3.5 px-5">Customer</th>
                  <th className="py-3.5 px-5">Total Amount</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <p className="font-bold text-slate-900 font-mono text-[11px] truncate max-w-[140px]" title={order.id}>
                        #{order.id}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}
                      </p>
                    </td>
                    <td className="py-3.5 px-5">
                      <p className="font-bold text-slate-900 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        {order.customerName}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{order.city || 'N/A'}</p>
                    </td>
                    <td className="py-3.5 px-5 font-black text-slate-900 whitespace-nowrap">
                      PKR {order.totalAmount?.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <select
                        value={order.status}
                        disabled={updatingId === order.id}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border outline-none cursor-pointer transition ${getStatusBadgeClass(order.status)}`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteOrder(order.id)}
                          disabled={deletingId === order.id}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition cursor-pointer disabled:opacity-50"
                          title="Delete Order"
                        >
                          {deletingId === order.id ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin text-red-500" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <ShoppingBasket className="w-5 h-5 text-amber-500" /> Order Details
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">ID: #{selectedOrder.id}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Customer & Shipping Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Customer Info</span>
                <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-500" /> {selectedOrder.customerName}
                </p>
                {selectedOrder.phone && (
                  <p className="text-xs text-slate-600 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> {selectedOrder.phone}
                  </p>
                )}
                {selectedOrder.phone && (
                  <a
                    href={`https://wa.me/${selectedOrder.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 mt-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Contact on WhatsApp
                  </a>
                )}
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Shipping & Payment</span>
                <p className="text-xs text-slate-700 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" /> 
                  <span>{selectedOrder.address ? `${selectedOrder.address}, ` : ''}{selectedOrder.city}</span>
                </p>
                <p className="text-xs text-slate-600 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-slate-400" /> {selectedOrder.paymentMethod || 'Cash on Delivery (COD)'}
                </p>
              </div>
            </div>

            {/* Purchased Items List */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Ordered Items</h3>
              {!selectedOrder.orderItems || selectedOrder.orderItems.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No specific items details provided.</p>
              ) : (
                <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
                  {selectedOrder.orderItems.map((item) => (
                    <div key={item.id} className="p-3.5 bg-slate-50/50 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-900">{item.productName || item.product?.name || 'Suit Product'}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-slate-900">
                        PKR {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Order Value</span>
              <span className="text-lg font-black text-amber-600">PKR {selectedOrder.totalAmount?.toLocaleString()}</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}