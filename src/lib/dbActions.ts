'use server';

import { Stuff, Condition } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

export async function addNote(note: { note: string; contactId: number; owner: string }) {
  await prisma.note.create({
    data: {
      note: note.note,
      contactId: note.contactId,
      owner: note.owner,
    },
  });
  redirect('/list');
}

export async function addStuff(stuff: { name: string; quantity: number; owner: string; condition: string }) {
  let condition: Condition = 'good';
  if (stuff.condition === 'poor') {
    condition = 'poor';
  } else if (stuff.condition === 'excellent') {
    condition = 'excellent';
  } else {
    condition = 'fair';
  }
  await prisma.stuff.create({
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition,
    },
  });
  redirect('/list');
}

export async function editStuff(stuff: Stuff) {
  await prisma.stuff.update({
    where: { id: stuff.id },
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition: stuff.condition,
    },
  });
  redirect('/list');
}

export async function deleteStuff(id: number) {
  await prisma.stuff.delete({
    where: { id },
  });
  redirect('/list');
}

export async function createUser(credentials: { email: string; password: string }) {
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

export async function changePassword(credentials: { email: string; password: string }) {
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}
