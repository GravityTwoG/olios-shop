import { Prisma, UserRole } from '@prisma/client';

export const seedInviteCodes = async (prisma: Prisma.TransactionClient) => {
  const invite = await prisma.inviteCode.findFirst();

  if (invite) {
    console.info('Invite code already exists');
    return;
  }

  await prisma.inviteCode.create({
    data: {
      firstName: 'FirstName',
      lastName: 'LastName',
      patronymic: 'Patronymic',
      birthDate: new Date(),
      role: UserRole.MANAGER,
      code: 'FIRST_MANAGER',
      isUsed: false,
      usedBy: null,
    },
  });
  console.info('Invite code created');
};
