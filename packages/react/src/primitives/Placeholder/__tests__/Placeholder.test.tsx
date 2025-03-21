import * as React from 'react';
import { render, screen } from '@testing-library/react';

import {
  CSS_VAR_END_COLOR,
  CSS_VAR_START_COLOR,
  Placeholder,
} from '../Placeholder';
import { Text } from '../../Text';
import { ComponentClassName } from '@aws-amplify/ui';

describe('Placeholder:', () => {
  it('renders correct defaults', async () => {
    render(<Placeholder testId="placeholderId" />);

    const placeholder = await screen.findByTestId('placeholderId');
    expect(placeholder.classList.contains(ComponentClassName.Placeholder)).toBe(
      true
    );
    expect(placeholder.dataset['size']).toBeUndefined();
    expect(placeholder.dataset['startColor']).toBeUndefined();
    expect(placeholder.dataset['endColor']).toBeUndefined();
  });

  it('should render size classes for Placeholder', async () => {
    render(
      <div>
        <Placeholder testId="small" size="small" />
        <Placeholder testId="large" size="large" />
      </div>
    );

    const small = await screen.findByTestId('small');
    const large = await screen.findByTestId('large');

    expect(small.classList).toContain(
      `${ComponentClassName['Placeholder']}--small`
    );
    expect(large.classList).toContain(
      `${ComponentClassName['Placeholder']}--large`
    );
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Placeholder ref={ref} testId="placeholderId" />);

    await screen.findByTestId('placeholderId');
    expect(ref.current?.nodeName).toBe('DIV');
  });

  it('renders based on isLoaded prop', () => {
    render(
      <div>
        <Placeholder testId="placeholder1">
          <Text testId="text1">Should not render</Text>
        </Placeholder>
        <Placeholder isLoaded testId="placeholder2">
          <Text testId="text2">Should render</Text>
        </Placeholder>
      </div>
    );

    const placeholder1 = screen.queryByTestId('placeholder1');
    const text1 = screen.queryByTestId('text1');
    const placeholder2 = screen.queryByTestId('placeholder2');

    expect(placeholder1).toBeTruthy();
    expect(text1).toBeNull();
    expect(placeholder2).toBeNull();
  });

  it('renders different sizes by passing size prop', async () => {
    render(
      <div>
        <Placeholder size="small" testId="placeholder1" />
        <Placeholder testId="placeholder2" />
        <Placeholder size="large" testId="placeholder3" />
      </div>
    );

    const placeholder1 = await screen.findByTestId('placeholder1');
    const placeholder2 = await screen.findByTestId('placeholder2');
    const placeholder3 = await screen.findByTestId('placeholder3');

    expect(placeholder1).toHaveClass(
      `${ComponentClassName['Placeholder']}--small`
    );
    expect(placeholder2).toHaveClass(`${ComponentClassName['Placeholder']}`);
    expect(placeholder3).toHaveClass(
      `${ComponentClassName['Placeholder']}--large`
    );
  });

  it('can apply startColor and endColor styling via props', async () => {
    const startColor = 'green';
    const endColor = 'gray';
    render(
      <Placeholder
        startColor={startColor}
        endColor={endColor}
        testId="placeholderId"
      />
    );
    const placeholder = await screen.findByTestId('placeholderId');
    expect(placeholder.style.getPropertyValue(CSS_VAR_START_COLOR)).toBe(
      startColor
    );
    expect(placeholder.style.getPropertyValue(CSS_VAR_END_COLOR)).toBe(
      endColor
    );
  });

  it('can apply styling via props', async () => {
    render(<Placeholder height="123px" width="50%" testId="placeholderId" />);
    const placeholder = await screen.findByTestId('placeholderId');
    expect(placeholder.style.getPropertyValue('height')).toBe('123px');
    expect(placeholder.style.getPropertyValue('width')).toBe('50%');
  });

  it('can apply a custom className', async () => {
    render(
      <Placeholder className="custom-placeholder" testId="placeholderId" />
    );
    const placeholder = await screen.findByTestId('placeholderId');
    expect(placeholder.classList.contains('custom-placeholder')).toBe(true);
    expect(placeholder.classList.contains(ComponentClassName.Placeholder)).toBe(
      true
    );
  });

  it('can render any arbitrary data-* attribute', async () => {
    render(<Placeholder data-demo="true" testId="dataTest" />);
    const heading = await screen.findByTestId('dataTest');
    expect(heading.dataset['demo']).toBe('true');
  });
});
