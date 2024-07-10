import { useEffect } from 'react';

import { IEmployeeRole } from '@olios-shop/admin/types/IUser';
import { paths } from '@olios-shop/admin/config/paths';

import { SessionUserRole } from '@olios-shop/admin/shared/session';

import { useUnit } from 'effector-react';
import {
  $error,
  $isPending,
  formSubmitted,
  inviteCodeCreated,
} from './create.model';

import { PrivatePage } from '@olios-shop/admin/features/Auth';

import { H1 } from '@olios-shop/ui/atoms/Typography';
import { Container } from '@olios-shop/ui/atoms/Container';
import { Form } from '@olios-shop/ui/molecules/Form';
import { useNavigate } from 'react-router-dom';

export const CreateInviteCodePage = PrivatePage(() => {
  const [isPending, error] = useUnit([$isPending, $error]);

  const [formSubmittedEvent] = useUnit([formSubmitted]);

  const navigate = useNavigate();
  useEffect(() => {
    return inviteCodeCreated.watch(() => {
      navigate(paths.inviteCodes({}));
    });
  }, [navigate]);

  return (
    <Container className="py-8">
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
        error={error || ''}
        submitText="Create"
        submitButtonVariant="CTA"
      />
    </Container>
  );
}, [SessionUserRole.MANAGER]);
