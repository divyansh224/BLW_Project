// File: seed.js
 const sqlite3 = require('sqlite3').verbose();
//const db = require('./inventory.db');
const db = new sqlite3.Database('./inventory.db');
// Replace this sample with your actual inventory data
//c//onst db = require('./inventory');

const parts = [
  { rfid: 'RFID-1001', name: 'Traction Motor Frame', department: 'Mechanical', in_use: 28, in_repair: 3, available: 15 },
  { rfid: 'RFID-1002', name: 'Axle', department: 'Mechanical', in_use: 30, in_repair: 5, available: 22 },
  { rfid: 'RFID-1003', name: 'Gear Box Housing', department: 'Mechanical', in_use: 25, in_repair: 7, available: 10 },
  { rfid: 'RFID-1004', name: 'Brake Cylinder', department: 'Mechanical', in_use: 32, in_repair: 2, available: 18 },
  { rfid: 'RFID-1005', name: 'Bearing Cap', department: 'Mechanical', in_use: 40, in_repair: 4, available: 30 },
  { rfid: 'RFID-1006', name: 'Bogies', department: 'Mechanical', in_use: 18, in_repair: 2, available: 5 },
  { rfid: 'RFID-1007', name: 'Couplers', department: 'Mechanical', in_use: 20, in_repair: 3, available: 12 },
  { rfid: 'RFID-1008', name: 'Wheel Sets', department: 'Mechanical', in_use: 24, in_repair: 5, available: 10 },
  { rfid: 'RFID-1009', name: 'Buffer Assembly', department: 'Mechanical', in_use: 12, in_repair: 1, available: 9 },
  { rfid: 'RFID-1010', name: 'Radiator Fan', department: 'Mechanical', in_use: 15, in_repair: 4, available: 8 },
  { rfid: 'RFID-1011', name: 'Motor Mount Bracket', department: 'Mechanical', in_use: 20, in_repair: 3, available: 14 },
  { rfid: 'RFID-1012', name: 'Air Reservoir', department: 'Mechanical', in_use: 18, in_repair: 2, available: 20 },
  { rfid: 'RFID-1013', name: 'Sand Box', department: 'Mechanical', in_use: 14, in_repair: 1, available: 12 },
  { rfid: 'RFID-1014', name: 'Axle Box Housing', department: 'Mechanical', in_use: 9, in_repair: 2, available: 6 },
  { rfid: 'RFID-1015', name: 'Brake Shoe', department: 'Mechanical', in_use: 50, in_repair: 0, available: 40 },
  { rfid: 'RFID-1016', name: 'Suspension Spring', department: 'Mechanical', in_use: 24, in_repair: 1, available: 18 },
  { rfid: 'RFID-1017', name: 'Equalizing Beam', department: 'Mechanical', in_use: 11, in_repair: 2, available: 9 },
  { rfid: 'RFID-1018', name: 'Side Bearer', department: 'Mechanical', in_use: 17, in_repair: 1, available: 13 },
  { rfid: 'RFID-1019', name: 'Brake Hanger', department: 'Mechanical', in_use: 8, in_repair: 0, available: 7 },
  { rfid: 'RFID-1020', name: 'Traction Bar', department: 'Mechanical', in_use: 6, in_repair: 1, available: 4 },
  { rfid: 'RFID-1021', name: 'Traction Motor', department: 'Electrical', in_use: 26, in_repair: 6, available: 14 },
  { rfid: 'RFID-1022', name: 'Armature Coil', department: 'Electrical', in_use: 30, in_repair: 5, available: 20 },
  { rfid: 'RFID-1023', name: 'Rectifier Unit', department: 'Electrical', in_use: 17, in_repair: 2, available: 11 },
  { rfid: 'RFID-1024', name: 'Circuit Breaker', department: 'Electrical', in_use: 22, in_repair: 1, available: 18 },
  { rfid: 'RFID-1025', name: 'Control Panel', department: 'Electrical', in_use: 15, in_repair: 3, available: 6 },
  { rfid: 'RFID-1026', name: 'Power Converter', department: 'Electrical', in_use: 19, in_repair: 2, available: 13 },
  { rfid: 'RFID-1027', name: 'Pantograph', department: 'Electrical', in_use: 10, in_repair: 1, available: 7 },
  { rfid: 'RFID-1028', name: 'Insulator', department: 'Electrical', in_use: 20, in_repair: 0, available: 15 },
  { rfid: 'RFID-1029', name: 'Cable Harness', department: 'Electrical', in_use: 35, in_repair: 4, available: 25 },
  { rfid: 'RFID-1030', name: 'Battery Set', department: 'Electrical', in_use: 12, in_repair: 2, available: 9 },
  { rfid: 'RFID-1031', name: 'Blower Motor', department: 'Electrical', in_use: 16, in_repair: 1, available: 11 },
  { rfid: 'RFID-1032', name: 'Power Contactor', department: 'Electrical', in_use: 9, in_repair: 1, available: 5 },
  { rfid: 'RFID-1033', name: 'Intercooler Fan Motor', department: 'Electrical', in_use: 8, in_repair: 0, available: 6 },
  { rfid: 'RFID-1034', name: 'Fuse Box', department: 'Electrical', in_use: 18, in_repair: 1, available: 14 },
  { rfid: 'RFID-1035', name: 'Busbar', department: 'Electrical', in_use: 10, in_repair: 2, available: 12 },
  { rfid: 'RFID-1041', name: 'Welding Torch', department: 'Repair & Overhaul', in_use: 8, in_repair: 1, available: 7 },
  { rfid: 'RFID-1042', name: 'Hydraulic Press', department: 'Repair & Overhaul', in_use: 6, in_repair: 2, available: 4 },
  { rfid: 'RFID-1043', name: 'Drilling Machine', department: 'Repair & Overhaul', in_use: 5, in_repair: 2, available: 3 },
  { rfid: 'RFID-1044', name: 'Lifting Jack', department: 'Repair & Overhaul', in_use: 9, in_repair: 1, available: 6 },
  { rfid: 'RFID-1045', name: 'Grinding Machine', department: 'Repair & Overhaul', in_use: 4, in_repair: 1, available: 2 },
  { rfid: 'RFID-1061', name: 'Welding Rod', department: 'Welding Shop', in_use: 100, in_repair: 0, available: 50 },
  { rfid: 'RFID-1062', name: 'Welding Machine', department: 'Welding Shop', in_use: 10, in_repair: 2, available: 8 },
  { rfid: 'RFID-1063', name: 'Welding Helmet', department: 'Welding Shop', in_use: 15, in_repair: 1, available: 20 },
  { rfid: 'RFID-1081', name: 'Insulation Tester', department: 'Testing Lab', in_use: 6, in_repair: 0, available: 3 },
  { rfid: 'RFID-1082', name: 'High Voltage Tester', department: 'Testing Lab', in_use: 4, in_repair: 1, available: 2 },
  { rfid: 'RFID-1083', name: 'Resistance Meter', department: 'Testing Lab', in_use: 7, in_repair: 2, available: 5 },
 // { rfid: 'RFID-1101', name: 'Nut & Bolts Set', department: 'Assembly', in_use: 120, in_repair: 0, available: 100 },
  { rfid: 'RFID-1101', name: 'Nut & Bolts Set', department: 'Assembly', in_use: 120, in_repair: 0, available: 100 },
  { rfid: 'RFID-1102', name: 'Spring Washer', department: 'Assembly', in_use: 85, in_repair: 0, available: 75 },
  { rfid: 'RFID-1121', name: 'Lubricant Oil', department: 'Stores', in_use: 80, in_repair: 0, available: 60 },
  { rfid: 'RFID-1122', name: 'Coolant', department: 'Stores', in_use: 70, in_repair: 0, available: 55 },
  { rfid: 'RFID-1123', name: 'Cleaning Solvent', department: 'Stores', in_use: 45, in_repair: 0, available: 40 },
  { rfid: 'RFID-1124', name: 'Grease Gun', department: 'Stores', in_use: 25, in_repair: 1, available: 20 },
  { rfid: 'RFID-1125', name: 'Safety Gloves', department: 'Stores', in_use: 150, in_repair: 0, available: 200 },
  { rfid: 'RFID-1126', name: 'Packing Material', department: 'Stores', in_use: 280, in_repair: 0, available: 300 },
  { rfid: 'RFID-1127', name: 'Identification Tags', department: 'Stores', in_use: 120, in_repair: 0, available: 100 },
  { rfid: 'RFID-1128', name: 'Toolbox', department: 'Stores', in_use: 10, in_repair: 1, available: 10 },
  { rfid: 'RFID-1129', name: 'Spare Keys', department: 'Stores', in_use: 35, in_repair: 0, available: 30 },
  { rfid: 'RFID-1130', name: 'Inventory Bin', department: 'Stores', in_use: 55, in_repair: 0, available: 50 },
  { rfid: 'RFID-1201', name: 'Side Frame', department: 'Mechanical', in_use: 22, in_repair: 2, available: 18 },
  { rfid: 'RFID-1202', name: 'Traction Link', department: 'Mechanical', in_use: 18, in_repair: 1, available: 12 },
  { rfid: 'RFID-1203', name: 'Bogie Pivot Pin', department: 'Mechanical', in_use: 10, in_repair: 0, available: 7 },
  { rfid: 'RFID-1204', name: 'Buffer Pad', department: 'Mechanical', in_use: 16, in_repair: 1, available: 14 },
  { rfid: 'RFID-1205', name: 'Draft Gear', department: 'Mechanical', in_use: 8, in_repair: 0, available: 5 },
  { rfid: 'RFID-1206', name: 'Center Pivot Bush', department: 'Mechanical', in_use: 6, in_repair: 0, available: 6 },
  { rfid: 'RFID-1207', name: 'Brake Lever', department: 'Mechanical', in_use: 12, in_repair: 1, available: 8 },
  { rfid: 'RFID-1208', name: 'Wheel Hub', department: 'Mechanical', in_use: 14, in_repair: 1, available: 10 },
  { rfid: 'RFID-1209', name: 'Suspension Tube', department: 'Mechanical', in_use: 6, in_repair: 0, available: 4 },
  { rfid: 'RFID-1210', name: 'Axle End Cap', department: 'Mechanical', in_use: 10, in_repair: 1, available: 6 },
  { rfid: 'RFID-1211', name: 'Field Coil', department: 'Electrical', in_use: 20, in_repair: 2, available: 15 },
  { rfid: 'RFID-1212', name: 'Interlock Relay', department: 'Electrical', in_use: 14, in_repair: 1, available: 10 },
  { rfid: 'RFID-1213', name: 'LED Module', department: 'Electrical', in_use: 40, in_repair: 0, available: 30 },
  { rfid: 'RFID-1214', name: 'Fuse Link', department: 'Electrical', in_use: 60, in_repair: 0, available: 50 },
  { rfid: 'RFID-1215', name: 'Control Switch', department: 'Electrical', in_use: 18, in_repair: 2, available: 12 },
  { rfid: 'RFID-1216', name: 'TCMS Processor', department: 'Electrical', in_use: 5, in_repair: 1, available: 3 },
  { rfid: 'RFID-1217', name: 'Switchgear Housing', department: 'Electrical', in_use: 9, in_repair: 0, available: 6 },
  { rfid: 'RFID-1218', name: 'Light Indicator', department: 'Electrical', in_use: 16, in_repair: 0, available: 14 },
  { rfid: 'RFID-1219', name: 'Current Sensor', department: 'Electrical', in_use: 6, in_repair: 0, available: 5 },
  { rfid: 'RFID-1220', name: 'Voltage Detector', department: 'Electrical', in_use: 7, in_repair: 1, available: 4 }
]


db.serialize(() => {
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO inventory
    (rfid, name, department, in_use, in_repair, available)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  parts.forEach(part => {
    stmt.run(part.rfid, part.name, part.department, part.in_use, part.in_repair, part.available);
  });

  stmt.finalize(() => {
    console.log(`✅ Inserted ${parts.length} parts into the database.`);
    console.log("✅ Inventory data seeded successfully.");
    db.close();
  });
});