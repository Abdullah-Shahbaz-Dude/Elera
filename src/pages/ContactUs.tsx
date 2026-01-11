import React, { useState } from 'react';

interface FormData {
  gdprConsent: boolean;
  fullName: string;
  jobTitle: string;
  organisationName: string;
  departmentTeam: string;
  email: string;
  phone: string;
  preferredContact: string;
  notSureYet: boolean;
  insightEngines: {
    parent: boolean;
    revealHiddenBrilliance: boolean;
    mindSync: boolean;
    digitalBiasImpact: boolean;
    elaraDataEngine: boolean;
  };
  consultancySupport: {
    parent: boolean;
    businessPsychology: boolean;
    digitalTransformation: boolean;
    other: boolean;
    otherText: string;
  };
  description: string;
}

interface FormErrors {
  gdprConsent?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  interests?: string;
  emailFormat?: string;
}

const ContactUs = () => {
  const [formData, setFormData] = useState<FormData>({
    gdprConsent: false,
    fullName: '',
    jobTitle: '',
    organisationName: '',
    departmentTeam: '',
    email: '',
    phone: '',
    preferredContact: 'Email',
    notSureYet: false,
    insightEngines: {
      parent: false,
      revealHiddenBrilliance: false,
      mindSync: false,
      digitalBiasImpact: false,
      elaraDataEngine: false,
    },
    consultancySupport: {
      parent: false,
      businessPsychology: false,
      digitalTransformation: false,
      other: false,
      otherText: '',
    },
    description: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === 'checkbox') {
      if (name === 'gdprConsent' || name === 'notSureYet') {
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
        }));
      } else if (name.startsWith('insightEngines.')) {
        const field = name.split('.')[1];
        setFormData((prev) => ({
          ...prev,
          insightEngines: {
            ...prev.insightEngines,
            [field]: checked,
            parent:
              field === 'parent'
                ? checked
                : prev.insightEngines.parent || checked,
          },
        }));
      } else if (name.startsWith('consultancySupport.')) {
        const field = name.split('.')[1];
        setFormData((prev) => ({
          ...prev,
          consultancySupport: {
            ...prev.consultancySupport,
            [field]: checked,
            parent:
              field === 'parent'
                ? checked
                : prev.consultancySupport.parent || checked,
          },
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // GDPR Consent validation
    if (!formData.gdprConsent) {
      newErrors.gdprConsent = 'You must consent to data processing to continue';
    }

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.emailFormat = 'Please enter a valid email address';
      }
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    }

    // Interests validation - at least one must be selected
    const hasInterest =
      formData.notSureYet ||
      formData.insightEngines.revealHiddenBrilliance ||
      formData.insightEngines.mindSync ||
      formData.insightEngines.digitalBiasImpact ||
      formData.insightEngines.elaraDataEngine ||
      formData.consultancySupport.businessPsychology ||
      formData.consultancySupport.digitalTransformation ||
      formData.consultancySupport.other;

    if (!hasInterest) {
      newErrors.interests = 'Please select at least one area of interest';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Prepare submission data
      const submissionData = {
        gdprConsent: formData.gdprConsent,
        contactDetails: {
          fullName: formData.fullName,
          jobTitle: formData.jobTitle,
          organisationName: formData.organisationName,
          departmentTeam: formData.departmentTeam,
          email: formData.email,
          phone: formData.phone,
          preferredContact: formData.preferredContact,
        },
        interests: {
          notSureYet: formData.notSureYet,
          insightEngines: {
            revealHiddenBrilliance:
              formData.insightEngines.revealHiddenBrilliance,
            mindSync: formData.insightEngines.mindSync,
            digitalBiasImpact: formData.insightEngines.digitalBiasImpact,
            elaraDataEngine: formData.insightEngines.elaraDataEngine,
          },
          consultancySupport: {
            businessPsychology: formData.consultancySupport.businessPsychology,
            digitalTransformation:
              formData.consultancySupport.digitalTransformation,
            other: formData.consultancySupport.other,
            otherText: formData.consultancySupport.otherText,
          },
        },
        description: formData.description,
      };

      console.log('Form submitted:', submissionData);

      // Show success message
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          gdprConsent: false,
          fullName: '',
          jobTitle: '',
          organisationName: '',
          departmentTeam: '',
          email: '',
          phone: '',
          preferredContact: 'Email',
          notSureYet: false,
          insightEngines: {
            parent: false,
            revealHiddenBrilliance: false,
            mindSync: false,
            digitalBiasImpact: false,
            elaraDataEngine: false,
          },
          consultancySupport: {
            parent: false,
            businessPsychology: false,
            digitalTransformation: false,
            other: false,
            otherText: '',
          },
          description: '',
        });
        setIsSubmitted(false);
        setErrors({});
      }, 3000);
    }
  };

  return (
    <main className="min-h-screen pt-40 pb-20">
      <div className="relative w-full overflow-hidden">
        {/* Background Glow Effects */}
        <div className="absolute right-1/4 top-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-[rgba(96,165,250,0.15)] to-[rgba(147,51,234,0.15)] blur-[400px]"></div>
        <div className="absolute left-1/4 bottom-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-[rgba(167,139,250,0.15)] to-[rgba(147,51,234,0.15)] blur-[400px]"></div>

        <div className="relative container mx-auto px-4 md:px-6 z-10">
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="mb-12 md:mb-16 text-center">
              <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
                Elara – Speak to Us Booking Form
              </h1>
              <div
                className="mx-auto mb-4 md:mb-6 h-1 w-24 md:w-32 rounded-full"
                style={{
                  background: 'linear-gradient(to right, #60A5FA, #9333EA)',
                }}
              ></div>
            </div>

            {/* Form Container */}
            <div className="relative mx-auto">
              <div
                className="relative rounded-2xl md:rounded-3xl overflow-hidden p-[2px]"
                style={{
                  background:
                    'linear-gradient(135deg, #60A5FA, #A78BFA, #9333EA)',
                  boxShadow: '0 20px 60px rgba(96, 165, 250, 0.3)',
                }}
              >
                <div
                  className="relative rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 bg-black/80 backdrop-blur-xl"
                  style={{
                    background: 'rgba(0, 0, 0, 0.8)',
                  }}
                >
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-4">✓</div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Thank You!
                      </h2>
                      <p className="text-lg text-white/80">
                        Your form has been submitted successfully. We'll be in
                        touch soon.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="relative z-10 space-y-6 md:space-y-8"
                    >
                      {/* GDPR Consent */}
                      <div className="space-y-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="gdprConsent"
                            checked={formData.gdprConsent}
                            onChange={handleInputChange}
                            className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-primary-blue-accent focus:ring-2 focus:ring-primary-blue-accent cursor-pointer"
                          />
                          <span className="text-sm md:text-base text-white/90">
                            I consent to my personal data being stored and
                            processed by Elara for the purpose of responding to
                            this enquiry, in accordance with GDPR and Elara's
                            privacy policy.
                          </span>
                        </label>
                        {errors.gdprConsent && (
                          <p className="text-red-400 text-sm ml-8">
                            {errors.gdprConsent}
                          </p>
                        )}
                      </div>

                      <div className="border-t border-white/10 pt-6 md:pt-8">
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
                          Contact Details
                        </h2>
                        <p className="text-sm md:text-base text-white/70 mb-6">
                          Please provide your basic contact information:
                        </p>

                        <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                          {/* Full Name */}
                          <div className="md:col-span-2">
                            <label className="block text-sm text-white/80 mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              className={`w-full rounded-xl md:rounded-2xl border ${
                                errors.fullName
                                  ? 'border-red-400'
                                  : 'border-white/20'
                              } bg-white/5 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:outline-none focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-primary-blue-accent`}
                              placeholder="Full Name"
                            />
                            {errors.fullName && (
                              <p className="text-red-400 text-sm mt-1">
                                {errors.fullName}
                              </p>
                            )}
                          </div>

                          {/* Job Title */}
                          <div>
                            <label className="block text-sm text-white/80 mb-2">
                              Job Title
                            </label>
                            <input
                              type="text"
                              name="jobTitle"
                              value={formData.jobTitle}
                              onChange={handleInputChange}
                              className="w-full rounded-xl md:rounded-2xl border border-white/20 bg-white/5 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:outline-none focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-primary-blue-accent"
                              placeholder="Job Title"
                            />
                          </div>

                          {/* Organisation Name */}
                          <div>
                            <label className="block text-sm text-white/80 mb-2">
                              Organisation Name
                            </label>
                            <input
                              type="text"
                              name="organisationName"
                              value={formData.organisationName}
                              onChange={handleInputChange}
                              className="w-full rounded-xl md:rounded-2xl border border-white/20 bg-white/5 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:outline-none focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-primary-blue-accent"
                              placeholder="Organisation Name"
                            />
                          </div>

                          {/* Department/Team */}
                          <div>
                            <label className="block text-sm text-white/80 mb-2">
                              Department/Team
                            </label>
                            <input
                              type="text"
                              name="departmentTeam"
                              value={formData.departmentTeam}
                              onChange={handleInputChange}
                              className="w-full rounded-xl md:rounded-2xl border border-white/20 bg-white/5 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:outline-none focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-primary-blue-accent"
                              placeholder="Department/Team"
                            />
                          </div>

                          {/* Email Address */}
                          <div>
                            <label className="block text-sm text-white/80 mb-2">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className={`w-full rounded-xl md:rounded-2xl border ${
                                errors.email || errors.emailFormat
                                  ? 'border-red-400'
                                  : 'border-white/20'
                              } bg-white/5 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:outline-none focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-primary-blue-accent`}
                              placeholder="Email Address"
                            />
                            {errors.email && (
                              <p className="text-red-400 text-sm mt-1">
                                {errors.email}
                              </p>
                            )}
                            {errors.emailFormat && (
                              <p className="text-red-400 text-sm mt-1">
                                {errors.emailFormat}
                              </p>
                            )}
                          </div>

                          {/* Phone Number */}
                          <div>
                            <label className="block text-sm text-white/80 mb-2">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className={`w-full rounded-xl md:rounded-2xl border ${
                                errors.phone
                                  ? 'border-red-400'
                                  : 'border-white/20'
                              } bg-white/5 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:outline-none focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-primary-blue-accent`}
                              placeholder="Phone Number"
                            />
                            {errors.phone && (
                              <p className="text-red-400 text-sm mt-1">
                                {errors.phone}
                              </p>
                            )}
                          </div>

                          {/* Preferred Method of Contact */}
                          <div className="md:col-span-2">
                            <label className="block text-sm text-white/80 mb-2">
                              Preferred Method of Contact
                            </label>
                            <select
                              name="preferredContact"
                              value={formData.preferredContact}
                              onChange={handleInputChange}
                              className="w-full rounded-xl md:rounded-2xl border border-white/20 bg-white/5 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white backdrop-blur-sm transition-all focus:outline-none focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-primary-blue-accent"
                            >
                              <option value="Email" className="bg-black">
                                Email
                              </option>
                              <option value="Phone" className="bg-black">
                                Phone
                              </option>
                              <option value="Either" className="bg-black">
                                Either
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* What Are You Interested In? */}
                      <div className="border-t border-white/10 pt-6 md:pt-8">
                        <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
                          What Are You Interested In?
                        </h2>

                        <div className="space-y-4">
                          {/* Not sure yet */}
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              name="notSureYet"
                              checked={formData.notSureYet}
                              onChange={handleInputChange}
                              className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-primary-blue-accent focus:ring-2 focus:ring-primary-blue-accent cursor-pointer"
                            />
                            <span className="text-sm md:text-base text-white/90">
                              Not sure yet just want to chat
                            </span>
                          </label>

                          {/* Insight & Intelligence Engines */}
                          <div className="space-y-3 pl-0">
                            <label className="flex items-start gap-3 cursor-pointer">
                              <input
                                type="checkbox"
                                name="insightEngines.parent"
                                checked={formData.insightEngines.parent}
                                onChange={handleInputChange}
                                className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-primary-blue-accent focus:ring-2 focus:ring-primary-blue-accent cursor-pointer"
                              />
                              <span className="text-sm md:text-base font-semibold text-white">
                                Insight & Intelligence Engines
                              </span>
                            </label>
                            <div className="ml-8 space-y-2">
                              <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="insightEngines.revealHiddenBrilliance"
                                  checked={
                                    formData.insightEngines
                                      .revealHiddenBrilliance
                                  }
                                  onChange={handleInputChange}
                                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary-blue-accent focus:ring-2 focus:ring-primary-blue-accent cursor-pointer"
                                />
                                <span className="text-sm md:text-base text-white/90">
                                  Reveal Hidden Brilliance
                                </span>
                              </label>
                              <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="insightEngines.mindSync"
                                  checked={formData.insightEngines.mindSync}
                                  onChange={handleInputChange}
                                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary-blue-accent focus:ring-2 focus:ring-primary-blue-accent cursor-pointer"
                                />
                                <span className="text-sm md:text-base text-white/90">
                                  Mind Sync
                                </span>
                              </label>
                              <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="insightEngines.digitalBiasImpact"
                                  checked={
                                    formData.insightEngines.digitalBiasImpact
                                  }
                                  onChange={handleInputChange}
                                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary-blue-accent focus:ring-2 focus:ring-primary-blue-accent cursor-pointer"
                                />
                                <span className="text-sm md:text-base text-white/90">
                                  Digital Bias Impact Assessment
                                </span>
                              </label>
                              <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="insightEngines.elaraDataEngine"
                                  checked={
                                    formData.insightEngines.elaraDataEngine
                                  }
                                  onChange={handleInputChange}
                                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary-blue-accent focus:ring-2 focus:ring-primary-blue-accent cursor-pointer"
                                />
                                <span className="text-sm md:text-base text-white/90">
                                  Elara Data Engine
                                </span>
                              </label>
                            </div>
                          </div>

                          {/* Consultancy & Support */}
                          <div className="space-y-3 pl-0">
                            <label className="flex items-start gap-3 cursor-pointer">
                              <input
                                type="checkbox"
                                name="consultancySupport.parent"
                                checked={formData.consultancySupport.parent}
                                onChange={handleInputChange}
                                className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-primary-blue-accent focus:ring-2 focus:ring-primary-blue-accent cursor-pointer"
                              />
                              <span className="text-sm md:text-base font-semibold text-white">
                                Consultancy & Support
                              </span>
                            </label>
                            <div className="ml-8 space-y-2">
                              <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="consultancySupport.businessPsychology"
                                  checked={
                                    formData.consultancySupport
                                      .businessPsychology
                                  }
                                  onChange={handleInputChange}
                                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary-blue-accent focus:ring-2 focus:ring-primary-blue-accent cursor-pointer"
                                />
                                <span className="text-sm md:text-base text-white/90">
                                  Business Psychology Consultancy (Culture
                                  Change, Strategy, Diagnostics)
                                </span>
                              </label>
                              <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="consultancySupport.digitalTransformation"
                                  checked={
                                    formData.consultancySupport
                                      .digitalTransformation
                                  }
                                  onChange={handleInputChange}
                                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary-blue-accent focus:ring-2 focus:ring-primary-blue-accent cursor-pointer"
                                />
                                <span className="text-sm md:text-base text-white/90">
                                  Digital Transformation Advisory (Human-Centred
                                  AI & Adoption Strategy)
                                </span>
                              </label>
                              <div className="space-y-2">
                                <label className="flex items-center gap-3 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    name="consultancySupport.other"
                                    checked={formData.consultancySupport.other}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary-blue-accent focus:ring-2 focus:ring-primary-blue-accent cursor-pointer"
                                  />
                                  <span className="text-sm md:text-base text-white/90">
                                    Other – Please specify:
                                  </span>
                                </label>
                                {formData.consultancySupport.other && (
                                  <input
                                    type="text"
                                    name="consultancySupport.otherText"
                                    value={
                                      formData.consultancySupport.otherText
                                    }
                                    onChange={handleInputChange}
                                    className="ml-7 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:outline-none focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-primary-blue-accent"
                                    placeholder="Please specify"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        {errors.interests && (
                          <p className="text-red-400 text-sm mt-2">
                            {errors.interests}
                          </p>
                        )}
                      </div>

                      {/* Description */}
                      <div className="border-t border-white/10 pt-6 md:pt-8">
                        <label className="block text-sm md:text-base text-white/80 mb-2">
                          Please briefly describe what you're hoping to achieve
                          or the challenge you're exploring:
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={6}
                          className="w-full rounded-xl md:rounded-2xl border border-white/20 bg-white/5 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:outline-none focus:border-white/40 focus:bg-white/10 focus:ring-2 focus:ring-primary-blue-accent resize-none"
                          placeholder="Describe your goals or challenges..."
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-center pt-4 md:pt-6">
                        <button
                          type="submit"
                          className="rounded-xl px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-semibold text-white shadow-xl transition-all hover:scale-105 active:scale-95"
                          style={{
                            background:
                              'linear-gradient(135deg, #60A5FA, #9333EA)',
                            boxShadow: '0 8px 32px rgba(96, 165, 250, 0.4)',
                          }}
                        >
                          Submit Form →
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactUs;
