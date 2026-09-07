import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Test database connection
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Disconnect from database
export async function disconnectDatabase(): Promise<void> {
  try {
    await prisma.$disconnect();
    console.log('Database disconnected');
  } catch (error) {
    console.error('Database disconnection error:', error);
  }
}

// Get database stats
export async function getDatabaseStats(): Promise<{
  users: number;
  guides: number;
  payments: number;
  hospitals: number;
}> {
  const [users, guides, payments, hospitals] = await Promise.all([
    prisma.user.count(),
    prisma.guide.count(),
    prisma.payment.count(),
    prisma.hospital.count(),
  ]);

  return { users, guides, payments, hospitals };
}

// Seed database with initial data
export async function seedDatabase(): Promise<void> {
  try {
    // Check if hospitals already exist
    const hospitalCount = await prisma.hospital.count();
    if (hospitalCount > 0) {
      console.log('Database already seeded');
      return;
    }

    // Seed hospitals
    const hospitals = [
      {
        id: 'bj-001',
        name: 'Peking Union Medical College Hospital',
        nameChinese: '北京协和医院',
        address: '1 Shuaifuyuan, Wangfujing, Dongcheng District, Beijing',
        city: 'beijing',
        specialties: JSON.stringify(['Oncology', 'Cardiology', 'Endocrinology']),
        internationalDepartment: true,
        englishStaff: true,
        jciCertified: true,
        rating: 4.9,
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
        description: 'One of the most prestigious hospitals in China, known for excellent medical care.',
        phone: '+86-10-69156114',
      },
      {
        id: 'bj-002',
        name: 'Peking University People\'s Hospital',
        nameChinese: '北京大学人民医院',
        address: '11 Xizhimen South Street, Xicheng District, Beijing',
        city: 'beijing',
        specialties: JSON.stringify(['Hematology', 'Hepatobiliary Surgery', 'Orthopedics']),
        internationalDepartment: true,
        englishStaff: true,
        jciCertified: false,
        rating: 4.7,
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
        description: 'Leading hospital in hematology and transplantation.',
        phone: '+86-10-88326666',
      },
      {
        id: 'sh-001',
        name: 'Huashan Hospital',
        nameChinese: '华山医院',
        address: '12 Wulumuqi Zhong Road, Xuhui District, Shanghai',
        city: 'shanghai',
        specialties: JSON.stringify(['Neurosurgery', 'Dermatology', 'Infectious Diseases']),
        internationalDepartment: true,
        englishStaff: true,
        jciCertified: true,
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
        description: 'Top-ranked hospital in Shanghai with world-class neurosurgery department.',
        phone: '+86-21-52888888',
      },
      {
        id: 'sh-002',
        name: 'Ruijin Hospital',
        nameChinese: '瑞金医院',
        address: '197 Ruijin Er Road, Huangpu District, Shanghai',
        city: 'shanghai',
        specialties: JSON.stringify(['Hematology', 'Cardiology', 'Orthopedics']),
        internationalDepartment: true,
        englishStaff: true,
        jciCertified: false,
        rating: 4.7,
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
        description: 'Leading hospital in hematology and transplantation.',
        phone: '+86-21-64370045',
      },
      {
        id: 'gz-001',
        name: 'The First Affiliated Hospital of Sun Yat-sen University',
        nameChinese: '中山大学附属第一医院',
        address: '58 Zhongshan Er Road, Yuexiu District, Guangzhou',
        city: 'guangzhou',
        specialties: JSON.stringify(['Oncology', 'Cardiology', 'Transplantation']),
        internationalDepartment: true,
        englishStaff: true,
        jciCertified: false,
        rating: 4.7,
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
        description: 'Premier medical institution in Southern China.',
        phone: '+86-20-28823388',
      },
      {
        id: 'hz-001',
        name: 'Zhejiang University School of Medicine Affiliated First Hospital',
        nameChinese: '浙江大学医学院附属第一医院',
        address: '79 Qingchun Road, Hangzhou',
        city: 'hangzhou',
        specialties: JSON.stringify(['TCM', 'Hepatology', 'Infectious Diseases']),
        internationalDepartment: true,
        englishStaff: true,
        jciCertified: false,
        rating: 4.6,
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
        description: 'Leading hospital in TCM and liver disease treatment.',
        phone: '+86-571-87236666',
      },
      {
        id: 'cd-001',
        name: 'West China Hospital of Sichuan University',
        nameChinese: '四川大学华西医院',
        address: '37 Guoxue Alley, Wuhou District, Chengdu',
        city: 'chengdu',
        specialties: JSON.stringify(['Orthopedics', 'TCM', 'Rehabilitation']),
        internationalDepartment: true,
        englishStaff: true,
        jciCertified: true,
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
        description: 'One of the largest hospitals in Western China with excellent rehabilitation services.',
        phone: '+86-28-85422114',
      },
    ];

    for (const hospital of hospitals) {
      await prisma.hospital.create({ data: hospital });
    }

    console.log('✅ Database seeded successfully');
  } catch (error) {
    console.error('Database seeding error:', error);
  }
}

export default prisma;
