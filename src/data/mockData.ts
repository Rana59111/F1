
// Sample video feeds for demonstration
export const videoFeeds = [
  {
    id: "cam-001",
    name: "Main Entrance",
    source: "https://assets.mixkit.co/videos/preview/mixkit-people-walking-in-the-street-seen-in-time-lapse-4077-large.mp4",
    hasAlert: true
  },
  {
    id: "cam-002",
    name: "Parking Lot",
    source: "https://assets.mixkit.co/videos/preview/mixkit-security-camera-capturing-a-parking-lot-at-night-34851-large.mp4",
    hasAlert: false
  },
  {
    id: "cam-003",
    name: "Lobby",
    source: "https://assets.mixkit.co/videos/preview/mixkit-time-lapse-of-people-walking-in-a-mall-4820-large.mp4",
    hasAlert: false
  },
  {
    id: "cam-004",
    name: "Storage Area",
    source: "https://assets.mixkit.co/videos/preview/mixkit-view-of-a-big-commercial-warehouse-4249-large.mp4",
    hasAlert: true
  }
];

// Sample alerts for demonstration
export const alerts = [
  {
    id: "alert-001",
    title: "Unauthorized Person Detected",
    description: "Unknown individual detected in restricted area.",
    location: "Storage Area",
    timestamp: "2 min ago",
    severity: "critical",
    cameraId: "cam-004"
  },
  {
    id: "alert-002",
    title: "Suspicious Behavior",
    description: "Person loitering near main entrance for extended period.",
    location: "Main Entrance",
    timestamp: "5 min ago",
    severity: "warning",
    cameraId: "cam-001"
  },
  {
    id: "alert-003",
    title: "Object Left Behind",
    description: "Unattended package detected in lobby area.",
    location: "Lobby",
    timestamp: "15 min ago",
    severity: "info",
    cameraId: "cam-003"
  },
  {
    id: "alert-004",
    title: "Camera Tamper Attempt",
    description: "Possible tampering detected on security camera.",
    location: "Parking Lot",
    timestamp: "30 min ago",
    severity: "warning",
    cameraId: "cam-002"
  }
];

// Function to simulate new alerts coming in
export const generateRandomAlert = () => {
  const locations = ["Main Entrance", "Parking Lot", "Lobby", "Storage Area"];
  const severities = ["critical", "warning", "info"];
  const titles = [
    "Unauthorized Person Detected",
    "Suspicious Behavior",
    "Object Left Behind",
    "Camera Tamper Attempt",
    "Crowd Forming",
    "Possible Weapon Detected",
    "Smoke Detected"
  ];
  const descriptions = [
    "Unknown individual detected in restricted area.",
    "Person loitering for extended period.",
    "Unattended package detected.",
    "Possible tampering detected on security camera.",
    "Unusual crowd gathering detected.",
    "Potential weapon identified.",
    "Smoke or fire hazard detected."
  ];

  const randomLocation = locations[Math.floor(Math.random() * locations.length)];
  const randomSeverity = severities[Math.floor(Math.random() * severities.length)];
  const randomTitle = titles[Math.floor(Math.random() * titles.length)];
  const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
  const randomCameraId = `cam-00${Math.floor(Math.random() * 4) + 1}`;

  return {
    id: `alert-${Date.now()}`,
    title: randomTitle,
    description: randomDesc,
    location: randomLocation,
    timestamp: "Just now",
    severity: randomSeverity,
    cameraId: randomCameraId
  };
};
