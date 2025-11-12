import { Link } from "react-router";
import { useState, useEffect } from "react";
import { requireAuth, getCurrentUser, getCurrentBusiness, logout } from "../../utils/auth";
import { useNavigate } from "react-router";

// NavItem component
const NavItem = ({ href, label, active }) => {
  const baseClasses = "flex items-center px-4 py-3 rounded-lg transition-colors font-medium";
  const activeClasses = active
    ? "bg-blue-500 text-white"
    : "text-gray-700 hover:bg-gray-100";

  return (
    <Link to={href} className={`${baseClasses} ${activeClasses}`}>
      <span className="text-sm">{label}</span>
    </Link>
  );
};

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function BusinessInfoPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [business, setBusiness] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [mounted, setMounted] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    businessName: '',
    businessDescription: '',
    category: 'Food',
    phoneNumber: '',
    streetAddress1: '',
    streetAddress2: '',
    zipCode: '',
    city: '',
    state: '',
    latitude: '',
    longitude: '',
  });
  
  const [businessHours, setBusinessHours] = useState({
    Monday: { from: '09:00', to: '18:00', closed: false },
    Tuesday: { from: '09:00', to: '18:00', closed: false },
    Wednesday: { from: '09:00', to: '18:00', closed: false },
    Thursday: { from: '09:00', to: '18:00', closed: false },
    Friday: { from: '09:00', to: '18:00', closed: false },
    Saturday: { from: '09:00', to: '18:00', closed: false },
    Sunday: { from: '09:00', to: '18:00', closed: false },
  });

  useEffect(() => {
    setMounted(true);
    const currentUser = getCurrentUser();
    const currentBusiness = getCurrentBusiness();
    setUser(currentUser);
    setBusiness(currentBusiness);
    
    if (currentBusiness) {
      setFormData({
        businessName: currentBusiness.name || '',
        businessDescription: currentBusiness.description || '',
        category: currentBusiness.category || 'Food',
        phoneNumber: currentBusiness.phone || '',
        streetAddress1: currentBusiness.street_address_1 || '',
        streetAddress2: currentBusiness.street_address_2 || '',
        zipCode: currentBusiness.postal_code || '',
        city: currentBusiness.city || '',
        state: currentBusiness.state || '',
        latitude: currentBusiness.latitude || '',
        longitude: currentBusiness.longitude || '',
      });
      
      // Parse hours
      if (currentBusiness.hours) {
        try {
          const parsed = typeof currentBusiness.hours === 'string' ? JSON.parse(currentBusiness.hours) : currentBusiness.hours;
          setBusinessHours(parsed);
        } catch (e) {
          console.error('Error parsing hours:', e);
        }
      }
      
      // Set image preview
      if (currentBusiness.cover_image_url) {
        setImagePreview(currentBusiness.cover_image_url);
      }
    }
    
    if (!currentUser) {
      requireAuth(navigate);
    }
  }, [navigate]);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-fill city and state based on zip code
    if (name === 'zipCode' && value.length === 5) {
      try {
        const response = await fetch(`https://api.zippopotam.us/us/${value}`);
        if (response.ok) {
          const data = await response.json();
          if (data.places && data.places.length > 0) {
            const place = data.places[0];
            setFormData(prev => ({
              ...prev,
              city: place['place name'],
              state: place['state abbreviation'],
              latitude: place.latitude,
              longitude: place.longitude
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching zip code data:', error);
      }
    }
  };

  const handleHourChange = (day, field, value) => {
    setBusinessHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image must be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let imageUrl = business?.cover_image_url || '';
      if (imageFile) {
        const reader = new FileReader();
        imageUrl = await new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(imageFile);
        });
      }
      
      const updateData = {
        id: business.id,
        name: formData.businessName,
        description: formData.businessDescription,
        category: formData.category,
        phone: formData.phoneNumber,
        email: business.email, // Keep existing email
        street_address_1: formData.streetAddress1,
        street_address_2: formData.streetAddress2,
        city: formData.city,
        state: formData.state,
        postal_code: formData.zipCode,
        latitude: formData.latitude,
        longitude: formData.longitude,
        hours: businessHours,
        cover_image_url: imageUrl
      };
      
      console.log('Submitting:', updateData);
      
      const response = await fetch('/api/businesses', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        localStorage.setItem('currentBusiness', JSON.stringify(result));
        setBusiness(result);
        
        // Update image preview
        if (result.cover_image_url) {
          setImagePreview(result.cover_image_url);
        }
        
        alert('Business information updated successfully!');
      } else {
        alert(`Error: ${result.error || 'Failed to update'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!mounted || !user || !business) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <Link to="/dashboard" className="flex items-center justify-center">
            <img 
              src="/assets/neione_logo_horigental_blue.png" 
              alt="Neione"
              className="h-8 object-contain"
            />
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavItem href="/dashboard" label="Dashboard" />
          <NavItem href="/dashboard/business-info" label="Business Info" active />
          <NavItem href="/dashboard/coupons" label="Coupons" />
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              {business.name?.charAt(0) || 'B'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{business.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-sm text-red-600 hover:text-red-700 font-medium py-2"
          >
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Information</h1>
            <p className="text-gray-600">Manage your business profile and contact information</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Description *</label>
                  <textarea
                    name="businessDescription"
                    value={formData.businessDescription}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Food">Food</option>
                    <option value="Café">Café</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Services">Services</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Image *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="mt-2 h-32 object-cover rounded" />
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address 1 *</label>
                  <input
                    type="text"
                    name="streetAddress1"
                    value={formData.streetAddress1}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address 2</label>
                  <input
                    type="text"
                    name="streetAddress2"
                    value={formData.streetAddress2}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    maxLength="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter 5-digit zip code"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">City and State will be auto-filled</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                      required
                    />
                  </div>
                </div>

                {/* Business Hours */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">Business Hours</label>
                  <div className="space-y-3">
                    {DAYS_OF_WEEK.map((day) => (
                      <div key={day} className="flex items-center gap-4">
                        <div className="w-28">
                          <span className="text-sm text-gray-700 font-medium">{day}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="time"
                            value={businessHours[day].from}
                            onChange={(e) => handleHourChange(day, 'from', e.target.value)}
                            disabled={businessHours[day].closed}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:bg-gray-100"
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="time"
                            value={businessHours[day].to}
                            onChange={(e) => handleHourChange(day, 'to', e.target.value)}
                            disabled={businessHours[day].closed}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:bg-gray-100"
                          />
                          <label className="flex items-center gap-2 ml-4">
                            <input
                              type="checkbox"
                              checked={businessHours[day].closed}
                              onChange={(e) => handleHourChange(day, 'closed', e.target.checked)}
                              className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-600">Closed</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Location</h2>
              
              <div className="space-y-4">
                {/* Address Display */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-1">Business Address:</p>
                  <p className="text-gray-900">
                    {formData.streetAddress1 || "Street Address 1"}
                    {formData.streetAddress2 && `, ${formData.streetAddress2}`}
                  </p>
                  <p className="text-gray-900">
                    {formData.city || "City"}, {formData.state || "State"} {formData.zipCode || "Zip"}
                  </p>
                </div>

                {/* Google Maps Embed */}
                {(formData.streetAddress1 && formData.city && formData.state && formData.zipCode) ? (
                  <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-200">
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        `${formData.streetAddress1}${formData.streetAddress2 ? ' ' + formData.streetAddress2 : ''}, ${formData.city}, ${formData.state} ${formData.zipCode}`
                      )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Business Location Map"
                    />
                  </div>
                ) : (
                  <div className="w-full h-96 rounded-lg border border-gray-200 flex items-center justify-center bg-gray-50">
                    <div className="text-center text-gray-500">
                      <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-sm">Map will appear here once you enter a complete address</p>
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-500">
                  💡 The map will update automatically when you change the address above
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
