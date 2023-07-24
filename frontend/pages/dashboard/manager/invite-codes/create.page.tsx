import { IUserRole } from '@/src/types/IUser';

import { PrivatePage } from '@/src/features/Auth';

import { Container } from '@/src/ui/atoms/Container';
import Head from 'next/head';
import { H1 } from '@/src/ui/atoms/Typography';
import { Form, FormError } from '@/src/ui/molecules/Form';
import { Field, InputField } from '@/src/ui/molecules/Field';
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
import { useEffect, useId } from 'react';
import { useRouter } from 'next/router';
import { paths } from '@/src/paths';
import { RoleSelect } from '@/src/shared/components/RoleSelect';

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

  const rolesId = useId();

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
        <Field label="Role" htmlFor={rolesId}>
          <RoleSelect
            role={role}
            onChange={(r) => roleChanged(r)}
            id={rolesId}
          />
        </Field>
        <InputField
          label="Birth Date"
          placeholder="Birth Date"
          type="date"
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
