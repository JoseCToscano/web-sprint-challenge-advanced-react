import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppFunctional from './AppFunctional';

let coordinates, steps, email, leftButton, upButton, rightButton, downButton, resetButton;

const updateStatefulSelectors = (document) => {
    coordinates = document.querySelector('#coordinates');
    steps = document.querySelector('#steps');
    email = document.querySelector('#email');
    leftButton = document.querySelector('#left');
    upButton = document.querySelector('#up');
    rightButton = document.querySelector('#right');
    downButton = document.querySelector('#down');
    resetButton = document.querySelector('#reset');
};

describe('AppFunctional Component', () => {
    beforeEach(() => {
        render(<AppFunctional />);
        updateStatefulSelectors(document);
    });

    test('renders the "Coordinates" heading correctly', () => {
        expect(coordinates).toBeInTheDocument();
        expect(coordinates.textContent).toMatch(/\(2.*2\)$/); // Initial coordinates should be (2,2)
    });

    test('renders the "You moved X times" heading correctly', () => {
        expect(steps).toBeInTheDocument();
        expect(steps.textContent).toBe("You moved 0 times"); // Initial step count should be 0
    });

    test('renders all buttons with correct labels', () => {
        expect(leftButton).toBeInTheDocument();
        expect(leftButton.textContent).toBe('LEFT');

        expect(upButton).toBeInTheDocument();
        expect(upButton.textContent).toBe('UP');

        expect(rightButton).toBeInTheDocument();
        expect(rightButton.textContent).toBe('RIGHT');

        expect(downButton).toBeInTheDocument();
        expect(downButton.textContent).toBe('DOWN');

        expect(resetButton).toBeInTheDocument();
        expect(resetButton.textContent).toBe('reset');
    });

    test('renders the input field with placeholder "type email"', () => {
        expect(email).toBeInTheDocument();
        expect(email.placeholder).toBe('type email');
    });

    test('typing in the input field changes its value', () => {
        fireEvent.change(email, { target: { value: 'test@example.com' } });
        expect(email.value).toBe('test@example.com');
    });
});
