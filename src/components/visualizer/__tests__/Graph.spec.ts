import { render, screen } from '@testing-library/vue';
import GraphNode from '../graph/GraphNode.vue';
import '@testing-library/jest-dom';
import { describe, it } from 'vitest';

describe('Graph Node Test', () => {
  it('renders circles correctly', () => {
    render(GraphNode, {
      props: {
        x: 100,
        y: 100,
        shape: 'circle',
        label: 'test node',
        color: '#123',
      },
    });

    const node = screen.getByRole('img');
    const circleElement = node.firstElementChild;
    expect(circleElement).toHaveAttribute('cx', '100');
    expect(circleElement).toHaveAttribute('cy', '100');
    expect(circleElement).toHaveAttribute('fill', '#123');
  });
  it('renders squares correctly', () => {
    render(GraphNode, {
      props: {
        x: 100,
        y: 100,
        radius: 10,
        shape: 'square',
        label: 'test node',
        color: '#123',
      },
    });
    const expectedX = 90;
    const expectedY = 90;

    const node = screen.getByRole('img');
    const squareElement = node.firstElementChild;
    expect(squareElement).toHaveAttribute('x', expectedX.toString());
    expect(squareElement).toHaveAttribute('y', expectedY.toString());
    expect(squareElement).toHaveAttribute('fill', '#123');
  });
  it('renders nested text', () => {
    render(GraphNode, {
      props: {
        x: 100,
        y: 100,
        label: 'test node',
      },
    });

    expect(screen.getByText('test node')).toBeInTheDocument();
  });
});
