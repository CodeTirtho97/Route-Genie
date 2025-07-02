import React, { useState, useEffect } from "react";
import {
  Camera,
  Save,
  Edit,
  User,
  Plane,
  Hotel,
  UtensilsCrossed,
  Activity,
  DollarSign,
  Accessibility,
  Phone,
  Heart,
  Languages,
  ChevronDown,
  X,
  Plus,
} from "lucide-react";

const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "user@example.com", // From auth
    phone: "",
    dateOfBirth: "",
    nationality: "",
    profilePicture: null,

    // Travel Preferences
    preferredTripTypes: [],
    defaultTravelers: 2,
    accommodationPreference: "",
    transportationPreference: "",
    activityInterests: [],

    // Budget & Planning
    defaultBudgetRange: "",
    preferredCurrency: "USD",
    budgetCategories: {
      accommodation: 40,
      food: 25,
      activities: 20,
      transport: 15,
    },
    planningStyle: "",

    // Accessibility & Special Requirements
    dietaryRestrictions: [],
    accessibilityNeeds: [],
    medicalConditions: "",
    emergencyContact: {
      name: "",
      phone: "",
      relationship: "",
    },

    // Travel History & Preferences
    favoriteDestinations: [],
    bucketListDestinations: [],
    travelStyle: "",
    preferredTravelMonths: [],
    languagePreferences: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");

  // Options for dropdowns
  const tripTypes = [
    "Adventure",
    "Relaxation",
    "Cultural",
    "Business",
    "Family",
    "Solo",
    "Romantic",
    "Food & Wine",
    "Photography",
  ];
  const accommodationTypes = [
    "Hotel",
    "Hostel",
    "Resort",
    "Airbnb",
    "Boutique",
    "Guesthouse",
    "Camping",
  ];
  const transportTypes = [
    "Economy Flight",
    "Business Flight",
    "First Class",
    "Train",
    "Car Rental",
    "Public Transport",
    "Cruise",
  ];
  const activityTypes = [
    "Museums",
    "Adventure Sports",
    "Food Tours",
    "Nightlife",
    "Shopping",
    "Nature",
    "Beach",
    "Historical Sites",
    "Art Galleries",
    "Local Markets",
  ];
  const budgetRanges = [
    "Budget (Under $50/day)",
    "Mid-range ($50-150/day)",
    "Luxury ($150+/day)",
  ];
  const currencies = ["USD", "EUR", "GBP", "JPY", "INR", "AUD", "CAD"];
  const planningStyles = [
    "Last-minute Planner",
    "Plan 3-6 months ahead",
    "Plan 6+ months ahead",
    "Flexible Dates",
  ];
  const dietaryOptions = [
    "Vegetarian",
    "Vegan",
    "Halal",
    "Kosher",
    "Gluten-free",
    "Dairy-free",
    "Nut allergies",
  ];
  const accessibilityOptions = [
    "Wheelchair accessible",
    "Mobility assistance",
    "Visual impairment support",
    "Hearing impairment support",
  ];
  const travelStyles = [
    "Backpacker",
    "Comfort Traveler",
    "Luxury Seeker",
    "Digital Nomad",
    "Family Traveler",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Japanese",
    "Mandarin",
    "Portuguese",
    "Arabic",
    "Hindi",
  ];

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setProfile((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleMultiSelectChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addToMultiSelect = (field, value) => {
    if (value && !profile[field].includes(value)) {
      setProfile((prev) => ({
        ...prev,
        [field]: [...prev[field], value],
      }));
    }
  };

  const removeFromMultiSelect = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: prev[field].filter((item) => item !== value),
    }));
  };

  const handleBudgetSliderChange = (category, value) => {
    setProfile((prev) => ({
      ...prev,
      budgetCategories: {
        ...prev.budgetCategories,
        [category]: value,
      },
    }));
  };

  const handleSaveProfile = async () => {
    try {
      // API call to save profile
      console.log("Saving profile:", profile);
      setShowSuccess(true);
      setIsEditing(false);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile((prev) => ({
          ...prev,
          profilePicture: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Multi-select component
  const MultiSelectField = ({ label, options, value, field, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const filteredOptions = options.filter(
      (option) =>
        option.toLowerCase().includes(inputValue.toLowerCase()) &&
        !value.includes(option)
    );

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <div className="relative">
          <div className="flex flex-wrap gap-2 mb-2">
            {value.map((item, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {item}
                {isEditing && (
                  <button
                    onClick={() => removeFromMultiSelect(field, item)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X size={14} />
                  </button>
                )}
              </span>
            ))}
          </div>
          {isEditing && (
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsOpen(true)}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {filteredOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        addToMultiSelect(field, option);
                        setInputValue("");
                        setIsOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100"
                    >
                      {option}
                    </button>
                  ))}
                  {inputValue && !options.includes(inputValue) && (
                    <button
                      onClick={() => {
                        addToMultiSelect(field, inputValue);
                        setInputValue("");
                        setIsOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 border-t"
                    >
                      Add "{inputValue}"
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Slider component
  const SliderField = ({ label, value, onChange, disabled }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-gray-700 capitalize">
          {label}
        </label>
        <span className="text-sm text-gray-500">{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        step="5"
        value={value}
        onChange={(e) => onChange(label, parseInt(e.target.value))}
        disabled={disabled}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
      />
    </div>
  );

  const sectionData = [
    { id: "personal", label: "Personal Info", icon: <User size={20} /> },
    { id: "travel", label: "Travel Preferences", icon: <Plane size={20} /> },
    {
      id: "budget",
      label: "Budget & Planning",
      icon: <DollarSign size={20} />,
    },
    {
      id: "accessibility",
      label: "Special Requirements",
      icon: <Accessibility size={20} />,
    },
    { id: "history", label: "Travel History", icon: <Heart size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-blue-800 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-lg">
          Profile Settings
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 backdrop-blur-sm bg-opacity-95">
              <h2 className="text-lg font-semibold mb-4">Settings Menu</h2>
              {sectionData.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center p-3 rounded-xl mb-2 transition-all duration-200 ${
                    activeSection === item.id
                      ? "bg-blue-500 text-white shadow-lg"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-95">
              {/* Header with Edit Toggle */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">
                  {activeSection === "personal" && "Personal Information"}
                  {activeSection === "travel" && "Travel Preferences"}
                  {activeSection === "budget" && "Budget & Planning"}
                  {activeSection === "accessibility" && "Special Requirements"}
                  {activeSection === "history" && "Travel History"}
                </h2>
                <label className="flex items-center cursor-pointer">
                  <span className="mr-3 text-sm font-medium">Edit Mode</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isEditing}
                      onChange={(e) => setIsEditing(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-11 h-6 rounded-full ${
                        isEditing ? "bg-blue-500" : "bg-gray-300"
                      } transition-colors`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                          isEditing ? "translate-x-6" : "translate-x-1"
                        } mt-1`}
                      ></div>
                    </div>
                  </div>
                </label>
              </div>

              {/* Personal Information Section */}
              {activeSection === "personal" && (
                <div className="space-y-6">
                  {/* Profile Picture */}
                  <div className="text-center mb-8">
                    <div className="relative inline-block">
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mx-auto">
                        {profile.profilePicture ? (
                          <img
                            src={profile.profilePicture}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                            {profile.firstName?.charAt(0)}
                            {profile.lastName?.charAt(0)}
                          </div>
                        )}
                      </div>
                      {isEditing && (
                        <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                          <Camera size={16} />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePictureChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Email cannot be changed
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) =>
                          handleInputChange("dateOfBirth", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nationality/Passport Country
                      </label>
                      <input
                        type="text"
                        value={profile.nationality}
                        onChange={(e) =>
                          handleInputChange("nationality", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Travel Preferences Section */}
              {activeSection === "travel" && (
                <div className="space-y-6">
                  <MultiSelectField
                    label="Preferred Trip Types"
                    options={tripTypes}
                    value={profile.preferredTripTypes}
                    field="preferredTripTypes"
                    placeholder="Select your favorite trip types"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Number of Travelers
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={profile.defaultTravelers}
                        onChange={(e) =>
                          handleInputChange("defaultTravelers", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Accommodation Preference
                      </label>
                      <select
                        value={profile.accommodationPreference}
                        onChange={(e) =>
                          handleInputChange(
                            "accommodationPreference",
                            e.target.value
                          )
                        }
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      >
                        <option value="">Select accommodation type</option>
                        {accommodationTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transportation Preference
                    </label>
                    <select
                      value={profile.transportationPreference}
                      onChange={(e) =>
                        handleInputChange(
                          "transportationPreference",
                          e.target.value
                        )
                      }
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    >
                      <option value="">Select transportation type</option>
                      {transportTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <MultiSelectField
                    label="Activity Interests"
                    options={activityTypes}
                    value={profile.activityInterests}
                    field="activityInterests"
                    placeholder="What do you love to do while traveling?"
                  />
                </div>
              )}

              {/* Budget & Planning Section */}
              {activeSection === "budget" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Budget Range
                      </label>
                      <select
                        value={profile.defaultBudgetRange}
                        onChange={(e) =>
                          handleInputChange(
                            "defaultBudgetRange",
                            e.target.value
                          )
                        }
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Currency
                      </label>
                      <select
                        value={profile.preferredCurrency}
                        onChange={(e) =>
                          handleInputChange("preferredCurrency", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      >
                        {currencies.map((currency) => (
                          <option key={currency} value={currency}>
                            {currency}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Budget Allocation (%)
                    </h3>
                    {Object.entries(profile.budgetCategories).map(
                      ([category, value]) => (
                        <SliderField
                          key={category}
                          label={category}
                          value={value}
                          onChange={handleBudgetSliderChange}
                          disabled={!isEditing}
                        />
                      )
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Planning Style
                    </label>
                    <select
                      value={profile.planningStyle}
                      onChange={(e) =>
                        handleInputChange("planningStyle", e.target.value)
                      }
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    >
                      <option value="">Select planning style</option>
                      {planningStyles.map((style) => (
                        <option key={style} value={style}>
                          {style}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Special Requirements Section */}
              {activeSection === "accessibility" && (
                <div className="space-y-6">
                  <MultiSelectField
                    label="Dietary Restrictions"
                    options={dietaryOptions}
                    value={profile.dietaryRestrictions}
                    field="dietaryRestrictions"
                    placeholder="Select any dietary requirements"
                  />

                  <MultiSelectField
                    label="Accessibility Needs"
                    options={accessibilityOptions}
                    value={profile.accessibilityNeeds}
                    field="accessibilityNeeds"
                    placeholder="Select any accessibility requirements"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medical Conditions
                    </label>
                    <textarea
                      rows="3"
                      value={profile.medicalConditions}
                      onChange={(e) =>
                        handleInputChange("medicalConditions", e.target.value)
                      }
                      disabled={!isEditing}
                      placeholder="Any medical conditions to consider while traveling..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Emergency Contact
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Name
                        </label>
                        <input
                          type="text"
                          value={profile.emergencyContact.name}
                          onChange={(e) =>
                            handleInputChange(
                              "emergencyContact.name",
                              e.target.value
                            )
                          }
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Phone
                        </label>
                        <input
                          type="tel"
                          value={profile.emergencyContact.phone}
                          onChange={(e) =>
                            handleInputChange(
                              "emergencyContact.phone",
                              e.target.value
                            )
                          }
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Relationship
                        </label>
                        <input
                          type="text"
                          value={profile.emergencyContact.relationship}
                          onChange={(e) =>
                            handleInputChange(
                              "emergencyContact.relationship",
                              e.target.value
                            )
                          }
                          disabled={!isEditing}
                          placeholder="e.g., Spouse, Parent, Friend"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Travel History Section */}
              {activeSection === "history" && (
                <div className="space-y-6">
                  <MultiSelectField
                    label="Favorite Destinations"
                    options={[
                      "Paris",
                      "Tokyo",
                      "New York",
                      "London",
                      "Bali",
                      "Rome",
                      "Barcelona",
                    ]}
                    value={profile.favoriteDestinations}
                    field="favoriteDestinations"
                    placeholder="Add places you've loved visiting"
                  />

                  <MultiSelectField
                    label="Bucket List Destinations"
                    options={[
                      "Iceland",
                      "Maldives",
                      "Patagonia",
                      "Morocco",
                      "Nepal",
                      "Norway",
                    ]}
                    value={profile.bucketListDestinations}
                    field="bucketListDestinations"
                    placeholder="Where do you dream of going?"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Travel Style
                      </label>
                      <select
                        value={profile.travelStyle}
                        onChange={(e) =>
                          handleInputChange("travelStyle", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      >
                        <option value="">Select travel style</option>
                        {travelStyles.map((style) => (
                          <option key={style} value={style}>
                            {style}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <MultiSelectField
                    label="Preferred Travel Months"
                    options={months}
                    value={profile.preferredTravelMonths}
                    field="preferredTravelMonths"
                    placeholder="When do you prefer to travel?"
                  />

                  <MultiSelectField
                    label="Language Preferences"
                    options={languages}
                    value={profile.languagePreferences}
                    field="languagePreferences"
                    placeholder="Languages you speak or prefer for tours"
                  />
                </div>
              )}

              {/* Save Button */}
              {isEditing && (
                <div className="text-center mt-8">
                  <button
                    onClick={handleSaveProfile}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center mx-auto"
                  >
                    <Save size={20} className="mr-2" />
                    Save Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Success Notification */}
        {showSuccess && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate-bounce">
            <div className="w-4 h-4 bg-white rounded-full mr-3 flex items-center justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            Profile updated successfully!
          </div>
        )}
      </div>

      <style jsx>{`
        .slider {
          background: linear-gradient(to right, #3b82f6 0%, #8b5cf6 100%);
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: 2px solid #3b82f6;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: 2px solid #3b82f6;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        @keyframes bounce {
          0%,
          20%,
          53%,
          80%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          40%,
          43% {
            transform: translate3d(0, -10px, 0);
          }
          70% {
            transform: translate3d(0, -5px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default ProfileSettings;
