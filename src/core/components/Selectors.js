/** @jsx jsx */
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import ChartFilters from '../../components/ChartFilters';
import Select from '../../components/Select';

const Selectors = (props) => {
  const selectErrorMessage = '';

  return (
    <ChartFilters selectErrorMessage={selectErrorMessage}>
      {props.selectors.map(({ label, options, defaultValue, stateProperty, classPrefix }) => (
        <Select
          key={label}
          label={label}
          options={options}
          classNamePrefix={classPrefix}
          isClearable={false}
          defaultValue={[{ ...defaultValue, isCloseable: true }]}
          onChange={(item) => {
            window.DIState.setState({ [stateProperty]: item.value });
          }}
          css={{ minWidth: '200px' }}
        />
      ))}
    </ChartFilters>
  );
};

Selectors.propTypes = {
  selectors: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      defaultValue: PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }),
      stateProperty: PropTypes.string.isRequired,
      classPrefix: PropTypes.string.isRequired,
    })
  ),
};

export default Selectors;
