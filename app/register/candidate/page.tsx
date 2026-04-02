'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { insforge } from '@/lib/insforge';
import { CheckCircle, Eye, EyeOff } from 'lucide-react';

const steps = ['Personal Info', 'Professional Background', 'Discipline & Skills', 'Job Preferences', 'Create Account'];

const disciplines = ['Structural Engineering', 'Transportation Engineering', 'Geotechnical Engineering', 'Water Resources & Hydrology', 'Environmental Engineering', 'Wastewater & Utilities', 'Construction & Project Management', 'Land Development & Urban Planning', 'Surveying & Geospatial', 'Coastal & Marine Engineering'];
const skillOptions = ['AutoCAD', 'Civil 3D', 'STAAD.Pro', 'ETABS', 'HEC-RAS', 'HEC-HMS', 'SWMM', 'ArcGIS', 'MicroStation', 'Primavera P6', 'gINT', 'PLAXIS', 'Synchro', 'Revit', 'OpenRoads', 'BioWin', 'GPS-X', 'QGIS', 'Delft3D', 'MIKE'];

export default function CandidateRegister() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [verifyStep, setVerifyStep] = useState(false);
  const [otp, setOtp] = useState('');

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', city: '', state: '', linkedInUrl: '',
    jobTitle: '', yearsExp: '', education: '', isPE: '', peState: '', isEIT: '',
    discipline: '', skills: [] as string[],
    jobType: '', relocation: '', salary: '', availability: '', workEnv: '',
    password: '', confirmPassword: '',
  });

  function update(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function toggleSkill(skill: string) {
    setForm(f => ({
      ...f,
      skills: f.skills.includes(skill) ? f.skills.filter(s => s !== skill) : [...f.skills, skill],
    }));
  }

  async function handleSubmit() {
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');

    const { data, error: err } = await insforge.auth.signUp({
      email: form.email,
      password: form.password,
      name: `${form.firstName} ${form.lastName}`,
    });

    if (err) {
      setError(err.message || 'Registration failed. Please try again.');
      setLoading(false);
      return;
    }

    if (data?.requireEmailVerification) {
      setVerifyStep(true);
      setLoading(false);
      return;
    }

    if (data?.accessToken) {
      await saveProfile(data.user?.id);
      router.push('/dashboard/candidate');
    }
    setLoading(false);
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data, error: err } = await insforge.auth.verifyEmail({ email: form.email, otp });
    if (err) {
      setError('Invalid code. Please check your email and try again.');
      setLoading(false);
      return;
    }
    if (data?.accessToken) {
      await saveProfile(data.user?.id);
      router.push('/dashboard/candidate');
    }
    setLoading(false);
  }

  async function saveProfile(userId?: string) {
    if (!userId) return;
    await insforge.auth.setProfile({
      role: 'candidate',
      first_name: form.firstName,
      last_name: form.lastName,
      phone: form.phone,
      city: form.city,
      state: form.state,
      linkedin_url: form.linkedInUrl,
      discipline: form.discipline,
      years_experience: parseInt(form.yearsExp) || 0,
      is_pe_licensed: form.isPE === 'yes',
      is_eit: form.isEIT === 'yes',
      skills: form.skills,
      job_type: form.jobType,
      salary_expected: parseInt(form.salary) || 0,
    });
  }

  const canNext = [
    form.firstName && form.lastName && form.email && form.phone,
    form.jobTitle && form.yearsExp,
    form.discipline,
    form.jobType,
    form.password && form.confirmPassword,
  ][step];

  if (verifyStep) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#E91E8C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-[#E91E8C]" />
          </div>
          <h2 className="text-2xl font-bold text-[#0B1F3A] mb-2">Check Your Email</h2>
          <p className="text-[#4A5568] mb-6">We sent a 6-digit verification code to <strong>{form.email}</strong></p>
          {error && <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}
          <form onSubmit={handleVerify} className="space-y-4">
            <input type="text" value={otp} onChange={e => setOtp(e.target.value)} maxLength={6} required
              placeholder="Enter 6-digit code"
              className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-center text-2xl font-bold tracking-widest outline-none focus:border-[#E91E8C]" />
            <button type="submit" disabled={loading}
              className="w-full bg-[#E91E8C] text-white font-bold py-3 rounded-lg hover:bg-[#C0176E] transition-colors">
              {loading ? 'Verifying...' : 'Verify Email & Continue'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 bg-[#E91E8C] rounded flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="white" width="16" height="16">
                <path d="M2 12l10-8 10 8" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-bold text-[#0B1F3A] text-lg">CC<span className="text-[#E91E8C]">Promoters</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-[#0B1F3A] mt-4">Create Your Candidate Profile</h1>
          <p className="text-[#4A5568] mt-1">Join 326,000+ civil engineering professionals</p>
        </div>

        {/* Progress stepper */}
        <div className="flex items-center justify-between mb-8 px-2">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-col items-center gap-1 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < step ? 'bg-[#059669] text-white' : i === step ? 'bg-[#E91E8C] text-white' : 'bg-[#E2E8F0] text-[#4A5568]'}`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className="text-xs text-[#4A5568] hidden sm:block text-center leading-tight">{s}</span>
              {i < steps.length - 1 && (
                <div className={`absolute h-0.5 transition-all`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm">
          {/* Step 1 */}
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-[#0B1F3A] mb-6">Personal Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="First Name" value={form.firstName} onChange={v => update('firstName', v)} placeholder="James" />
                <Field label="Last Name" value={form.lastName} onChange={v => update('lastName', v)} placeholder="Wilson" />
              </div>
              <Field label="Email Address" type="email" value={form.email} onChange={v => update('email', v)} placeholder="james@example.com" />
              <Field label="Phone Number" type="tel" value={form.phone} onChange={v => update('phone', v)} placeholder="+1 (555) 000-0000" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="City" value={form.city} onChange={v => update('city', v)} placeholder="Houston" />
                <Field label="State" value={form.state} onChange={v => update('state', v)} placeholder="TX" />
              </div>
              <Field label="LinkedIn URL (optional)" value={form.linkedInUrl} onChange={v => update('linkedInUrl', v)} placeholder="linkedin.com/in/jameswilson" />
            </div>
          )}

          {/* Step 2 */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-[#0B1F3A] mb-6">Professional Background</h2>
              <Field label="Current Job Title" value={form.jobTitle} onChange={v => update('jobTitle', v)} placeholder="Senior Structural Engineer" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0B1F3A] mb-1.5">Years of Experience</label>
                  <select value={form.yearsExp} onChange={e => update('yearsExp', e.target.value)}
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#E91E8C]">
                    <option value="">Select...</option>
                    {['0-1', '2-3', '4-6', '7-10', '11-15', '15+'].map(y => <option key={y} value={y}>{y} years</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0B1F3A] mb-1.5">Highest Education</label>
                  <select value={form.education} onChange={e => update('education', e.target.value)}
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#E91E8C]">
                    <option value="">Select...</option>
                    {['BS Civil Engineering', 'MS Civil Engineering', 'PhD', 'Other Engineering Degree'].map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0B1F3A] mb-1.5">PE Licensed?</label>
                  <select value={form.isPE} onChange={e => update('isPE', e.target.value)}
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#E91E8C]">
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0B1F3A] mb-1.5">EIT / Engineer-in-Training?</label>
                  <select value={form.isEIT} onChange={e => update('isEIT', e.target.value)}
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#E91E8C]">
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
              {form.isPE === 'yes' && (
                <Field label="PE License State(s)" value={form.peState} onChange={v => update('peState', v)} placeholder="e.g. TX, CA, FL" />
              )}
            </div>
          )}

          {/* Step 3 */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-[#0B1F3A] mb-6">Discipline & Skills</h2>
              <div>
                <label className="block text-sm font-semibold text-[#0B1F3A] mb-1.5">Primary Discipline</label>
                <select value={form.discipline} onChange={e => update('discipline', e.target.value)}
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#E91E8C]">
                  <option value="">Select your discipline...</option>
                  {disciplines.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0B1F3A] mb-3">Key Skills & Software (select all that apply)</label>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map(skill => (
                    <button key={skill} type="button" onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${form.skills.includes(skill) ? 'bg-[#E91E8C] text-white border-[#E91E8C]' : 'border-[#E2E8F0] text-[#4A5568] hover:border-[#E91E8C]'}`}>
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-[#0B1F3A] mb-6">Job Preferences</h2>
              <div>
                <label className="block text-sm font-semibold text-[#0B1F3A] mb-1.5">Preferred Job Type</label>
                <select value={form.jobType} onChange={e => update('jobType', e.target.value)}
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#E91E8C]">
                  <option value="">Select...</option>
                  <option value="permanent">Permanent / Full-Time</option>
                  <option value="contract">Contract</option>
                  <option value="both">Open to Both</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0B1F3A] mb-1.5">Salary Expectation (annual)</label>
                <select value={form.salary} onChange={e => update('salary', e.target.value)}
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#E91E8C]">
                  <option value="">Select range...</option>
                  {['60000', '75000', '90000', '105000', '120000', '140000', '160000', '180000'].map(s => (
                    <option key={s} value={s}>${parseInt(s).toLocaleString()}+</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0B1F3A] mb-1.5">Work Environment Preference</label>
                <select value={form.workEnv} onChange={e => update('workEnv', e.target.value)}
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#E91E8C]">
                  <option value="">Select...</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">On-Site</option>
                  <option value="open">Open to All</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0B1F3A] mb-1.5">Availability</label>
                <select value={form.availability} onChange={e => update('availability', e.target.value)}
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#E91E8C]">
                  <option value="">Select...</option>
                  <option value="immediate">Immediately Available</option>
                  <option value="2weeks">2 Weeks Notice</option>
                  <option value="1month">1 Month Notice</option>
                  <option value="exploring">Just Exploring</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 5 */}
          {step === 4 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-[#0B1F3A] mb-6">Create Your Account</h2>
              <div>
                <label className="block text-sm font-semibold text-[#0B1F3A] mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => update('password', e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 pr-10 text-sm outline-none focus:border-[#E91E8C]" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A5568]">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0B1F3A] mb-1.5">Confirm Password</label>
                <input type="password" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)}
                  placeholder="Repeat password"
                  className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#E91E8C]" />
              </div>
              {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">{error}</div>}
              <div className="bg-[#F7F9FC] rounded-lg p-4 text-sm text-[#4A5568]">
                <p>By registering, you agree to our{' '}
                  <Link href="/terms-of-service" className="text-[#E91E8C] hover:underline">Terms of Service</Link> and{' '}
                  <Link href="/privacy-policy" className="text-[#E91E8C] hover:underline">Privacy Policy</Link>.
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E2E8F0]">
            {step > 0 ? (
              <button onClick={() => setStep(s => s - 1)} className="text-[#4A5568] hover:text-[#0B1F3A] font-medium text-sm">
                ← Back
              </button>
            ) : (
              <Link href="/login" className="text-[#4A5568] hover:text-[#0B1F3A] text-sm">Already have an account?</Link>
            )}
            {step < steps.length - 1 ? (
              <button onClick={() => setStep(s => s + 1)} disabled={!canNext}
                className="bg-[#E91E8C] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#C0176E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Continue →
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading || !canNext}
                className="bg-[#E91E8C] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#C0176E] transition-colors disabled:opacity-50">
                {loading ? 'Creating Account...' : 'Create Account →'}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-sm text-[#4A5568] mt-6">
          Are you an employer?{' '}
          <Link href="/register/employer" className="text-[#E91E8C] font-semibold hover:underline">Register as Employer →</Link>
        </p>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#0B1F3A] mb-1.5">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full border border-[#E2E8F0] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#E91E8C] focus:ring-1 focus:ring-[#E91E8C] transition-colors" />
    </div>
  );
}
