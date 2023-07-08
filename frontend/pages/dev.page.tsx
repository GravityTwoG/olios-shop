import { useState } from 'react';

import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { Container } from '@/src/ui/atoms/Container';
import { ImageInput } from '@/src/ui/atoms/ImageInput';
import { AsyncCombobox } from '@/src/ui/atoms/Combobox';
import { InputField } from '@/src/ui/molecules/Field';
import { SegmentedControl } from '@/src/ui/molecules/SegmentedControl';

export default function DevPage() {
  const [image, setImage] = useState<{ raw: Blob | null; preview: string }>({
    raw: null,
    preview: '',
  });

  const [activeSegmentName, setActiveSegmentName] = useState('Segment1');

  const [options] = useState([
    { value: '1', label: 'Cat1' },
    { value: '2', label: 'Cat2' },
  ]);

  const [option, setOption] = useState({ value: '1', label: 'Cat1' });

  return (
    <Container className="py-8">
      <InputField label="Label" placeholder="placeholder" />
      <InputField label="Label2" placeholder="placeholder" />

      <ImageInput
        className="my-4 mx-auto"
        onChange={(im) => setImage(im)}
        preview={image.preview}
      />

      <CTAButton className="m-1">Button</CTAButton>
      <CTAButton className="m-1" isLoading>
        Loading
      </CTAButton>
      <CTAButton className="m-1" color="secondary">
        Button
      </CTAButton>
      <CTAButton className="m-1" color="secondary" isLoading>
        Loading
      </CTAButton>

      <div>
        <SegmentedControl
          segments={[
            { name: 'Segment1', node: 'Segment1' },
            { name: 'Segment2', node: 'Segment2' },
            { name: 'Segment3', node: 'Segment3' },
          ]}
          activeSegmentName={activeSegmentName}
          onSelect={(s) => {
            setActiveSegmentName(s);
          }}
        />
      </div>

      <div>
        <AsyncCombobox
          options={options}
          option={option}
          onChange={(option) => setOption(option)}
          loadOptions={async () => options}
        />
      </div>
    </Container>
  );
}
