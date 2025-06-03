import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const mission = await req.json();

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM!,
      to: process.env.RESEND_TO!,
      subject: `✅ Mission ajoutée : ${mission.titre}`,
      html: `
        <h2>Nouvelle mission</h2>
        <p><strong>Client :</strong> ${mission.client}</p>
        <p><strong>Catégories :</strong> ${mission.categorie.join(', ')}</p>
        <p><strong>Description :</strong></p>
        <pre>${mission.description}</pre>
      `,
    });

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 'error', error }, { status: 500 });
  }
}
