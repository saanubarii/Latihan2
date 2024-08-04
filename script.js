document.getElementById('roastBtn').addEventListener('click', function() {
  const username = document.getElementById('username').value;
  if (username) {
      roastProfile(username);
  }
});

async function roastProfile(username) {
  try {
      // Pseudo code to fetch Instagram profile data (replace with actual implementation)
      const profileData = {
          username: username,
          bio: "Sample bio for " + username,
          posts: ["Post 1", "Post 2", "Post 3"]
      };

      // Send profile data to server for roasting
      const response = await fetch('/roast', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(profileData)
      });

      const data = await response.json();
      document.getElementById('roastOutput').innerText = data.roastText;
  } catch (error) {
      console.error('Error:', error);
      document.getElementById('roastOutput').innerText = 'Something went wrong. Please try again.';
  }
    }