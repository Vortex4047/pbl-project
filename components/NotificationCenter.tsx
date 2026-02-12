import React, { useState } from 'react';
import { Bell, X, AlertTriangle, CheckCircle, Info, TrendingUp } from 'lucide-react';

interface Notification {
  id: string;
  type: 'warning' | 'success' | 'info' | 'alert';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Budget Alert',
      message: 'You\'ve spent 85% of your Dining budget',
      time: '5 min ago',
      read: false
    },
    {
      id: '2',
      type: 'success',
      title: 'Goal Milestone',
      message: 'You\'re 50% towards your Japan Trip goal!',
      time: '1 hour ago',
      read: false
    },
    {
      id: '3',
      type: 'info',
      title: 'Weekly Report',
      message: 'Your spending summary is ready',
      time: '2 hours ago',
      read: true
    },
    {
      id: '4',
      type: 'alert',
      title: 'Unusual Activity',
      message: 'Large transaction detected: $450 at Amazon',
      time: '1 day ago',
      read: true
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle size={18} className="text-yellow-400" />;
      case 'success': return <CheckCircle size={18} className="text-green-400" />;
      case 'alert': return <TrendingUp size={18} className="text-red-400" />;
      default: return <Info size={18} className="text-cyan-400" />;
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-200 hover:text-white transition-colors hover:bg-white/10 rounded-full"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-16 right-0 z-50 w-96 max-h-[600px] glass-panel-blue border-2 border-white/30 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-top-4 fade-in duration-300">
            {/* Header */}
            <div className="p-4 border-b border-white/20 bg-white/10 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-white">Notifications</h3>
                <p className="text-xs text-gray-300">{unreadCount} unread</p>
              </div>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-cyan-300 hover:text-white transition-colors"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={18} className="text-gray-300" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto max-h-[500px]">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <Bell size={48} className="mx-auto mb-2 opacity-50" />
                  <p>No notifications</p>
                </div>
              ) : (
                notifications.map((notif, index) => (
                  <div
                    key={notif.id}
                    className={`p-4 border-b border-white/10 hover:bg-white/5 transition-all cursor-pointer group ${
                      !notif.read ? 'bg-cyan-500/10' : ''
                    }`}
                    onClick={() => markAsRead(notif.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        notif.type === 'warning' ? 'bg-yellow-500/20' :
                        notif.type === 'success' ? 'bg-green-500/20' :
                        notif.type === 'alert' ? 'bg-red-500/20' :
                        'bg-cyan-500/20'
                      }`}>
                        {getIcon(notif.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium text-white text-sm">{notif.title}</h4>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notif.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded"
                          >
                            <X size={14} className="text-gray-400" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-300 mt-1">{notif.message}</p>
                        <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
                      </div>
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0 mt-2"></div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
