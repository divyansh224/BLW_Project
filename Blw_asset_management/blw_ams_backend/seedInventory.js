const db = require("./db/database");

 const inventory = {
      "Design Department": [
        { "name": "High-end Desktop Computers", "qty": 12, "mfg": "2024-03-10", "warranty": "2027-03-09", "last_maint": "2025-03-11", "next_maint": "2025-09-11" },
        { "name": "CAD Software Licenses", "qty": 15, "mfg": "2025-01-01", "warranty": "N/A", "last_maint": "2025-07-01", "next_maint": "2026-01-01" },
        { "name": "Drawing Tables", "qty": 6, "mfg": "2018-10-22", "warranty": "2028-10-21", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Laser Printers", "qty": 2, "mfg": "2024-03-10", "warranty": "2026-03-09", "last_maint": "2025-03-12", "next_maint": "2025-09-12" },
        { "name": "A3 Plotters", "qty": 1, "mfg": "2022-08-16", "warranty": "2025-08-15", "last_maint": "2025-02-16", "next_maint": "2025-08-16" },
        { "name": "Ergonomic Chairs", "qty": 12, "mfg": "2024-03-10", "warranty": "2029-03-09", "last_maint": "2025-03-13", "next_maint": "2026-03-13" },
        { "name": "Whiteboard", "qty": 2, "mfg": "2021-09-05", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Notice Board (Magnetic)", "qty": 1, "mfg": "2021-09-05", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "File Cabinets", "qty": 4, "mfg": "2018-10-22", "warranty": "2028-10-21", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Tube Lights", "qty": 16, "mfg": "2022-11-01", "warranty": "2023-10-31", "last_maint": "N/A", "next_maint": "As needed" },
        { "name": "Ceiling Fans", "qty": 6, "mfg": "2018-09-15", "warranty": "2020-09-14", "last_maint": "2025-04-25", "next_maint": "2026-04-25" },
        { "name": "AC Units", "qty": 2, "mfg": "2023-04-14", "warranty": "2025-04-13", "last_maint": "2025-04-16", "next_maint": "2025-10-16" },
        { "name": "Stationery Sets", "qty": 12, "mfg": "2025-07-01", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Measurement Tools", "qty": 10, "mfg": "2023-07-19", "warranty": "N/A", "last_maint": "2025-07-19", "next_maint": "2026-07-19" },
        { "name": "Dustbins", "qty": 4, "mfg": "2021-09-05", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Wall Clocks", "qty": 2, "mfg": "2024-03-01", "warranty": "2025-02-28", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Books/Manuals (IR Standards)", "qty": 25, "mfg": "2023-10-01", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" }
      ],
      "Electronic Data Processing (EDP)": [
        { "name": "Desktop Computers", "qty": 25, "mfg": "2022-09-01", "warranty": "2025-08-31", "last_maint": "2025-07-05", "next_maint": "2026-01-05" },
        { "name": "LAN Switches/Routers", "qty": 5, "mfg": "2022-07-22", "warranty": "2025-07-21", "last_maint": "2025-06-20", "next_maint": "2025-12-20" },
        { "name": "UPS/Inverter Units", "qty": 5, "mfg": "2023-05-14", "warranty": "2025-05-13", "last_maint": "2025-05-15", "next_maint": "2025-11-15" },
        { "name": "Printers/Scanners", "qty": 3, "mfg": "2024-01-20", "warranty": "2026-01-19", "last_maint": "2025-06-30", "next_maint": "2025-12-30" },
        { "name": "Network Cable Bundles", "qty": 10, "mfg": "2022-07-10", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Server Rack", "qty": 2, "mfg": "2022-06-15", "warranty": "2032-06-14", "last_maint": "2025-06-18", "next_maint": "2025-12-18" },
        { "name": "Ergonomic Chairs", "qty": 25, "mfg": "2022-09-01", "warranty": "2027-08-31", "last_maint": "2025-03-10", "next_maint": "2026-03-10" },
        { "name": "Office Tables", "qty": 20, "mfg": "2022-09-01", "warranty": "2029-08-31", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "AC Units", "qty": 4, "mfg": "2023-04-02", "warranty": "2025-04-01", "last_maint": "2025-04-15", "next_maint": "2025-10-15" },
        { "name": "Tube Lights", "qty": 20, "mfg": "2023-10-10", "warranty": "2024-10-09", "last_maint": "N/A", "next_maint": "As needed" },
        { "name": "Ceiling Fans", "qty": 10, "mfg": "2021-05-20", "warranty": "2023-05-19", "last_maint": "2025-04-08", "next_maint": "2026-04-08" },
        { "name": "CCTV Monitors", "qty": 2, "mfg": "2022-07-22", "warranty": "2024-07-21", "last_maint": "2025-07-22", "next_maint": "2026-01-22" },
        { "name": "External Hard Drives", "qty": 6, "mfg": "2024-08-11", "warranty": "2026-08-10", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Pen Drives (secured)", "qty": 15, "mfg": "2025-02-01", "warranty": "2026-01-31", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Fire Extinguishers", "qty": 2, "mfg": "2024-09-01", "warranty": "2025-08-31", "last_maint": "2025-03-01", "next_maint": "2025-09-01" },
        { "name": "File Cabinets", "qty": 4, "mfg": "2020-05-18", "warranty": "2030-05-17", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Software License Docs", "qty": 20, "mfg": "2022-08-01", "warranty": "N/A", "last_maint": "2025-07-01", "next_maint": "2026-07-01" }
      ],
      "General Administration": [
        { "name": "Reception Desk", "qty": 1, "mfg": "2019-01-10", "warranty": "2029-01-09", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Visitor Chairs", "qty": 10, "mfg": "2019-01-10", "warranty": "2024-01-09", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Workstations", "qty": 10, "mfg": "2021-02-15", "warranty": "2028-02-14", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Office Chairs", "qty": 15, "mfg": "2021-02-15", "warranty": "2024-02-14", "last_maint": "2025-02-16", "next_maint": "2026-02-16" },
        { "name": "Almirahs", "qty": 5, "mfg": "2019-01-10", "warranty": "2034-01-09", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Notice Boards", "qty": 3, "mfg": "2019-01-10", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Tube Lights", "qty": 20, "mfg": "2022-09-15", "warranty": "2023-09-14", "last_maint": "N/A", "next_maint": "As needed" },
        { "name": "Ceiling Fans", "qty": 10, "mfg": "2019-03-20", "warranty": "2021-03-19", "last_maint": "2025-04-10", "next_maint": "2026-04-10" },
        { "name": "AC Units", "qty": 3, "mfg": "2022-04-01", "warranty": "2024-03-31", "last_maint": "2025-04-11", "next_maint": "2025-10-11" },
        { "name": "Intercom Telephones", "qty": 5, "mfg": "2021-02-15", "warranty": "2024-02-14", "last_maint": "2025-02-17", "next_maint": "2026-02-17" },
        { "name": "Water Cooler", "qty": 1, "mfg": "2024-05-05", "warranty": "2026-05-04", "last_maint": "2025-05-06", "next_maint": "2025-11-06" },
        { "name": "Stationery Kits", "qty": 20, "mfg": "2025-07-01", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Shredders", "qty": 1, "mfg": "2023-10-10", "warranty": "2024-10-09", "last_maint": "2025-04-10", "next_maint": "2025-10-10" },
        { "name": "Dustbins", "qty": 10, "mfg": "2023-01-01", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Tea Dispenser", "qty": 1, "mfg": "2024-08-01", "warranty": "2025-07-31", "last_maint": "2025-02-01", "next_maint": "2025-08-01" },
        { "name": "Landline Phone Units", "qty": 6, "mfg": "2021-02-15", "warranty": "2023-02-14", "last_maint": "N/A", "next_maint": "As needed" }
      ],
      "Loco Training School (LTS)": [
        { "name": "Simulator Machines", "qty": 2, "mfg": "2020-08-25", "warranty": "2025-08-24", "last_maint": "2025-02-25", "next_maint": "2025-08-25" },
        { "name": "Training Benches", "qty": 12, "mfg": "2020-07-10", "warranty": "2030-07-09", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Student Chairs", "qty": 30, "mfg": "2020-07-10", "warranty": "2025-07-09", "last_maint": "2025-07-11", "next_maint": "2026-07-11" },
        { "name": "LCD Projector", "qty": 1, "mfg": "2023-02-20", "warranty": "2025-02-19", "last_maint": "2025-02-21", "next_maint": "2025-08-21" },
        { "name": "Desktop Computers", "qty": 10, "mfg": "2022-10-18", "warranty": "2025-10-17", "last_maint": "2025-04-18", "next_maint": "2025-10-18" },
        { "name": "Laptop for Instructor", "qty": 2, "mfg": "2024-09-01", "warranty": "2027-08-31", "last_maint": "2025-03-01", "next_maint": "2025-09-01" },
        { "name": "Fans", "qty": 8, "mfg": "2020-06-15", "warranty": "2022-06-14", "last_maint": "2025-04-16", "next_maint": "2026-04-16" },
        { "name": "Tube Lights", "qty": 15, "mfg": "2022-09-20", "warranty": "2023-09-19", "last_maint": "N/A", "next_maint": "As needed" },
        { "name": "Whiteboard", "qty": 1, "mfg": "2020-07-10", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Railway Signaling Models", "qty": 5, "mfg": "2019-11-11", "warranty": "2029-11-10", "last_maint": "2024-11-11", "next_maint": "2025-11-11" },
        { "name": "Fire Extinguisher", "qty": 2, "mfg": "2024-12-01", "warranty": "2025-11-30", "last_maint": "2025-06-01", "next_maint": "2025-12-01" },
        { "name": "Tool Kits (Train Models)", "qty": 6, "mfg": "2022-05-19", "warranty": "2027-05-18", "last_maint": "2025-05-20", "next_maint": "2026-05-20" },
        { "name": "Posters/Charts", "qty": 20, "mfg": "2020-07-01", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Multimedia Speakers", "qty": 2, "mfg": "2022-10-18", "warranty": "2024-10-17", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Filing Cabinets", "qty": 3, "mfg": "2020-07-10", "warranty": "2030-07-09", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Attendance Register", "qty": 2, "mfg": "2025-06-01", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" }
      ],
      "Planning Department": [
        { "name": "Computers", "qty": 15, "mfg": "2023-06-10", "warranty": "2026-06-09", "last_maint": "2025-06-15", "next_maint": "2025-12-15" },
        { "name": "Projector", "qty": 1, "mfg": "2024-01-15", "warranty": "2026-01-14", "last_maint": "2025-07-15", "next_maint": "2026-01-15" },
        { "name": "Conference Table", "qty": 1, "mfg": "2019-08-20", "warranty": "2029-08-19", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Revolving Chairs", "qty": 15, "mfg": "2023-06-10", "warranty": "2026-06-09", "last_maint": "2025-06-12", "next_maint": "2026-06-12" },
        { "name": "File Cabinets", "qty": 6, "mfg": "2019-08-20", "warranty": "2029-08-19", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Whiteboards", "qty": 2, "mfg": "2021-11-30", "warranty": "2024-11-29", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Tube Lights", "qty": 18, "mfg": "2022-10-01", "warranty": "2023-09-30", "last_maint": "N/A", "next_maint": "As needed" },
        { "name": "Ceiling Fans", "qty": 6, "mfg": "2019-07-15", "warranty": "2021-07-14", "last_maint": "2025-04-18", "next_maint": "2026-04-18" },
        { "name": "AC Units", "qty": 3, "mfg": "2023-03-10", "warranty": "2025-03-09", "last_maint": "2025-04-01", "next_maint": "2025-10-01" },
        { "name": "Printer/Photocopier", "qty": 2, "mfg": "2023-09-05", "warranty": "2025-09-04", "last_maint": "2025-07-10", "next_maint": "2026-01-10" },
        { "name": "Wall Clocks", "qty": 2, "mfg": "2024-02-28", "warranty": "2025-02-27", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Staplers", "qty": 5, "mfg": "2025-01-10", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Folders/Files", "qty": 100, "mfg": "2025-07-01", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Notepads", "qty": 20, "mfg": "2025-07-01", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Magnetic Pin Board", "qty": 2, "mfg": "2021-11-30", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" }
      ],
      "Safety Department": [
        { "name": "Desktop Computers", "qty": 5, "mfg": "2023-05-16", "warranty": "2026-05-15", "last_maint": "2025-05-17", "next_maint": "2025-11-17" },
        { "name": "Fire Extinguishers (Spare)", "qty": 20, "mfg": "2025-01-15", "warranty": "2026-01-14", "last_maint": "N/A", "next_maint": "2025-07-15" },
        { "name": "First Aid Kits", "qty": 10, "mfg": "2024-12-10", "warranty": "N/A", "last_maint": "2025-06-10", "next_maint": "2025-12-10" },
        { "name": "PPE Kits", "qty": 50, "mfg": "2024-08-20", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Safety Signage Boards", "qty": 30, "mfg": "2022-02-10", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Reflective Jackets", "qty": 40, "mfg": "2024-08-20", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Notice Boards", "qty": 2, "mfg": "2020-10-02", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Safety Training DVDs/Media", "qty": 10, "mfg": "2021-06-15", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Wall Posters", "qty": 15, "mfg": "2022-02-10", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Emergency Torchlights", "qty": 10, "mfg": "2024-11-20", "warranty": "2025-11-19", "last_maint": "2025-05-20", "next_maint": "2025-11-20" },
        { "name": "CCTV Monitors", "qty": 3, "mfg": "2022-07-22", "warranty": "2024-07-21", "last_maint": "2025-07-23", "next_maint": "2026-01-23" },
        { "name": "File Cabinets", "qty": 2, "mfg": "2020-10-02", "warranty": "2030-10-01", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Tube Lights", "qty": 10, "mfg": "2021-08-15", "warranty": "2022-08-14", "last_maint": "N/A", "next_maint": "As needed" },
        { "name": "Ceiling Fans", "qty": 5, "mfg": "2020-09-09", "warranty": "2022-09-08", "last_maint": "2025-04-28", "next_maint": "2026-04-28" },
        { "name": "Chairs", "qty": 6, "mfg": "2020-10-02", "warranty": "2023-10-01", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Safety Helmets (Display)", "qty": 10, "mfg": "2022-02-10", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Fire Bucket Stand", "qty": 4, "mfg": "2021-06-20", "warranty": "N/A", "last_maint": "2025-07-01", "next_maint": "2026-01-01" }
      ],
      "Stores Department": [
        { "name": "Inventory Racks", "qty": 30, "mfg": "2018-05-15", "warranty": "2028-05-14", "last_maint": "2025-05-15", "next_maint": "2027-05-15" },
        { "name": "Labeling Machines", "qty": 3, "mfg": "2024-04-10", "warranty": "2025-04-09", "last_maint": "2025-04-11", "next_maint": "2025-10-11" },
        { "name": "Barcode Scanners", "qty": 3, "mfg": "2024-04-10", "warranty": "2025-04-09", "last_maint": "2025-04-11", "next_maint": "2025-10-11" },
        { "name": "Metal/Plastic Bins", "qty": 100, "mfg": "2022-03-01", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Work Tables", "qty": 10, "mfg": "2018-05-15", "warranty": "2028-05-14", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Office Chairs", "qty": 10, "mfg": "2021-08-20", "warranty": "2024-08-19", "last_maint": "2025-02-20", "next_maint": "2026-02-20" },
        { "name": "File Cabinets", "qty": 6, "mfg": "2018-05-15", "warranty": "2028-05-14", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Stock Registers", "qty": 20, "mfg": "2025-07-01", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Tube Lights", "qty": 30, "mfg": "2023-11-10", "warranty": "2024-11-09", "last_maint": "N/A", "next_maint": "As needed" },
        { "name": "Ceiling Fans", "qty": 12, "mfg": "2018-04-12", "warranty": "2020-04-11", "last_maint": "2025-04-20", "next_maint": "2026-04-20" },
        { "name": "CCTV Cameras", "qty": 4, "mfg": "2022-06-25", "warranty": "2024-06-24", "last_maint": "2025-06-25", "next_maint": "2025-12-25" },
        { "name": "Fire Extinguishers", "qty": 3, "mfg": "2024-10-01", "warranty": "2025-09-30", "last_maint": "2025-04-01", "next_maint": "2025-10-01" },
        { "name": "Desktop Computers", "qty": 8, "mfg": "2023-01-25", "warranty": "2026-01-24", "last_maint": "2025-07-25", "next_maint": "2026-01-25" },
        { "name": "Printers", "qty": 2, "mfg": "2023-01-25", "warranty": "2025-01-24", "last_maint": "2025-07-25", "next_maint": "2026-01-25" },
        { "name": "Shelving Tools", "qty": 10, "mfg": "2018-05-10", "warranty": "N/A", "last_maint": "N/A", "next_maint": "N/A" },
        { "name": "Trolleys (Material)", "qty": 5, "mfg": "2020-02-14", "warranty": "2025-02-13", "last_maint": "2025-02-15", "next_maint": "2026-02-15" },
        { "name": "Electronic Weighing Scale", "qty": 2, "mfg": "2024-03-03", "warranty": "2026-03-02", "last_maint": "2025-03-03", "next_maint": "2026-03-03" }],
         "Technical Training Centre (TTC)": [["Training Tables", 15], ["Chairs", 40], ["Whiteboards", 3], ["Marker Sets", 10], ["Projectors", 2], ["Desktop Computers", 20], ["Tube Lights", 25], ["Ceiling Fans", 10], ["Air Conditioners", 3], ["Printers", 2], ["Laptops (Instructors)", 5], ["Tool Kits (Mechanical)", 10], ["Tool Kits (Electrical)", 10], ["Cabinets", 5], ["First Aid Box", 2], ["Digital Multimeters", 8], ["Measuring Tapes", 6], ["Attendance Registers", 4]]
      
    };

console.log("Seeding inventory data...");

db.serialize(() => {
  const query = `INSERT INTO inventory (department, item, quantity, mfg_date, warranty_unto, last_maintenance, next_maintenance) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

  for (const department in inventory) {
    inventory[department].forEach(item => {
      db.run(query, [
        department,
        item.name,
        item.qty,
        item.mfg,
        item.warranty,
        item.last_maint,
        item.next_maint
      ], function(err) {
        if (err) {
          return console.error(`Error inserting ${item.name}:`, err.message);
        }
        console.log(`✅ Inserted ${item.name}`);
      });
    });
  }
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Database connection closed. Seeding complete.");
});
