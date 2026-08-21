import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const category = formData.get('category');
    const price = formData.get('price');
    const duration = formData.get('duration');
    const pdfFile = formData.get('pdf') as File;
    const thumbnail = formData.get('thumbnail') as File;

    // Create uploads directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public/uploads/courses');
    await mkdir(uploadDir, { recursive: true });

    // Save PDF file
    if (pdfFile) {
      const pdfBytes = await pdfFile.arrayBuffer();
      const pdfBuffer = Buffer.from(pdfBytes);
      const pdfPath = join(uploadDir, `${Date.now()}-${pdfFile.name}`);
      await writeFile(pdfPath, pdfBuffer);
    }

    // Save thumbnail if provided
    if (thumbnail) {
      const imageBytes = await thumbnail.arrayBuffer();
      const imageBuffer = Buffer.from(imageBytes);
      const imagePath = join(uploadDir, `${Date.now()}-${thumbnail.name}`);
      await writeFile(imagePath, imageBuffer);
    }

    // Here you would save to database
    // const course = await prisma.course.create({ data: { title, description, category, price, duration, pdfPath, thumbnailPath } });

    return NextResponse.json({ 
      success: true, 
      message: 'Course added successfully' 
    });
  } catch (error) {
    console.error('Error processing upload:', error);
    return NextResponse.json(
      { error: 'Failed to process upload' },
      { status: 500 }
    );
  }
}