import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout/Layout';
import { Button, Input, CircleLoader } from '../../../components';
import { api, ApiError } from '../../../utils/api/apiClient';
import { notify, warn } from '../../../App';

interface Profile {
  name: string;
  email: string;
  emailVerified: boolean;
  totpEnabled: boolean;
}

const Settings: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);

  const [twoFAStep, setTwoFAStep] = useState<'idle' | 'enrolling' | 'enabled'>('idle');
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [secret, setSecret] = useState('');
  const [totpCode, setTotpCode] = useState('');

  useEffect(() => {
    api
      .get<{ profile: Profile }>('/settings/profile')
      .then((data) => {
        setProfile(data.profile);
        setName(data.profile.name);
        setEmail(data.profile.email);
        setTwoFAStep(data.profile.totpEnabled ? 'enabled' : 'idle');
      })
      .catch((error) => notify(error instanceof ApiError ? error.message : 'Failed to load profile'))
      .finally(() => setLoading(false));
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const data = await api.patch<{ profile: Profile }>('/settings/profile', { name, email });
      setProfile(data.profile);
      notify('Profile updated');
    } catch (error) {
      warn(error instanceof ApiError ? error.message : 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPassword(true);
    try {
      await api.post('/settings/password', { currentPassword, newPassword });
      notify('Password updated');
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      warn(error instanceof ApiError ? error.message : 'Failed to update password');
    } finally {
      setSavingPassword(false);
    }
  };

  const handleEnroll2FA = async () => {
    try {
      const data = await api.post<{ qrDataUrl: string; secret: string }>('/settings/2fa/enroll');
      setQrDataUrl(data.qrDataUrl);
      setSecret(data.secret);
      setTwoFAStep('enrolling');
    } catch (error) {
      warn(error instanceof ApiError ? error.message : 'Failed to start 2FA setup');
    }
  };

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/settings/2fa/verify', { code: totpCode });
      notify('2FA enabled');
      setTwoFAStep('enabled');
      setTotpCode('');
    } catch (error) {
      warn(error instanceof ApiError ? error.message : 'Incorrect code');
    }
  };

  const handleDisable2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/settings/2fa/disable', { code: totpCode });
      notify('2FA disabled');
      setTwoFAStep('idle');
      setTotpCode('');
    } catch (error) {
      warn(error instanceof ApiError ? error.message : 'Incorrect code');
    }
  };

  if (loading || !profile) {
    return (
      <Layout>
        <div className="flex mt-8 h-[50vh] bg-white m-10 rounded-lg justify-center items-center">
          <CircleLoader color="#005AE2" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="space-y-8">
          <form onSubmit={handleSaveProfile} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
                <Input py="12px" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
                <Input py="12px" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                {!profile.emailVerified && (
                  <p className="text-xs text-orange-500 mt-1">Email not verified yet.</p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <Button buttonWidth="fit" type="submit" disabled={savingProfile}>
                Save Profile
              </Button>
            </div>
          </form>

          <form onSubmit={handleChangePassword} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Change Password</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Current Password</label>
                <Input
                  py="12px"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">New Password</label>
                <Input
                  py="12px"
                  type="password"
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mt-6">
              <Button buttonWidth="fit" type="submit" disabled={savingPassword}>
                Update Password
              </Button>
            </div>
          </form>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">White Labeling & Branding</h2>
              <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
                Coming soon
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Custom domains and branded dashboards are on the roadmap but not available yet.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Security</h2>
            {twoFAStep === 'idle' && (
              <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-100 rounded-lg">
                <div>
                  <p className="font-semibold text-orange-800 text-sm">Two-Factor Authentication</p>
                  <p className="text-xs text-orange-700">Add an extra layer of security to your account.</p>
                </div>
                <Button buttonWidth="fit" onClick={handleEnroll2FA}>
                  Enable 2FA
                </Button>
              </div>
            )}
            {twoFAStep === 'enrolling' && (
              <form onSubmit={handleVerify2FA} className="p-4 bg-orange-50 border border-orange-100 rounded-lg">
                <p className="font-semibold text-orange-800 text-sm mb-4">
                  Scan this QR code with your authenticator app, then enter the 6-digit code to confirm.
                </p>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  {qrDataUrl && <img src={qrDataUrl} alt="2FA QR code" className="w-40 h-40" />}
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-2">Or enter this key manually:</p>
                    <code className="text-xs break-all bg-white px-2 py-1 rounded border">{secret}</code>
                    <div className="mt-4">
                      <Input
                        py="8px"
                        placeholder="123456"
                        value={totpCode}
                        onChange={(e) => setTotpCode(e.target.value)}
                        maxLength={6}
                        required
                      />
                    </div>
                    <Button buttonWidth="fit" type="submit" style={{ marginTop: '12px' }}>
                      Confirm
                    </Button>
                  </div>
                </div>
              </form>
            )}
            {twoFAStep === 'enabled' && (
              <form onSubmit={handleDisable2FA} className="flex items-center justify-between p-4 bg-green-50 border border-green-100 rounded-lg gap-4">
                <div>
                  <p className="font-semibold text-green-800 text-sm">Two-Factor Authentication is enabled</p>
                  <p className="text-xs text-green-700">Enter a code to disable it.</p>
                </div>
                <Input
                  py="8px"
                  placeholder="123456"
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value)}
                  maxLength={6}
                  required
                />
                <Button buttonWidth="fit" type="submit">
                  Disable
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
