import { useState } from 'react';

import { Paper } from '@/src/ui/atoms/Paper';
import { Button } from '@/src/ui/atoms/Button';
import { CTAButton } from '@/src/ui/atoms/CTAButton';
import { Container } from '@/src/ui/atoms/Container';
import { ImageInput } from '@/src/ui/atoms/ImageInput';
import { AsyncCombobox } from '@/src/ui/atoms/Combobox';
import { H1, H2, H3, H4, H5, H6 } from '@/src/ui/atoms/Typography';
import { InputField, TextAreaField } from '@/src/ui/molecules/Field';
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
    <Container className="py-16">
      <Paper>
        <H1>Heading 1</H1>
        <H2>Heading 2</H2>
        <H3>Heading 3</H3>
        <H4>Heading 4</H4>
        <H5>Heading 5</H5>
        <H6>Heading 6</H6>

        <p>Paragraph</p>

        <H2>Input fields</H2>

        <InputField label="Label" placeholder="placeholder" />

        <TextAreaField label="Label" placeholder="placeholder" />

        <ImageInput
          className="my-4 mx-auto"
          onChange={(im) => setImage(im)}
          preview={image.preview}
        />

        <H2>Buttons</H2>

        <H3>CTA Buttons</H3>

        <div className="flex flex-wrap gap-2">
          <div>
            <CTAButton>Button</CTAButton>
          </div>

          <div>
            <CTAButton isLoading>Loading</CTAButton>
          </div>

          <div>
            <CTAButton color="secondary">Button</CTAButton>
          </div>

          <div>
            <CTAButton color="secondary" isLoading>
              Loading
            </CTAButton>
          </div>
        </div>

        <H3>Buttons</H3>

        <div className="flex flex-wrap gap-2">
          <div>
            <Button>Button</Button>
          </div>

          <div>
            <Button isLoading>Loading</Button>
          </div>

          <div>
            <Button color="secondary">Button</Button>
          </div>

          <div>
            <Button color="secondary" isLoading>
              Loading
            </Button>
          </div>
        </div>

        <H2>Segmented control</H2>

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

        <H2>Combobox</H2>

        <div>
          <AsyncCombobox
            options={options}
            option={option}
            onChange={(option) => setOption(option)}
            loadOptions={() => options}
          />
        </div>
      </Paper>
    </Container>
  );
}
