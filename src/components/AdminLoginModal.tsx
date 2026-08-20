import React, { useState } from 'react';
import { X, Lock, ShieldCheck, KeyRound, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [pinCode, setPinCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pinCode.trim().toLowerCase();
    
    // Accept standard staff PINs: '1800', 'vnpt', 'admin', '2026'
    if (cleanPin === '1800' || cleanPin === 'vnpt' || cleanPin === 'admin' || cleanPin === '2026') {
      setErrorMsg('');
      setPinCode('');
      onLoginSuccess();
    } else {
      setErrorMsg('Mã PIN hoặc mật khẩu không chính xác! (Mã mặc định: 1800)');
    }
  };

  const handleQuickFill = (code: string) => {
    setPinCode(code);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150" id="admin-login-modal">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner border border-sky-100">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            Cổng Quản Trị & Nhân Viên Cần Thơ
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Dành cho Nhân viên kinh doanh VinaPhone Cần Thơ, Cán bộ Đoàn & Ban quản trị chiến dịch
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Nhập Mã PIN / Mật Khẩu Quản Trị:</span>
              <span className="text-[11px] text-sky-600 font-semibold cursor-pointer" onClick={() => handleQuickFill('1800')}>
                Mã mẫu: 1800
              </span>
            </label>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                required
                value={pinCode}
                onChange={(e) => {
                  setPinCode(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="Nhập mã PIN (VD: 1800)"
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-300 focus:border-sky-500 rounded-2xl text-sm font-mono tracking-widest text-slate-900 focus:bg-white focus:outline-none transition shadow-inner"
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {errorMsg && (
              <div className="mt-2 text-xs text-amber-800 bg-amber-50 p-2 rounded-xl border border-amber-200 font-bold flex items-center gap-1.5 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-sky-500 via-blue-600 to-teal-600 hover:from-sky-600 hover:to-teal-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-sky-500/25 transition flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
          >
            <span>Đăng Nhập Trang Quản Trị</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick hint */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Hệ thống bảo mật VNPT Cần Thơ</span>
          </div>
          <span className="font-mono font-bold text-sky-600">PIN: 1800</span>
        </div>

      </div>
    </div>
  );
};
