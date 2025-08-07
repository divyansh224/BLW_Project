const db = require("./db/database");

const assetData = [
  { id: 'AS101', name: 'Hydraulic Press', category: 'Machinery', location: 'Shed A', status: 'Active', lastMaintenance: '2025-06-20', purchaseDate: '2024-05-01', warrantyExpiry: '2026-05-01', assignedUser: 'Unassigned' },
  { id: 'AS102', name: 'RFID Scanner', category: 'IT Equipment', location: 'Office Block', status: 'Inactive', lastMaintenance: '2025-05-12', purchaseDate: '2024-04-15', warrantyExpiry: '2026-04-15', assignedUser: 'Unassigned' },
  { id: 'BLW-1001', name: 'CNC Lathe Machine', category: 'Machinery', location: 'Tooling Section', status: 'Active', lastMaintenance: '2025-07-01', purchaseDate: '2024-06-20', warrantyExpiry: '2026-06-20', assignedUser: 'Unassigned' },
  { id: 'BLW-1002', name: 'Turbocharger Unit', category: 'Locomotive Component', location: 'Assembly Line B', status: 'Under Repair', lastMaintenance: '2025-06-28', purchaseDate: '2024-06-01', warrantyExpiry: '2026-06-01', assignedUser: 'Unassigned' },
  { id: 'BLW-1003', name: 'RFID Scanner', category: 'Digital Tool', location: 'Gate Entry Office', status: 'Inactive', lastMaintenance: '2025-05-21', purchaseDate: '2024-05-10', warrantyExpiry: '2026-05-10', assignedUser: 'Unassigned' },
  { id: 'BLW-1004', name: 'Welding Kit', category: 'Safety Equipment', location: 'Fabrication Zone', status: 'Active', lastMaintenance: '2025-06-14', purchaseDate: '2024-04-30', warrantyExpiry: '2026-04-30', assignedUser: 'Unassigned' },
  { id: 'BLW-1005', name: 'Workstation PC', category: 'IT Equipment', location: 'Design Office', status: 'Active', lastMaintenance: '2025-07-02', purchaseDate: '2024-05-25', warrantyExpiry: '2026-05-25', assignedUser: 'Unassigned' },
  { id: 'BLW-1006', name: 'Gearbox Assembly', category: 'Locomotive Component', location: 'Testing Bay', status: 'In Transit', lastMaintenance: '2025-06-19', purchaseDate: '2024-06-10', warrantyExpiry: '2026-06-10', assignedUser: 'Unassigned' },
  { id: 'FURN-ADM-001', name: 'Executive Desk', category: 'Furniture', location: 'Admin Block', status: 'Active', lastMaintenance: '2025-07-05', purchaseDate: '2024-05-15', warrantyExpiry: '2026-05-15', assignedUser: 'Unassigned' },
  { id: 'FURN-ADM-002', name: 'Office Chair', category: 'Furniture', location: 'Admin Block', status: 'Active', lastMaintenance: '2025-06-30', purchaseDate: '2024-04-20', warrantyExpiry: '2026-04-20', assignedUser: 'Unassigned' },
  { id: 'FURN-HR-001', name: 'Meeting Table', category: 'Furniture', location: 'HR Office', status: 'Active', lastMaintenance: '2025-07-03', purchaseDate: '2024-06-01', warrantyExpiry: '2026-06-01', assignedUser: 'Unassigned' },
  { id: 'FURN-HR-002', name: 'Visitor Sofa', category: 'Furniture', location: 'HR Lobby', status: 'Active', lastMaintenance: '2025-06-18', purchaseDate: '2024-05-05', warrantyExpiry: '2026-05-05', assignedUser: 'Unassigned' },
  { id: 'FURN-TECH-001', name: 'Tool Cabinet', category: 'Furniture', location: 'Workshop A', status: 'Active', lastMaintenance: '2025-07-01', purchaseDate: '2024-04-18', warrantyExpiry: '2026-04-18', assignedUser: 'Unassigned' },
  { id: 'FURN-TECH-002', name: 'Stool Set', category: 'Furniture', location: 'Workshop B', status: 'Active', lastMaintenance: '2025-06-25', purchaseDate: '2024-05-12', warrantyExpiry: '2026-05-12', assignedUser: 'Unassigned' },
  { id: 'FURN-IT-001', name: 'Server Rack', category: 'Furniture', location: 'Data Center', status: 'Active', lastMaintenance: '2025-07-04', purchaseDate: '2024-06-20', warrantyExpiry: '2026-06-20', assignedUser: 'Unassigned' },
  { id: 'FURN-IT-002', name: 'Monitor Stand', category: 'Furniture', location: 'IT Workspace', status: 'Active', lastMaintenance: '2025-06-20', purchaseDate: '2024-06-10', warrantyExpiry: '2026-06-10', assignedUser: 'Unassigned' }
];

const query = `INSERT INTO assets (id, name, category, location, status, lastMaintenance, purchaseDate, warrantyExpiry, assignedUser)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

assetData.forEach(asset => {
  db.run(query, [
    asset.id,
    asset.name,
    asset.category,
    asset.location,
    asset.status,
    asset.lastMaintenance,
    asset.purchaseDate,
    asset.warrantyExpiry,
    asset.assignedUser
  ], err => {
    if (err) console.error(`❌ Failed to insert ${asset.id}:`, err.message);
    else console.log(`✅ Inserted ${asset.id}`);
  });
});