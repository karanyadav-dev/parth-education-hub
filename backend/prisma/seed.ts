import { PrismaClient, Role, Status, CourseStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create Admin
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@parth.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@parth.com',
      password: adminPassword,
      role: Role.ADMIN,
      status: Status.ACTIVE,
      isVerified: true,
    },
  });

  // Create Teacher
  const teacherPassword = await bcrypt.hash('Teacher@123', 10);
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@parth.com' },
    update: {},
    create: {
      name: 'Teacher',
      email: 'teacher@parth.com',
      password: teacherPassword,
      role: Role.TEACHER,
      status: Status.ACTIVE,
      isVerified: true,
    },
  });

  // Create Student
  const studentPassword = await bcrypt.hash('Student@123', 10);
  const student = await prisma.user.upsert({
    where: { email: 'student@parth.com' },
    update: {},
    create: {
      name: 'Student',
      email: 'student@parth.com',
      password: studentPassword,
      role: Role.STUDENT,
      status: Status.ACTIVE,
      isVerified: true,
    },
  });

  console.log('✅ Seed data created:');
  console.log(`👑 Admin: admin@parth.com / Admin@123`);
  console.log(`👨‍🏫 Teacher: teacher@parth.com / Teacher@123`);
  console.log(`👨‍🎓 Student: student@parth.com / Student@123`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });