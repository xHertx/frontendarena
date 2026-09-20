import Papa from 'papaparse';

const parseCSV = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      ...options,
      complete: (results) => {
        resolve(results.data);
      },
      error: (err) => {
        reject(err);
      }
    });
  });
};

export const loadAndProcessData = async () => {
  const storyLine = [];

  try {
    const [spotifyData, householdData, indiaData] = await Promise.all([
      parseCSV('/data/spotify_history.csv', { preview: 100 }),
      parseCSV('/data/household_transactions.csv', { preview: 100 }),
      parseCSV('/data/india_transactions.csv', { preview: 100 })
    ]);

    // Helper to format spotify
    const formatSpotify = (row, id) => ({
      id: `spotify-${id}`,
      type: "music",
      timestamp: row['ts'],
      title: row['track_name'],
      subtitle: row['artist_name'],
      metadata: `${(parseInt(row['ms_played']) / 60000).toFixed(1)} mins`,
      color: "var(--accent-indigo)"
    });

    // Helper to format household
    const formatHousehold = (row, id) => ({
      id: `house-${id}`,
      type: "purchase",
      timestamp: row['Date'],
      title: `${row['Category']} - ${row['Subcategory']}`,
      subtitle: row['Note'] || "Daily Expense",
      amount: `${row['Currency']} ${row['Amount']}`,
      metadata: row['Mode'],
      color: "var(--accent-teal)"
    });

    // Helper to format india trans
    const formatIndia = (row, id) => ({
      id: `india-${id}`,
      type: "event",
      timestamp: row['trans_date_trans_time'],
      title: (row.category || 'Event').charAt(0).toUpperCase() + (row.category || '').slice(1),
      subtitle: row['merchant'],
      amount: `INR ${row['amt']}`,
      metadata: `${row['city']}, ${row['state']}`,
      color: "var(--accent-rose)"
    });


    // --- SYNTHESIZE CHAPTER 1: The Midnight Oil ---
    storyLine.push({
      id: 'insight-1',
      isInsight: true,
      title: 'Chapter I: The Midnight Oil',
      text: 'You were burning the midnight oil, fueled by caffeine and ambient beats.',
      color: 'var(--text-primary)'
    });

    // Add a household purchase for food/snacks
    const snack = householdData.find(r => r.Category === 'Food');
    if (snack) storyLine.push(formatHousehold(snack, 'ch1-1'));

    // Add 2 late night spotify tracks (using first few as proxy for focus music)
    if (spotifyData[0]) storyLine.push(formatSpotify(spotifyData[0], 'ch1-2'));
    if (spotifyData[1]) storyLine.push(formatSpotify(spotifyData[1], 'ch1-3'));


    // --- SYNTHESIZE CHAPTER 2: The Weekend Escape ---
    storyLine.push({
      id: 'insight-2',
      isInsight: true,
      title: 'Chapter II: The Escape',
      text: 'A sudden change of pace. New coordinates, new sounds, new flavors.',
      color: 'var(--text-primary)'
    });

    // Add a transport transaction
    const transport = householdData.find(r => r.Category === 'Transportation');
    if (transport) storyLine.push(formatHousehold(transport, 'ch2-1'));

    // Add upbeat music (e.g. Calvin Harris from row 1)
    if (spotifyData[2]) storyLine.push(formatSpotify(spotifyData[2], 'ch2-2'));

    // Add dining in another city
    const dining = indiaData.find(r => r.category === 'dining');
    if (dining) storyLine.push(formatIndia(dining, 'ch2-3'));


    // --- SYNTHESIZE CHAPTER 3: Familiar Comforts ---
    storyLine.push({
      id: 'insight-3',
      isInsight: true,
      title: 'Chapter III: Familiar Comforts',
      text: 'Retreating into the routine. Digital subscriptions and songs played on repeat.',
      color: 'var(--text-primary)'
    });

    // Add a subscription
    const sub = householdData.find(r => r.Category === 'subscription' || r.Category === 'Subscription');
    if (sub) storyLine.push(formatHousehold(sub, 'ch3-1'));

    // Add repeated tracks (Lana Del Rey from row 2 & 3)
    if (spotifyData[3]) storyLine.push(formatSpotify(spotifyData[3], 'ch3-2'));
    if (spotifyData[4]) storyLine.push(formatSpotify(spotifyData[4], 'ch3-3'));

  } catch (err) {
    console.error("Failed to parse data:", err);
  }

  return storyLine;
};
