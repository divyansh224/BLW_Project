document.addEventListener("DOMContentLoaded", function () {
  // Redirect if not logged in
  const user = localStorage.getItem('user_id');
  if (!user) {
    window.location.href = 'login.html';
  }
  document.getElementById('username').textContent = user;

  // Initial asset load
  fetchAndDisplayAssets();

  // Attach event listeners
  document.getElementById('searchInput').addEventListener('input', handleSearch);
  document.getElementById("assetForm").addEventListener("submit", handleAssetRegistration);
  document.getElementById("editAssetForm").addEventListener("submit", handleAssetUpdate);
  document.getElementById("maintenanceForm").addEventListener("submit", handleMaintenanceLog);
  
  const profileImage = document.getElementById("profileImage");
  const profileModal = document.getElementById("profileModal");
  profileImage.addEventListener("click", () => profileModal.classList.remove("hidden"));
  profileModal.addEventListener("click", () => profileModal.classList.add("hidden"));
});

let assetData = []; // This will hold the live data from the server

// 🌐 Fetch all assets and render the table
async function fetchAndDisplayAssets() {
  try {
    const response = await fetch("http://localhost:3000/assets");
    if (!response.ok) throw new Error('Failed to fetch assets');
    
    let data = await response.json();
    
    // Process data to create the final lastMaintenance string
    assetData = data.map(asset => {
      if (asset.lastLogDate && asset.lastLogTechnician) {
        asset.lastMaintenance = `${asset.lastLogDate} by ${asset.lastLogTechnician}`;
      } else {
        asset.lastMaintenance = asset.lastMaintenance || "N/A";
      }
      return asset;
    });

    populateTable(assetData);
  } catch (err) {
    console.error("Error fetching assets:", err);
  }
}

// 🧱 Render the table with data
function populateTable(data) {
  const tbody = document.getElementById("assetTableBody");
  tbody.innerHTML = "";
  data.forEach(asset => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="py-2 px-4">${asset.id}</td>
      <td class="py-2 px-4">${asset.name}</td>
      <td class="py-2 px-4">${asset.category}</td>
      <td class="py-2 px-4">${asset.location}</td>
      <td class="py-2 px-4">${asset.status}</td>
      <td class="py-2 px-4">${asset.lastMaintenance}</td>
      <td class="py-2 px-4">
        <button class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm mr-2" onclick="openEditModal('${asset.id}')">Edit</button>
        <button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm" onclick="openMaintenanceModal('${asset.id}')">Log Maintenance</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// 🔍 Handle search input
function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  const filtered = assetData.filter(asset =>
    Object.values(asset).some(val =>
      String(val).toLowerCase().includes(searchTerm)
    )
  );
  populateTable(filtered);
}

// 🚀 Handle new asset registration
async function handleAssetRegistration(e) {
  e.preventDefault();
  const form = e.target;
  const newAsset = {
    id: form.querySelector("#assetId").value,
    name: form.querySelector("#name").value,
    category: form.querySelector("#category").value,
    location: form.querySelector("#location").value,
    status: form.querySelector("#status").value,
    lastMaintenance: form.querySelector("#lastMaintenance").value,
    purchaseDate: form.querySelector("#purchaseDate").value || null,
    warrantyExpiry: form.querySelector("#warrantyExpiry").value || null,
    assignedUser: form.querySelector("#assignedUser").value || "Unassigned"
  };

  try {
    const response = await fetch("http://localhost:3000/assets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAsset)
    });
    if (!response.ok) throw new Error('Registration failed');
    
    console.log("✅ Asset registered");
    fetchAndDisplayAssets(); // Refresh the table with server data
    closeAssetModal();
    form.reset();
  } catch (err) {
    console.error("❌ Registration error:", err);
    alert("Failed to register asset.");
  }
}

// 📝 Handle asset updates
async function handleAssetUpdate(e) {
  e.preventDefault();
  const form = e.target;
  const assetId = form.dataset.assetId;
  const updatedAsset = {
    name: form.querySelector("#editName").value,
    category: form.querySelector("#editCategory").value,
    location: form.querySelector("#editLocation").value,
    status: form.querySelector("#editStatus").value,
    lastMaintenance: form.querySelector("#editLastMaintenance").value
  };

  try {
    const response = await fetch(`http://localhost:3000/assets/${assetId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedAsset)
    });
    if (!response.ok) throw new Error('Update failed');

    console.log("✏️ Asset updated");
    fetchAndDisplayAssets(); // Refresh the table
    closeEditModal();
  } catch (err) {
    console.error("❌ Update error:", err);
    alert("Failed to update asset.");
  }
}

// 🛠️ Handle maintenance logging
async function handleMaintenanceLog(e) {
  e.preventDefault();
  const form = e.target;
  const assetId = form.dataset.assetId;
  const logEntry = {
    assetId: assetId,
    description: form.querySelector("#maintDescription").value,
    technician: form.querySelector("#maintTechnician").value,
    date: form.querySelector("#maintDate").value
  };

  try {
    const response = await fetch("http://localhost:3000/maintenance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logEntry)
    });
    if (!response.ok) throw new Error('Log failed');

    console.log("🧰 Maintenance logged");
    fetchAndDisplayAssets(); // Refresh to show updated maintenance date
    closeMaintenanceModal();
    form.reset();
  } catch (err) {
    console.error("❌ Maintenance error:", err);
    alert("Failed to log maintenance.");
  }
}

// --- Modal Control Functions ---
function openAssetModal() { document.getElementById("assetModal").classList.remove("hidden"); }
function closeAssetModal() { document.getElementById("assetModal").classList.add("hidden"); }
function closeEditModal() { document.getElementById("editAssetModal").classList.add("hidden"); }
function closeMaintenanceModal() { document.getElementById("maintenanceModal").classList.add("hidden"); }

function openEditModal(id) {
  const asset = assetData.find(a => a.id === id);
  if (!asset) return;
  
  const form = document.getElementById('editAssetForm');
  form.dataset.assetId = id; // Store the ID on the form
  form.querySelector("#editName").value = asset.name;
  form.querySelector("#editCategory").value = asset.category;
  form.querySelector("#editLocation").value = asset.location;
  form.querySelector("#editStatus").value = asset.status;

  const datePart = asset.lastMaintenance.split(' ')[0];
  if (datePart && !isNaN(new Date(datePart))) {
    form.querySelector('#editLastMaintenance').value = datePart;
  } else {
    form.querySelector('#editLastMaintenance').value = asset.lastMaintenance;
  }
  
  document.getElementById('editAssetModal').classList.remove('hidden');
}

function openMaintenanceModal(assetId) {
  document.getElementById('maintenanceForm').dataset.assetId = assetId;
  document.getElementById("maintenanceModal").classList.remove("hidden");
}

// --- Utility Functions ---
function printSearchedAsset() {
  const searchValue = document.getElementById("searchInput").value.trim().toLowerCase();
  const foundAsset = assetData.find(asset => asset.id.toLowerCase().includes(searchValue) || asset.name.toLowerCase().includes(searchValue));
  
  if (foundAsset) {
    window.open(`http://localhost:3000/reports/assets/${foundAsset.id}`, "_blank");
  } else {
    alert("Asset not found. Please enter a full ID or name to print.");
  }
}

function logout() {
  localStorage.removeItem("user_id");
  window.location.href = "login.html";
}