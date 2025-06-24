import React, { useState, useEffect } from 'react';

const ImpactStatsForm = ({ userId }) => {
  // State for form fields
  const [carbonSaved, setCarbonSaved] = useState('');
  const [treesPlanted, setTreesPlanted] = useState('');
  const [distanceCovered, setDistanceCovered] = useState('');
  const [communitiesSupported, setCommunitiesSupported] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const accessToken = localStorage.getItem('accessToken');

  // Fetch existing impact stats on mount to prefill form (if exists)
  useEffect(() => {
    if (!userId || !accessToken) return;

    setLoading(true);
    fetch(`https://ecowheel-backend-5p47.onrender.com/impact-stats/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Impact stats not found');
        }
        const data = await res.json();
        // Prefill form with existing data if the impact stats belong to this user
        if (data.user === userId) {
          setCarbonSaved(data.carbon_saved_kg);
          setTreesPlanted(data.trees_planted);
          setDistanceCovered(data.distance_covered_km);
          setCommunitiesSupported(data.communities_supported);
        }
      })
      .catch((err) => {
        console.log('No existing impact stats found or error:', err.message);
      })
      .finally(() => setLoading(false));
  }, [userId, accessToken]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    const impactData = {
      user: userId,
      carbon_saved_kg: parseFloat(carbonSaved),
      trees_planted: parseInt(treesPlanted),
      distance_covered_km: parseFloat(distanceCovered),
      communities_supported: parseInt(communitiesSupported),
    };

    try {
      // Try PUT first to update (if it exists), fallback to POST to create
      const putResponse = await fetch(`https://ecowheel-backend-5p47.onrender.com/impact-stats/`, {
        method: 'PUT', // you may want to use PATCH if partial update is allowed
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(impactData),
      });

      if (putResponse.ok) {
        const data = await putResponse.json();
        setSuccessMsg('Impact stats updated successfully!');
      } else if (putResponse.status === 404) {
        // If no existing impact stats, create with POST
        const postResponse = await fetch(`https://ecowheel-backend-5p47.onrender.com/impact-stats/`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(impactData),
        });
        if (!postResponse.ok) {
          const errData = await postResponse.json();
          throw new Error(errData.detail || 'Failed to create impact stats');
        }
        const postData = await postResponse.json();
        setSuccessMsg('Impact stats created successfully!');
      } else {
        const errData = await putResponse.json();
        throw new Error(errData.detail || 'Failed to update impact stats');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!userId) return <p>No user selected for impact stats.</p>;
  if (!accessToken) return <p>You must be logged in.</p>;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
      <h2>Impact Stats for User {userId}</h2>

      <label>
        Carbon Saved (kg):
        <input
          type="number"
          step="0.01"
          value={carbonSaved}
          onChange={(e) => setCarbonSaved(e.target.value)}
          required
        />
      </label>

      <label>
        Trees Planted:
        <input
          type="number"
          value={treesPlanted}
          onChange={(e) => setTreesPlanted(e.target.value)}
          required
        />
      </label>

      <label>
        Distance Covered (km):
        <input
          type="number"
          step="0.01"
          value={distanceCovered}
          onChange={(e) => setDistanceCovered(e.target.value)}
          required
        />
      </label>

      <label>
        Communities Supported:
        <input
          type="number"
          value={communitiesSupported}
          onChange={(e) => setCommunitiesSupported(e.target.value)}
          required
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Impact Stats'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
    </form>
  );
};

export default ImpactStatsForm;
