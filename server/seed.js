const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Medicine = require('./models/Medicine');
const Appointment = require('./models/Appointment');

dotenv.config();

const seedData = async (isStandalone = false) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    console.log('Clearing existing collection records...');
    await User.deleteMany({});
    await Doctor.deleteMany({});
    await Medicine.deleteMany({});
    await Appointment.deleteMany({});

    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const patientPassword = await bcrypt.hash('patient123', salt);
    const doctorPassword = await bcrypt.hash('doctor123', salt);

    // 1. Create Admin
    const admin = await User.create({
      name: 'MediCare Admin',
      email: 'admin@medicare.com',
      password: adminPassword,
      role: 'admin',
      phone: '+91 98765 43200',
      address: 'MediCare HQ, Mumbai, India'
    });
    console.log('Created Admin User: admin@medicare.com / admin123');

    // 2. Create Sample Patients
    const patient1 = await User.create({
      name: 'Amit Kumar',
      email: 'patient@medicare.com',
      password: patientPassword,
      role: 'patient',
      age: 34,
      gender: 'Male',
      phone: '+91 98765 43201',
      address: 'Kathmandu, Nepal',
      bloodGroup: 'A+'
    });

    const patient2 = await User.create({
      name: 'Priya Patel',
      email: 'emma@medicare.com',
      password: patientPassword,
      role: 'patient',
      age: 29,
      gender: 'Female',
      phone: '+91 98765 43202',
      address: 'Kathmandu, Nepal',
      bloodGroup: 'O+'
    });
    console.log('Created Patient Users: patient@medicare.com / patient123');

    // 3. Create Doctors
    const doctorsData = [
      {
        name: 'Dr. Aarti Mehta',
        email: 'aarti.mehta@medicare.com',
        password: doctorPassword,
        specialization: 'Cardiology',
        experience: 12,
        qualification: 'MD, FACC - AIIMS, Delhi',
        fees: 150,
        photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400',
        about: 'Senior Cardiologist specializing in preventive cardiology, echocardiography, and heart failure management.',
        rating: 4.9,
        phone: '+91 98765 43210'
      },
      {
        name: 'Dr. Rajesh Sharma',
        email: 'rajesh.sharma@medicare.com',
        password: doctorPassword,
        specialization: 'Neurology',
        experience: 15,
        qualification: 'MD, DM - NIMHANS',
        fees: 180,
        photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
        about: 'Expert Neurologist focusing on cerebrovascular disorders, migraine therapy, and neuro-rehabilitation.',
        rating: 5.0,
        phone: '+91 98765 43211'
      },
      {
        name: 'Dr. Neha Kapoor',
        email: 'neha.kapoor@medicare.com',
        password: doctorPassword,
        specialization: 'Pediatrics',
        experience: 9,
        qualification: 'MBBS, DCH - Lady Hardinge Medical College',
        fees: 120,
        photo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400',
        about: 'Compassionate Pediatrician dedicated to adolescent care, neonatal health, and childhood growth tracking.',
        rating: 4.8,
        phone: '+91 98765 43212'
      },
      {
        name: 'Dr. Arjun Menon',
        email: 'arjun.menon@medicare.com',
        password: doctorPassword,
        specialization: 'Orthopedics',
        experience: 14,
        qualification: 'MS (Ortho), Fellowship in Joint Replacement - CMC Vellore',
        fees: 160,
        photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
        about: 'Orthopedic Surgeon specializing in sports injuries, knee and hip arthroplasty, and spinal wellness.',
        rating: 4.9,
        phone: '+91 98765 43213'
      },
      {
        name: 'Dr. Kavita Singh',
        email: 'kavita.singh@medicare.com',
        password: doctorPassword,
        specialization: 'Dermatology',
        experience: 8,
        qualification: 'MD (Dermatology) - Maulana Azad Medical College',
        fees: 130,
        photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
        about: 'Clinical Dermatologist offering advanced skin treatments, anti-aging therapies, and laser skin care.',
        rating: 4.9,
        phone: '+91 98765 43214'
      },
      {
        name: 'Dr. Rohan Patel',
        email: 'rohan.patel@medicare.com',
        password: doctorPassword,
        specialization: 'General Medicine',
        experience: 10,
        qualification: 'MD (Internal Medicine) - KEM Hospital, Mumbai',
        fees: 100,
        photo: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&q=80&w=400',
        about: 'Primary Care Physician offering comprehensive wellness physicals, chronic disease control, and diagnostics.',
        rating: 4.7,
        phone: '+91 98765 43215'
      }
    ];

    const createdDoctors = await Doctor.insertMany(doctorsData);
    console.log(`Created ${createdDoctors.length} Doctors (e.g. aarti.mehta@medicare.com / doctor123)`);

    // 4. Create Medicines
    const medicinesData = [
      {
        name: 'Amoxicillin 500mg',
        category: 'Antibiotics',
        price: 24.99,
        stock: 120,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400',
        description: 'Broad-spectrum antibiotic used to treat a wide variety of bacterial infections.',
        requiresPrescription: true,
        dosage: '1 capsule every 8 hours with water'
      },
      {
        name: 'Panadol Extra Paracetamol',
        category: 'Pain Relief',
        price: 9.99,
        stock: 200,
        image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&q=80&w=400',
        description: 'Fast acting relief for headache, fever, muscle aches, and general pain discomfort.',
        requiresPrescription: false,
        dosage: '1 to 2 tablets every 4 to 6 hours as needed'
      },
      {
        name: 'Lipitor 20mg (Atorvastatin)',
        category: 'Cardiology',
        price: 45.50,
        stock: 80,
        image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=400',
        description: 'Statin medication used to lower cholesterol and prevent cardiovascular risk.',
        requiresPrescription: true,
        dosage: '1 tablet once daily in the evening'
      },
      {
        name: 'Multivitamin Complex + Zinc',
        category: 'Vitamins & Supplements',
        price: 18.25,
        stock: 150,
        image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&q=80&w=400',
        description: 'Complete daily immunity booster containing Essential Vitamins A, C, D, E & Zinc.',
        requiresPrescription: false,
        dosage: '1 softgel daily after breakfast'
      },
      {
        name: 'Cetirizine Hydrochloride 10mg',
        category: 'Allergy & Cold',
        price: 12.50,
        stock: 95,
        image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=400',
        description: 'Non-drowsy 24-hour allergy relief from hay fever, pet dander, and respiratory hives.',
        requiresPrescription: false,
        dosage: '1 tablet once daily'
      },
      {
        name: 'Omeprazole 20mg Acid Reducer',
        category: 'Gastroenterology',
        price: 29.90,
        stock: 110,
        image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=400',
        description: 'Proton pump inhibitor treating frequent heartburn, GERD, and stomach ulcers.',
        requiresPrescription: true,
        dosage: '1 capsule before morning meal'
      },
      {
        name: 'Vicks VapoRub',
        category: 'Cold & Cough',
        price: 85,
        stock: 100,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400',
        description: 'Topical vapour rub for temporary relief from nasal congestion and cough discomfort.',
        requiresPrescription: false,
        dosage: 'Apply a small amount as directed on the label'
      },
      {
        name: 'ORS Hydration Sachet',
        category: 'Digestive Care',
        price: 20,
        stock: 200,
        image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=400',
        description: 'Oral rehydration salts to help replace fluids and electrolytes during dehydration.',
        requiresPrescription: false,
        dosage: 'Dissolve in clean water and use as directed'
      },
      {
        name: 'Cough Relief Syrup',
        category: 'Cold & Cough',
        price: 110,
        stock: 75,
        image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&q=80&w=400',
        description: 'Soothing syrup for temporary relief from common cough and throat irritation.',
        requiresPrescription: false,
        dosage: 'Take only the measured dose shown on the label'
      },
      {
        name: 'Antacid Chewable Tablets',
        category: 'Digestive Care',
        price: 55,
        stock: 120,
        image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=400',
        description: 'Chewable antacid for occasional heartburn and acidity relief.',
        requiresPrescription: false,
        dosage: 'Chew as directed on the label'
      },
      {
        name: 'Calamine Skin Lotion',
        category: 'First Aid',
        price: 95,
        stock: 90,
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&q=80&w=400',
        description: 'Soothing lotion for minor skin irritation, itching, and heat rash.',
        requiresPrescription: false,
        dosage: 'Apply externally as directed'
      }
    ];

    await Medicine.insertMany(medicinesData);
    console.log(`Created ${medicinesData.length} Medicines`);

    // 5. Create Sample Appointments
    await Appointment.create([
      {
        patient: patient1._id,
        doctor: createdDoctors[0]._id,
        date: new Date().toISOString().split('T')[0],
        timeSlot: '11:00 AM',
        symptoms: 'Mild chest tightness and routine ECG review',
        status: 'Approved',
        feePaid: true,
        paymentId: 'DEMO_PAY_1001'
      },
      {
        patient: patient2._id,
        doctor: createdDoctors[1]._id,
        date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        timeSlot: '02:00 PM',
        symptoms: 'Persistent migraine headaches',
        status: 'Pending',
        feePaid: false
      }
    ]);

    console.log('Seeded Sample Appointments successfully!');
    if (isStandalone) {
      process.exit(0);
    }
  } catch (error) {
    console.error('Seeding Error:', error);
    if (isStandalone) {
      process.exit(1);
    }
    throw error;
  }
};

if (require.main === module) {
  seedData(true);
}

module.exports = seedData;
