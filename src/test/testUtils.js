import { assertPropTypes } from 'check-prop-types';

export const findElementByTestId = (wrapper, id) => {
    return wrapper.find(`[test-id="${id}"]`);
}

export const findStyledElementByTestId = (wrapper, id) => {
    return wrapper.find(`[test-id="${id}"]`).children().at(1);
}

export const checkProps = (component, expectedProps) => {
    assertPropTypes(component.propTypes, expectedProps, 'prop', component.name);
}