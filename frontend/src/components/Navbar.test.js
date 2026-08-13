import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from './Navbar';
import { useStore } from '../store/store';

// Reset the shared zustand store before each test so state from one test
// (nodes/edges/theme) can't leak into the next.
beforeEach(() => {
  useStore.setState({ nodes: [], edges: [], nodeIDs: {}, theme: 'system' });
});

test('renders the brand and primary actions', () => {
  render(<Navbar onRun={() => {}} />);
  expect(screen.getByText('VectorShift')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /run pipeline/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /clear canvas/i })).toBeInTheDocument();
});

test('clicking "Run Pipeline" invokes the onRun callback', () => {
  const onRun = jest.fn();
  render(<Navbar onRun={onRun} />);

  fireEvent.click(screen.getByRole('button', { name: /run pipeline/i }));

  expect(onRun).toHaveBeenCalledTimes(1);
});

test('clicking "Clear Canvas" resets nodes and edges in the store', () => {
  useStore.setState({
    nodes: [{ id: 'a', type: 'customInput' }],
    edges: [{ id: 'e1', source: 'a', target: 'b' }],
  });
  render(<Navbar onRun={() => {}} />);

  fireEvent.click(screen.getByRole('button', { name: /clear canvas/i }));

  expect(useStore.getState().nodes).toEqual([]);
  expect(useStore.getState().edges).toEqual([]);
});

test('the theme toggle button flips the store theme between light and dark', () => {
  useStore.setState({ theme: 'light' });
  render(<Navbar onRun={() => {}} />);
  expect(screen.getByRole('button', { name: /dark/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /dark/i }));

  expect(useStore.getState().theme).toBe('dark');
});
