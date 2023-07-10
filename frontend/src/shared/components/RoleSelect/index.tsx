import { IEmployeeRole } from '@/src/types/IUser';

import { Combobox } from '@/src/ui/atoms/Combobox';
import { useState } from 'react';

export type RoleSelectProps = {
  role: IEmployeeRole;
  onChange: (role: IEmployeeRole) => void;
};

const options = [
  { label: 'Content Manager', value: IEmployeeRole.CONTENT_MANAGER },
  { label: 'Manager', value: IEmployeeRole.MANAGER },
];

export const RoleSelect = (props: RoleSelectProps) => {
  const [option, setOption] = useState(options[0]);

  return (
    <Combobox
      options={options}
      option={option}
      onChange={(o) => {
        setOption(o);
        props.onChange(o.value);
      }}
    />
  );
};
