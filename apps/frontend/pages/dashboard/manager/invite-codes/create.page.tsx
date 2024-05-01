import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { IEmployeeRole } from '@/src/types/IUser';
import { paths } from '@/src/paths';

import { SessionUserRole } from '@/src/shared/session';

import { useUnit } from 'effector-react';
import {
  $error,
  $isPending,
  formSubmitted,
  inviteCodeCreated,
} from './create.model';

import { PrivatePage } from '@/src/features/Auth';

import { H1 } from '@/src/ui/atoms/Typography';
import { Container } from '@/src/ui/atoms/Container';
import { Form } from '@/src/ui/molecules/Form';
import { MetaTags } from '@/src/shared/components/MetaTags';

const CreateInviteCodePage = () => {
  const [isPending, error] = useUnit([$isPending, $error]);

  const [formSubmittedEvent] = useUnit([formSubmitted]);

  const router = useRouter();
  useEffect(() => {
    return inviteCodeCreated.watch(() => {
      router.push(paths.inviteCodes({}));
    });
  }, [router]);

  return (
    <Container className="py-8">
      <MetaTags title="Create Invite Code" />

      <H1>Create Invite Code</H1>

      <Form
        config={{
          firstName: {
            type: 'text',
            required: 'First Name is required!',
            placeholder: 'First Name',
            label: 'First Name',
          },
          lastName: {
            type: 'text',
            required: 'Last Name is required!',
            placeholder: 'Last Name',
            label: 'Last Name',
          },
          patronymic: {
            type: 'text',
            placeholder: 'Patronymic',
            label: 'Patronymic',
          },
          role: {
            type: 'combobox',
            required: 'Role is required!',
            placeholder: 'Role',
            label: 'Role',
            defaultValue: {
              label: 'Content Manager',
              value: IEmployeeRole.CONTENT_MANAGER,
            },
            loadOptions: (inputValue: string) => {
              const options = [
                {
                  label: 'Content Manager',
                  value: IEmployeeRole.CONTENT_MANAGER,
                } as const,
                { label: 'Manager', value: IEmployeeRole.MANAGER } as const,
              ];
              if (!inputValue) {
                return Promise.resolve(options);
              }
              return Promise.resolve(
                options.filter((o) => o.label.includes(inputValue)),
              );
            },
          },
          birthDate: {
            type: 'date',
            required: 'Birth Date is required!',
            placeholder: 'Birth Date',
            label: 'Birth Date',
            defaultValue: '1980-01-01',
          },
        }}
        onSubmit={async (data) => {
          formSubmittedEvent({
            ...data,
            role: data.role.value as IEmployeeRole,
          });
          return '';
        }}
        isPending={isPending}
        error={error}
        submitText="Create"
        submitButtonVariant="CTA"
      />
    </Container>
  );
};

export default PrivatePage(CreateInviteCodePage, [SessionUserRole.MANAGER]);
