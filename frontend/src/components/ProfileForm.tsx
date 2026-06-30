import React, { useState, useEffect } from 'react';
import { profileService } from '@/services/profileService';
import type { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProfileFormProps {
  userId: string;
  onProfileSaved?: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ userId, onProfileSaved }) => {
  const [profile, setProfile] = useState<Partial<Profile>>({
    user_id: userId,
    health_conditions: [],
    allergies: [],
    dietary_restrictions: []
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // Input states for new items
  const [newCondition, setNewCondition] = useState('');
  const [newAllergy, setNewAllergy] = useState('');
  const [newRestriction, setNewRestriction] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedProfile = await profileService.getProfile(userId);
        if (savedProfile) {
          setProfile(savedProfile);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        // Initialize with user_id if no profile exists
        setProfile(prev => ({ ...prev, user_id: userId }));
      }
    };

    loadProfile();
  }, [userId]);

  const handleSave = async () => {
    setLoading(true);
    try {
      if (profile.user_id) {
        await profileService.upsertProfile({
          user_id: profile.user_id,
          health_conditions: profile.health_conditions || [],
          allergies: profile.allergies || [],
          dietary_restrictions: profile.dietary_restrictions || [],
          updated_at: new Date().toISOString()
        });
        setSaved(true);
        onProfileSaved?.();
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper functions to add/remove items from arrays
  const addItem = (field: keyof Profile, value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    if (value.trim()) {
      setProfile(prev => ({
        ...prev,
        [field]: [...((prev[field] as string[]) || []), value.trim()]
      }));
      setter('');
    }
  };

  const removeItem = (field: keyof Profile, index: number) => {
    setProfile(prev => ({
      ...prev,
      [field]: ((prev[field] as string[]) || []).filter((_, i) => i !== index)
    }));
  };

interface ProfileFormSectionProps {
  title: string;
  field: keyof Profile;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  profile: Partial<Profile>;
  addItem: (field: keyof Profile, value: string, setter: React.Dispatch<React.SetStateAction<string>>) => void;
  removeItem: (field: keyof Profile, index: number) => void;
}

const ProfileFormSection: React.FC<ProfileFormSectionProps> = ({
  title,
  field,
  value,
  setValue,
  placeholder,
  profile,
  addItem,
  removeItem
}) => (
  <div className="mb-6 p-4 border rounded-lg">
    <h4 className="font-semibold mb-3 text-lg">{title}</h4>
    <div className="flex gap-2 mb-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-3 py-2 border rounded-md"
        aria-label={title}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addItem(field, value, setValue);
          }
        }}
      />
      <button
        onClick={() => addItem(field, value, setValue)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        type="button"
      >
        Add
      </button>
    </div>
    <div className="flex flex-wrap gap-2">
      {((profile[field] as string[]) || []).map((item, index) => (
        <span
          key={index}
          className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
        >
          {item}
          <button
            onClick={() => removeItem(field, index)}
            className="text-red-500 hover:text-red-700 text-lg font-bold"
            type="button"
          >
            ×
          </button>
        </span>
      ))}
    </div>
  </div>
);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Health Profile</h2>
      
      <ProfileFormSection
        title="Health Conditions"
        field="health_conditions"
        value={newCondition}
        setValue={setNewCondition}
        placeholder="e.g., Diabetes, Hypertension"
        profile={profile}
        addItem={addItem}
        removeItem={removeItem}
      />
      
      <ProfileFormSection
        title="Allergies"
        field="allergies"
        value={newAllergy}
        setValue={setNewAllergy}
        placeholder="e.g., Peanuts, Gluten, Dairy"
        profile={profile}
        addItem={addItem}
        removeItem={removeItem}
      />
      
      <ProfileFormSection
        title="Dietary Restrictions"
        field="dietary_restrictions"
        value={newRestriction}
        setValue={setNewRestriction}
        placeholder="e.g., Vegetarian, Vegan, Low-sodium"
        profile={profile}
        addItem={addItem}
        removeItem={removeItem}
      />

      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          type="button"
        >
          {loading ? 'Saving...' : 'Save Health Profile'}
        </button>
        
        {saved && (
          <div className="mt-3 p-2 bg-green-100 text-green-700 rounded text-center">
            Profile saved successfully! Your product analysis will now be personalized.
          </div>
        )}
      </div>
    </div>
  );
};