import { IUserRole } from '@/src/types/IUser';

import { PrivatePage } from '@/src/features/Auth';

import { Container } from '@/src/ui/atoms/Container';
import Head from 'next/head';
import { H1 } from '@/src/ui/atoms/Typography';
import { Form, FormError } from '@/src/ui/molecules/Form';
import { InputField } from '@/src/ui/molecules/Field';
import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { useUnit } from 'effector-react';
import {
  $birthDate,
  $error,
  $firstName,
  $isPending,
  $lastName,
  $patronymic,
  $role,
  birthDateChanged,
  firstNameChanged,
  formSubmitted,
  inviteCodeCreated,
  lastNameChanged,
  patronymicChanged,
  roleChanged,
} from './create.model';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { paths } from '@/src/paths';

const CreateInviteCodePage = () => {
  const [firstName, lastName, patronymic, role, birthDate, isPending, error] =
    useUnit([
      $firstName,
      $lastName,
      $patronymic,
      $role,
      $birthDate,
      $isPending,
      $error,
    ]);

  const router = useRouter();
  useEffect(() => {
    return inviteCodeCreated.watch(() => router.push(paths.inviteCodes({})));
  }, [router]);

  return (
    <Container className="py-8">
      <Head>
        <title>Olios Shop | Create Invite Code</title>
      </Head>
      <H1>Create Invite Code</H1>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          formSubmitted();
        }}
      >
        <InputField
          label="First Name"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => firstNameChanged(e.target.value)}
        />
        <InputField
          label="Last Name"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => lastNameChanged(e.target.value)}
        />
        <InputField
          label="Patronymic"
          placeholder="Patronymic"
          value={patronymic}
          onChange={(e) => patronymicChanged(e.target.value)}
        />
        <InputField
          label="Role"
          placeholder="Role"
          value={role}
          onChange={(e) => roleChanged(e.target.value as any)}
        />
        <InputField
          label="Birth Date"
          placeholder="Birth Date"
          value={birthDate}
          onChange={(e) => birthDateChanged(e.target.value)}
        />

        <FormError>{error}</FormError>

        <CTAButton type="submit" isLoading={isPending}>
          Create
        </CTAButton>
      </Form>
    </Container>
  );
};

export default PrivatePage(CreateInviteCodePage, [IUserRole.MANAGER]);
